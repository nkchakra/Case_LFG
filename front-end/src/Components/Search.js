
import React, { Component } from 'react';
import {Tab, Tabs, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import '../styles/Feed.css';
import PostItem from "./PostItem";

class Search extends Component {


 constructor(props){
     super(props);
      this.state = {
       response : {},
       onePost: false,
       searchForm : '',
     }

   }

   updateSearch = (e) =>{
    this.setState({searchForm : e.target.value});
   }

   searchPosts = () => {
    const search = this.state.searchForm;
        var post_data = {
          "queryType":"postSearch",
          "searchfor": search
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
            console.log(result.postsFound);
            console.log(result);
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

  render() {
    const username = this.props.username
    const response = this.state.response;
    const onePost = this.state.onePost;
    var array = [];
    if (onePost){
        array.push(response.posts[Object.keys(response.posts)[0]]);
    }
    const posts = onePost ? array : response.posts;
    return (
      <div className="searchContainer">
        <div className="searchForm">
            <form>
              <input type = "text" onChange ={this.updateSearch}/>
              <Button onClick={this.searchPosts}> Search </Button>
           </form>
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

export default Search;