import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Comments from './Comments';
import '../styles/Feed.css';
import PostItem from './PostItem.js'


//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}
class Sports extends Component {
    constructor(props){
         super(props)
           this.state = {
             response : {},
             term: '',
           }
            this.searchHandler = this.searchHandler.bind(this);
    }


    //On startup
    componentDidMount() {
        var post_data = {
            "queryType":"categoryFilter",
            "category":"SPORT"
        }

        var ws = new WebSocket("ws://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009");

        ws.onopen = function() {
            console.log("sending data..");
            ws.send(JSON.stringify(post_data));
            console.log("sent")
        };

        ws.onmessage = function (evt) {
            console.log(evt.data);
            if (evt.data.postsFound > 0){
                this.setState({response : evt.data});
            }
        };

        ws.onclose = function() {
          console.log('connection closed');
        };

        ws.onerror = function(err) {
            console.log(err);
        };
    }


    searchFor(term){
        
    }

    //On click refresh, will reload data to include new posts



  searchHandler(event){
      this.setState({term: event.target.value})
    }
    render() {
        const username = this.props.username;
        const response = this.state.response;
        const posts = response.posts;

        const term = this.state.term;
        return (
        <div className="sportsContainer tabContiner">
                <div className = "refresh-container" style = {{overflow: 'hidden', whitespace: 'overflow'}}>
                    <ListGroupItem>
                           <form>
                                <input type = "text" onChange ={this.searchHandler} value = {term}/>
                                {" "}
                           </form>
                   </ListGroupItem>
                </div>
                <ListGroup>
                {
                posts && posts.filter(searchingFor(term)).map(data =>
                    <ListGroupItem>
                        <PostItem username={username} title={data.post_title} description={data.post_content} id={data.post_id} commentObj={data.post_comments}/>
                    </ListGroupItem>
                )
              }
              </ListGroup>
          </div>

        );
    }
}

export default Sports;