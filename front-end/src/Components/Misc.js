import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import PostItem from './../Components/PostItem.js'

//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Misc extends Component {

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
            "category":"MISC"
        }

        var ws = new WebSocket("ws://18.216.17.80:6009");

        ws.onopen = function() {
            console.log("sending data..");
            ws.send(JSON.stringify(post_data));
            console.log("sent")
        };

        ws.onmessage = function (evt) {
            console.log(evt.data);
            var result = JSON.parse(evt.data);
            if (result.postsFound > 0){
                this.setState({response : result});
            }
        }.bind(this);

        ws.onclose = function() {
          console.log('connection closed');
        };

        ws.onerror = function(err) {
            console.log(err);
        };
    }




    searchHandler(event){
      this.setState({term: event.target.value})
    }

  render() {
    const username = this.props.username;
    const response = this.state.response;
    const posts = response.posts;
    const term = this.state.term;
    return (
        <div className="result-container">
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
            posts && posts.map(data =>
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

export default Misc;