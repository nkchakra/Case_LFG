import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import '../styles/Event.css';

class Event extends Component{

	constructor(props){
		super(props);
	}

	

	render(){
		return (
			<div className="event-container">
				<ListGroup className="Sports">
					<ListGroupItem key={this.props.id}>{this.props.username}: {this.props.description} </ListGroupItem>
	         	</ListGroup>
			</div>
			);
	}

}
export default Event;
