import React, { Component } from 'react';
class Post extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        username: '',
        description: '',
        category: '',
    }
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePost(event){
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    var user = this.refs.username.value.trim();
    var des = this.refs.description.value.trim();
    var cat = this.refs.category.value.trim();

    if (!user || !des || !cat){
        alert('Form not filled out properly');
        return;
    }

    document.getElementById("post").innerHTML = user + "  |   " + des + "   |   " + cat;
    this.refs.username.value = '';
    this.refs.description.value = '';
    this.refs.category.value = '';

    //when we build backend, will put url of backend here
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }


  render() {
    return (
        //This will send data in a json format containing username, description and category
    <div>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter Name: </label>
        <input ref = "username" name="username" type="text" value = {this.state.username} onChange={event => this.handleChange(event)}/>

        <label htmlFor="description">Enter description of event: </label>
        <input ref = "description" id="description" name="description" type="text" value = {this.state.description} onChange={event => this.handleChange(event)}/>

        <label htmlFor="category">Enter category: </label>
        <input ref ="category" id="category" name="category" type="text" value = {this.state.category} onChange={event => this.handleChange(event)}/>

        <button onClick={this.handleSubmit}>Create Post</button>
      </form>

      <center>
          <table>
              <td>Post ID |</td>
              <td>Description |</td>
              <td>Category |</td>
          </table>
            <table>
              <td id = "post"></td>
          </table>
      </center>
    </div>
    );
  }


}

export default Post;