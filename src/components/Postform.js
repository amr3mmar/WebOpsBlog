import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/postActions";
import { Editor } from "@tinymce/tinymce-react";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
    if (!localStorage.getItem("currentUser")) props.history.push("/");
    this.onChange = this.onChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onEditorChange(e) {
    this.setState({ body: e.target.getContent() });
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      title: this.state.title,
      body: this.state.body,
      user: localStorage.getItem("currentUser"),
      comments: []
    };

    this.props.createPost(post);
  }

  logout() {
    localStorage.removeItem("currentUser");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      var posts = [];
      if (localStorage.getItem("posts"))
        posts = JSON.parse(localStorage.getItem("posts"));

      posts.unshift(nextProps.newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      this.props.history.push("/home");
    }
  }

  render() {
    var logoutButton;
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      logoutButton = (
        <div>
          <a
            className="button"
            style={{
              backgroundColor: "red",
              float: "right",
              marginLeft: "10px",
              fontSize: "14px",
              textDecoration: "none"
            }}
            onClick={this.logout}
            href="/"
          >
            Logout
          </a>
        </div>
      );
    }
    return (
      <div>
        {logoutButton}
        <h1>Add Post</h1>
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
            <Editor
              name="body"
              onChange={this.onEditorChange}
              required
              apiKey="3em7nbni490uwn4iapuzgzb87atxll6mk6dddgh0sdurrc5r"
              cloudChannel="dev"
              init={{
                selector: "textarea",
                plugins: "link image code textpattern lists",
                textpattern_patterns: [
                  { start: "1. ", cmd: "InsertOrderedList" },
                  { start: "* ", cmd: "InsertUnorderedList" },
                  { start: "- ", cmd: "InsertUnorderedList" }
                ]
              }}
            />
          </div>
          <br />
          <button style={{ width: "100%" }} className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(
  mapStateToProps,
  { createPost }
)(PostForm);
