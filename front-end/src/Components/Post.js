import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem} from 'react-bootstrap';
import '../styles/Post.css';
class Post extends Component {


  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.categorySelect = this.categorySelect.bind(this); 

    this.state = {
        user: '',
        post_content: '',
        category: 'All',
    }; 
    
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
//    var cat = this.refs.category.value.trim();

    //if empty and click submit, throw error
    if (!user || !des ){
        alert('Form not filled out properly');
        return;
    }

    //Fetch which will get the current users
    //fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
    //      method: 'GET',
    //      body: JSON.stringify(data),
    //      userCheck = response,
    //    });

    alert('Form being sent to backend');

//    //modifying html
//    document.getElementById("post").innerHTML = user + "  |   " + des + "   |   " + cat;
//
    //resetting the post fields
    this.refs.user.value = '';
    this.refs.post_content.value = '';
//    this.refs.category.value = '';

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

     var sampleData = {"password":"pwordtest1","last_name":"Ray","first_name":"Soumya","queryType":"userCreate","username":"sray"};
//    // Create WebSocket connection.
//    const socket = new WebSocket('ws://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009');
//
//    // Connection opened
//    socket.addEventListener('open', function (event) {
//        socket.send("(msg_start)" + JSON.stringify(sampleData));
//    });
//
//    // Listen for messages
//    socket.addEventListener('message', function (event) {
//        console.log('Message from server ', event.data);
//    });

    var websocket = new WebSocket("ws://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009");

    websocket.send(JSON.stringify(sampleData));

    websocket.onmessage = function(str) {
        console.log(str);
    }

//    var xhttp = new XMLHttpRequest();
//    xhttp.open("GET", "http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009", true);
//    //xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
//    xhttp.send("(msg_start)" + JSON.stringify(sampleData));
//    console.log(xhttp.statusText);
//    var result = xhttp.responseText;
//    console.log(result);

//    fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:7000', {mode: 'no-cors'}, {
//      method: 'POST',
//      body: JSON.stringify(sampleData),
//    })
//    .then(response => response.json())
//    .then(response => console.log('Success: ', JSON.stringify(response)))
//    .catch(error => console.error('Error'));s
  } 


  categorySelect(eventKey){
    if (eventKey == 1){
      this.setState({category: 'All'});
    }
    else if (eventKey == 2){
      this.setState({category: 'Sports'});
    }
    else if (eventKey == 3){
      this.setState({category: 'Video Games'});
    }
    else{
        this.setState({category: 'Misc.'});
    }
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
          {/*need to do this in dropdown menu*/}
            <label htmlFor="category">Enter category: </label>
              <div className="dropdownSelctor">
              <DropdownButton
                  bsStyle={'primary'}
                  title={this.state.category}
                  key={1}
                  id={`dropdown-basic-${1}`}
                  noCaret
                >
                  <MenuItem eventKey="1" onSelect={this.categorySelect}>All</MenuItem>
                  <MenuItem eventKey="2" onSelect={this.categorySelect}>Sports</MenuItem>
                  <MenuItem eventKey="3" onSelect={this.categorySelect}>Video Games</MenuItem>
                  <MenuItem eventKey="4" onSelect={this.categorySelect}>Misc.</MenuItem>
                </DropdownButton>
            </div> 
          </div>

          <button onClick={this.handleSubmit}>Create Post</button>
        </form>
      </div>
    </div>
    );
  }


}

export default Post;