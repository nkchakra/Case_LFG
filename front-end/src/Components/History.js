	import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import axios from 'axios';
import PostItem from './../Components/PostItem.js';
import '../styles/Home.css';


class History extends Component{

	constructor(props){
		super(props);
		this.state = {
			response : {},
			onePost: false,
		}
	}

	componentDidMount(){
		const username = this.props.username;
		var post_data = {
			"queryType":"userRelateds",
			"username": username
		}

		var ws = new WebSocket("ws://18.216.17.80:6009");

	    ws.onopen = function() {
	        console.log("sending data..");
	        ws.send(JSON.stringify(post_data));
	        console.log("sent")
	    };

	    ws.onmessage = function (evt) {
	        console.log(evt.data);
	        var result = JSON.parse(evt.data)
			if (result.postsFound == 1){
                this.setState({
                    response : result,
                    onePost : true,
                });
            }
            else{
                this.setState({
                    response : result,
                    onePost : false,
                });                
            }
	    }.bind(this);

	    ws.onclose = function() {
	      console.log('connection closed');
	    };

	    ws.onerror = function(err) {
	    	console.log(err);
	    };
	}

	refresh = () => {
    	this.componentDidMount();
  	}


	render(){
		const username = this.props.username;
		const response = this.state.response;
		const onePost = this.state.onePost;
	    var array = [];
	    if (onePost){
	        array.push(response.posts);
	    }
	    const posts = onePost ? array : response.posts;
		return (
			<div className="historyContainer">
				<h1 className="historyTitle">Your Post History</h1>
				<div className="refresh">
               		<Button onClick={this.refresh}>Refresh</Button>
				</div>
				<div className="historicalPosts">
					{posts && posts.map(data => 
							<PostItem username={data.post_user} title={data.post_title} description={data.post_content} id={data.post_id} commentObj={data.post_comments}/>
						)
					}
				</div>
			</div>

			);
	}

}
export default History;