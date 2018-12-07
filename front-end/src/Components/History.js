import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';

class History extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){

	}
	

	render(){
		return (
			<div className="historyContainer">
				<h3 className="historyTitle">Your Post History</h3>
				<div className="historyContainer">
					
				</div>
			</div>

			);
	}

}
export default History;