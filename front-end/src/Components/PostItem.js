import React, { Component } from 'react';
import Comments from './Comments.js';
import {FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem,textarea} from 'react-bootstrap';
import '../styles/Home.css';


class PostItem extends Component{

	constructor(props){
		this.addComment = this.addComment.bind(this);
		super(props);
	}

	addComment(e){
		e.preventDefault();

        var getRequest = {
            request: [{
                "queryType": "postComment",
                "comment": comment,
                "username": author,
                "post_id": 1234
            }]
        };

        var ws = new WebSocket("ws://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009");
        ws.onopen = function() {
            ws.send(JSON.stringify(getRequest));
            console.log("sent")
        };

        ws.onmessage = function (evt) {
            console.log("anything");
            console.log(evt.data);
            this.setState()
        };

        ws.onclose = function() {
            alert("Closed!");
        };

        ws.onerror = function(err) {
            alert("Error: " + err);
        };
	}
	

	render(){
		const title = this.props.title;
		const description = this.props.description;
		const username = this.props.username;
		const id = this.props.id;
		return (
			<div className="postItemContainer">
				<div className="postItemHeader">
					<h4>{title}</h4> 
				</div>
				<div className="postItemBody">
					<div className="description">{description}</div>
					<div className="comments">
						<Comments id={id}/>
						<div className="addComment">
							<form>
					          <FormGroup
						          controlId="formBasicText"
						      >	
						      <ControlLabel>Add a comment</ControlLabel>
								<FormControl
					              type="text"
					              placeholder="My name is Vish and I would love to come to this event!"
					            />
						      </FormGroup>
						      <Button onClick={this.addComment}> Add comment </Button>
						    </form>
						</div>
					</div>
				</div>


			</div>

			);
	}

}
export default PostItem;