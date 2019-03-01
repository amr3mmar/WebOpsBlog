import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { PostComments } from './PostComments'

class Home extends Component {
  constructor(props){
    super(props)
    if(!localStorage.getItem('currentUser'))
      props.history.push('/')

    this.state={}
    this.onChange = this.onChange.bind(this);
    this.gotoAddPost = this.gotoAddPost.bind(this);
    this.logout = this.logout.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  gotoAddPost() {
    this.props.history.push('/add-post')
  }

  addComment(index){
    var body = this.state[index]
    var comment = {
      email: JSON.parse(localStorage.getItem("currentUser")).email,
      name: JSON.parse(localStorage.getItem("currentUser")).name,
      body: body
    }
    
    this.props.posts[index].comments.push(comment)
    localStorage.setItem("posts", JSON.stringify(this.props.posts))
    this.forceUpdate()
  }

  logout(){
    localStorage.removeItem("currentUser")
  }

  render() {
    var postItems
    if(this.props.posts)
      postItems = this.props.posts.map((post, index) => (
        <div key={index}>
          <h3>{JSON.parse(post.user).name}: {post.title}</h3>
          <p>{post.body}</p>
          <div style={{marginLeft: "10%"}}>
            <PostComments comments={post.comments}></PostComments>
          </div>
          <textarea onChange={this.onChange} name={index}></textarea>
          <br></br>
          <button onClick={()=>this.addComment(index)}>Comment</button>
          <hr></hr>
        </div>
      ));
    var logoutButton
    var currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if(currentUser){
      logoutButton =
      <div style = {{float: 'right'}}>
        <a onClick = {this.logout} href="/">Logout</a>
      </div>
    }
    return (
      <div>
        {logoutButton}
        <div style={{textAlign: "center"}}>
          <h1>Posts</h1>
          <button onClick = {this.gotoAddPost}>Add post</button>
        </div>
        <br></br>
        {postItems}
      </div>
    );
  }
}

Home.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Home);
