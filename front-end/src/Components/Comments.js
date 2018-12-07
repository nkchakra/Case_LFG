import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Comments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
            ],
        }
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("Submitting the form!");
        const author = this.refs.author.value;
        const comment = this.refs.comment.value;
        console.log(author, comment);

        var getRequest = {
            request: [{
                queryType: "postComment",
                comment: comment,
                username: author,
                post_id: 1234
            }]
        };

        var ws = new WebSocket("ws://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009");

        ws.onopen = function() {
            console.log("sending data..");
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
        return (
            <div className = "comment">
             I'm the comments!!!
             <form ref = "commentFrom" className ="comment-form" onSubmit = {this.handleSubmit}>
                <input type = "text" ref ="author" placeholder = "author"/>
                <input type = "text" ref = "comment" placeholder = "comment"/>
                <input type = "submit"/>
             </form>
             </div>
        )
    }
}

export default Comments;