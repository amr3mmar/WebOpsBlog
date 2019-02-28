import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Home extends Component {
  constructor(props){
    super(props)
    if(!localStorage.getItem('currentUser'))
      props.history.push('/')

    this.gotoAddPost = this.gotoAddPost.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  gotoAddPost() {
    this.props.history.push('/add-post')
  }

  render() {
    var postItems
    if(this.props.posts)
      postItems = this.props.posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <span>posted by: {JSON.parse(post.user).name}</span>
          <hr></hr>
        </div>
      ));
    return (
      <div>
        <h1>Posts</h1>
        <button onClick = {this.gotoAddPost}>Add post</button>
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
