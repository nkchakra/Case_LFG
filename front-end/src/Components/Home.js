import React, { Component } from 'react';
import Feed from './Feed.js';
import History from './History.js';
import Post from './Post.js';
import Welcome from './Welcome.js';
class Home extends Component{

	constructor(props){
		super(props);
	}

	

	render(){
		return (
			<div className="homeContainer">
				<Welcome/>
				<Post/>
				<Feed/>
				<History/>
			</div>
			);
	}

}
export default Home;