import React, { Component } from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import '../styles/Feed.css';
import Misc from './Misc';
import Videogames from './Videogames';
import Sports from './Sports';
import All from "./All";
import Results from "./Results";
import Search from "./Search";

function categorize(term){
    console.log("derp");
    return function(x){

        var table = '';
        if (x.category.toLowerCase().includes(term.toLowerCase())){
            return table += x.username + ": " +  x.description;
        }
    }
}

class Feed extends Component {


 constructor(){
     super()


       //for posting method later on
        //this.getData = this.getData.bind(this);
   }

  render() {
    const username = this.props.username


    return (
        <div className="feedContainer">
            <h1 size="30">Main Feed</h1>
            <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
              <Tab eventKey={1} title="All">
                <All username={username}/>
              </Tab>
              <Tab eventKey={2} title="Sports">
                <Sports username={username}/>
              </Tab>
              <Tab eventKey={3} title="Videogames">
                <Videogames username={username}/>
              </Tab>
              <Tab eventKey={4} title="Misc.">
                <Misc username={username}/>
              </Tab>
              <Tab eventKey={5} title="Search">
                <Search username={username}/>
              </Tab>
            </Tabs>
        </div>

    );
  }
}

export default Feed;