import React, { Component } from 'react';
import Feed from './Feed.js';
import History from './History.js';
import Post from './Post.js';
import Welcome from './Welcome.js';
import '../styles/Home.css';


class Home extends Component{

	constructor(props){
		super(props);
	}

	

	render(){
		const username = this.props.username;
		return (
			<div className="homeContainer">
				<Welcome/>
				<Post username={username}/>
				<Feed/>
				<History username={username}/>
			</div>
			);
	}

}
export default Home;