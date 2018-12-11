import React, { Component } from 'react';
import Feed from './Feed.js';
import History from './History.js';
import Post from './Post.js';
import {Tab, Tabs} from 'react-bootstrap';

import Welcome from './Welcome.js';
import '../styles/Home.css';


class Home extends Component{

	constructor(props){
		super(props);
	}

	

	render(){
		const username = this.props.username;
		return (
			<div>
			<Welcome/>
            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
              <Tab eventKey={1} title="Create a Post">
                <Post username={username}/>
              </Tab>
              <Tab eventKey={2} title="Main Feed">
                <Feed username={username}/>
              </Tab>
              <Tab eventKey={3} title="History">
                <History username={username}/>
              </Tab>
            </Tabs>

			</div>

			);
	}

}
export default Home;