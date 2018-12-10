import React, { Component } from 'react';
import {Jumbotron, Button, Carousel} from 'react-bootstrap';
import '../styles/Welcome.css';
class Welcome extends Component{
	render(){
		return(
	        <div className="welcome-component">
	          <Jumbotron className="jumbotron">
	          	<div className="jumbotron-container">
		            <h1>Welcome Spartan!</h1>
		            <div className="welcome-text">
		              Welcome to Case LFG! Where students come to find other students for activities, groups, and fun!
		            </div>
	            </div>
	          </Jumbotron>
	        </div>
		);
	}
}

export default Welcome;