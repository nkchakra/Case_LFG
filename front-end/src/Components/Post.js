import React, { Component } from 'react';

class Post extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePost(event){
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);


    //when we build backend, will put url of backend here
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (

    //This will send data in a json format containing username, description and category
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter Name: </label>
        <input type="username" name="username" type="text"/>

        <label htmlFor="description">Enter description of event: </label>
        <input id="description" name="description" type="text"/>

        <label htmlFor="category">Enter category: </label>
        <input id="category" name="category" type="text"/>

        <button onClick={this.handlePost}>Create Post</button>
      </form>
    );
  }


}

export default Post;