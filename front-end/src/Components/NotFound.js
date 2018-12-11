import React, { Component } from 'react';
//import '../styles/Welcome.css';
class NotFound extends Component{
	render(){
		return(
			<div className="notFoundContiner" style={{padding: 10}}>
				<h5> 404 user not found or already exists</h5> 
			</div>
		);
	}
}

export default NotFound;