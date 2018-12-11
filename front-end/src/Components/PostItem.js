import React, { Component } from 'react';
import Comments from './Comments.js';
import {FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem,textarea, Button} from 'react-bootstrap';
import '../styles/Home.css';


class PostItem extends Component{

	constructor(props){
		super(props);
		this.state = {
			currentComment : '',
		}
		this.commentChange = this.commentChange.bind(this);

	}


	addComment = () => {
		const comment = this.state.currentComment;
		const username = this.props.username;
		const id = this.props.id;
        var getRequest = {
            "queryType": "postComment",
            "comment": comment,
            "username": username,
            "post_id": id
        };

        var ws = new WebSocket("ws://18.216.17.80:6009");
        ws.onopen = function() {
            ws.send(JSON.stringify(getRequest));
            console.log("sent")
        };

        ws.onmessage = function (evt) {
            console.log("anything");
            console.log(evt.data);
        };

        ws.onclose = function() {
        };

        ws.onerror = function(err) {
            alert("Error: " + err);
        };
        this.forceUpdate();
	}

	commentChange(e){
		this.setState({currentComment : e.target.value});
	}
	

	render(){
		const title = this.props.title;
		const description = this.props.description;
		const username = this.props.username;
		const commentObj = this.props.commentObj;
		return (
			<div className="postItemContainer">
				<div className="postItemHeader">
					<h4>{title}</h4> 
					<h5 className="postUsername">Post by: {username}</h5>
				</div>
				<div className="postItemBody">
					<div className="description">{description}</div>
					<div className="comments">
						<Comments commentObject={commentObj}/>
						<div className="addComment">
							<form>
					          <FormGroup
						          controlId="formBasicText"
						      >	
								<FormControl
					              type="text"
					              placeholder="Add comment"
					              onChange={this.commentChange}
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