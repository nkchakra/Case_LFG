import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import axios from 'axios';

class History extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		//Get all history function implementation goes here.
		// axios.get('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009')
  //       .then(function (response) {
  //           console.log(response);
  //       })
  //       .catch(function (response) {
  //           console.log(response);
  //       });
	}
	

	render(){
		return (
			<div className="historyContainer">
				<h3 className="historyTitle">Your Post History</h3>
			</div>

			);
	}

}
export default History;