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

    }
    // At bottom of comments add an add to comments button
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