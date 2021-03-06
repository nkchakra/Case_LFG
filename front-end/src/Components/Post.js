import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem,textarea} from 'react-bootstrap';
import '../styles/Post.css';
import axios from 'axios';

class Post extends Component {


  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.categorySelect = this.categorySelect.bind(this); 
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.state = {
        title: '',
        post_content: '',
        category: 'ALL',
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
    const content = this.state.post_content;
    const title = this.state.title;
    const category = this.state.category;
    const username = this.props.username;

    if (content.length > 150){
      alert('Your description can be no more than 150 chars');
    }

    if (!this.state.title || !this.state.post_content){
        alert('Form not filled out properly');
        return;
    }


  //TODO check with nikhil what the spellings for all categories are
    var post_data = {
      "queryType" : "postCreate",
      "post_content" : content,
      "category" : category,
      "post_title" : title,
      "username" : username
    };


    var ws = new WebSocket("ws://18.216.17.80:6009");

    ws.onopen = function() {
        console.log("sending data..");
        ws.send(JSON.stringify(post_data));
        console.log("sent")
    };

    ws.onmessage = function (evt) {
        console.log(evt.data);
        alert('Post created!');
    };

    ws.onclose = function() {
      console.log('connection closed');
    };

    ws.onerror = function(err) {
        alert("Error: " + err);
    };

  } 


  categorySelect(eventKey){
    if (eventKey == 1){
      this.setState({category: 'ALL'});
    }
    else if (eventKey == 2){
      this.setState({category: 'SPORT'});
    }
    else if (eventKey == 3){
      this.setState({category: 'GAME'});
    }
    else{
        this.setState({category: 'MISC'});
    }
  }

  handleDescriptionChange(e){
    this.setState({post_content: e.target.value})
  }

  handleNameChange(e){
    this.setState({title: e.target.value})
  }

 

  render() {
    return (
        //This will send data in a json format containing username, description and category
    <div className="post-container">
      <div className="postTitle">
        <h1>Create Post Here </h1>
      </div>
      <div className="input-container">
        <form>
          <FormGroup
          controlId="formBasicText"
        >
            <h5 className="nameHeader"> Enter event name here: </h5>
            <FormControl
              type="text"
              placeholder="Pickup Basketball"
              onChange={this.handleNameChange}
              bsSize="large"
              />
            <h5 className="descriptionHeader">Enter event description here: </h5>
            <FormControl
              type="text"
              placeholder="Veale 5pm (150 char limit)"
              onChange={this.handleDescriptionChange}
            />
          </FormGroup>
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