import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editPost } from '../actions/postActions';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if(!localStorage.getItem('currentUser'))
      props.history.push('/')

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    var index = localStorage.getItem('postToEdit')
    var post = JSON.parse(localStorage.getItem('posts'))[index] 
    this.setState({ "title": post.title });
    this.setState({ "body": post.body });
    this.setState({ "comments": post.comments });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.state.title,
      body: this.state.body,
      user: localStorage.getItem("currentUser"),
      comments: this.state.comments
    };

    this.props.editPost(post);
  }

  logout(){
    localStorage.removeItem("currentUser")
  }

  componentWillReceiveProps(nextProps) {    
    if (nextProps.editPost)
      this.props.history.push('/home')
  }

  render() {
    var logoutButton
    var currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if(currentUser){
      logoutButton =
      <div>
        <a className='button' style={{backgroundColor: 'red', float:"right", marginLeft:'10px', fontSize:'14px', textDecoration: 'none'}}
         onClick = {this.logout} href="/">Logout</a>
      </div>
    }
    return (
      <div>
        {logoutButton}
        <h1>Edit Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
              required
            />
          </div>
          <br />
          <div>
            <label>Body: </label>
            <br />
            <textarea
              name="body"
              onChange={this.onChange}
              value={this.state.body}
              required
            />
          </div>
          <br />
          <button style={{width: '100%'}} className="button" type="submit">Save</button>
        </form>
      </div>
    );
  }
}

EditPost.propTypes = {
  editPost: PropTypes.func,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, { editPost })(EditPost);
