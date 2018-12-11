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
             onePost: false,
           }
    }


    //On startup
    componentDidMount() {
        var post_data = {
            "queryType":"categoryFilter",
            "category":"SPORT"
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
            if (result.postsFound == 1){
                this.setState({
                    response : result,
                    onePost : true,
                });
            }
            else{
                this.setState({
                    response : result,
                    onePost : false,
                });                
            }
        }.bind(this);

        ws.onclose = function() {
          console.log('connection closed');
        };

        ws.onerror = function(err) {
            console.log(err);
        };
    }


  refresh = () => {
    this.componentDidMount();
  }

    //On click refresh, will reload data to include new posts

    render() {
        const username = this.props.username;
        const response = this.state.response;
        const onePost = this.state.onePost;
        var array = [];
        if (onePost){
            array.push(response.posts[Object.keys(response.posts)[0]]);
        }
        const posts = onePost ? array : response.posts;
        return (
        <div className="sportsContainer tabContiner">
                <div className = "refresh-container" style = {{overflow: 'hidden', whitespace: 'overflow'}}>
                    <Button onClick={this.refresh}>Refresh</Button>
                </div>
                <ListGroup>
                {
                posts && posts.map(data =>
                    <ListGroupItem>
                        <PostItem username={data.post_user} title={data.post_title} description={data.post_content} id={data.post_id} commentObj={data.post_comments}/>
                    </ListGroupItem>
                )
              }
              </ListGroup>
          </div>

        );
    }
}

export default Sports;