import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class PostComments extends Component {
    // constructor(props){
    //     super(props)
    //     console.log(props.comments);
        
    // }
  render() {
    var comments = this.props.comments.map((comment, index) => (
        <div key={index}>
            <span>{comment.name}</span>
            <br></br>
            <span>{comment.body}</span>
            <br></br>
        </div>
        
      ));
    return (
      <div>
        {comments}
      </div>
    )
  }
}

PostComments.protoTypes = {
    comments: PropTypes.array.isRequired
}

export default PostComments