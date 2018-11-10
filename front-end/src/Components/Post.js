import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import '../styles/Post.css';
class Post extends Component {


  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
        user: '',
        post_content: '',
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


    var user = this.refs.user.value.trim();
    var des = this.refs.post_content.value.trim();
    var cat = this.refs.category.value.trim();

    //if empty and click submit, throw error
    if (!user || !des || !cat){
        alert('Form not filled out properly');
        return;
    }

    //Fetch which will get the current users
    //fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
    //      method: 'GET',
    //      body: JSON.stringify(data),
    //      userCheck = response,
    //    });

    var userPresent = false;
    for (int i = 0; i < response.length(); i++){
        if (user == response[i]){
            userPresent = true;
        }
    }

    var catCheck = true;
    if (cat !=  "Sports" || cat != "Videogames" || cat != "Misc"){
        catCheck = false;
    }

    //if it doesn't fulfill check
    if (!catCheck){
        alert("Category wrong!")
    }

    if (!userPresent){
        alert("Not in database, please register account")
    }

    alert('Form being sent to backend');

//    //modifying html
//    document.getElementById("post").innerHTML = user + "  |   " + des + "   |   " + cat;
//
    //resetting the post fields
    this.refs.user.value = '';
    this.refs.post_content.value = '';
    this.refs.category.value = '';
    

    //when we build backend, will put url of backend here
    //ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009
//    fetch('http://172.20.14.152:2000', {mode: 'no-cors'}{
//      method: 'POST',
//      body: JSON.stringify(data),
//    });
//    fetch('http://172.20.14.152:80', {mode: 'no-cors'})
//      .then(function(response) {
//        return null;
//      })
//      .then(function(data) {
//        console.log(JSON.stringify(data));
//      });
    fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } 


  render() {
    return (
        //This will send data in a json format containing username, description and category
    <div className="post-container">
      <div className="input-container">
        <form onSubmit={this.handleSubmit}>

          <div className="field">
            <label htmlFor="user">Enter Name: </label>
            <input ref = "user" id="user" name="user" placeholder="Ex: Isaac's puppy" type="text" value = {this.state.user} onChange={event => this.handleChange(event)}/>
          </div>

          <div className="field">
            <label htmlFor="post_content">Enter description of event: </label>
            <input ref = "post_content" id="post_content" placeholder="Ex: 5v5 pickup" name="post_content" type="text" value = {this.state.post_content} onChange={event => this.handleChange(event)}/>
          </div>

          <div className="field">
            <label htmlFor="category">Enter category: </label>
            <input ref ="category" id="category" placeholder="Ex: Sports" name="category" type="text" value = {this.state.category} onChange={event => this.handleChange(event)}/>
          </div>

          <button onClick={this.handleSubmit}>Create Post</button>
        </form>
      </div>


{/*
//      <center>
//          <table>
//              <td>Username |</td>
//              <td>Description |</td>
//              <td>Category </td>
//          </table>
//            <table>
//              <td id = "post"></td>
//          </table>
      </center>
      */}
    </div>
    );
  }


}

export default Post;