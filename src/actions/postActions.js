import { FETCH_POSTS, NEW_POST } from './types';

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
