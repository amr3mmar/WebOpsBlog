import { FETCH_POSTS, NEW_POST, DELETE_POST, EDIT_POST } from './types';

export const fetchPosts = () => dispatch => {
  var posts = JSON.parse(localStorage.getItem("posts"))
  dispatch({
    type: FETCH_POSTS,
    payload: posts
  })
};

export const createPost = postData => dispatch => {
  var user = localStorage.getItem("currentUser")
  if(user)
    dispatch({
      type: NEW_POST,
      payload: postData
    })
};

export const editPost = post => dispatch => {
  var user = localStorage.getItem("currentUser")
  if(user){
    var index = localStorage.getItem('postToEdit')
    var posts = JSON.parse(localStorage.getItem('posts'))
    posts.splice(index, 1, post)
    localStorage.setItem("posts", JSON.stringify(posts))
    dispatch({
      type: EDIT_POST,
      payload: posts
    })
  }
};

export const deletePost = index => dispatch => {
  var user = localStorage.getItem("currentUser")
  if(user){
    var posts = JSON.parse(localStorage.getItem("posts"))
    posts.splice(index, 1)
    localStorage.setItem("posts", JSON.stringify(posts))
    dispatch({
      type: DELETE_POST,
      payload: posts
    })
  }
};
