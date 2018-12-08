import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Comments from './Comments';

//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Misc extends Component {


    //On startup
    componentDidMount() {
        this.setState({
            data: [
                {
                    user:"byrrice",
                    post_content: "Tennis Club",
                },
                {
                    user:"niknak",
                    post_content: "Case Engineering Council",
                },
                {
                    user:"vishthefish",
                    post_content: "Cooking club",
                }
            ]
        });
    }

    //On click refresh, will reload data to include new posts
    getData() {
        var getRequest = {
            request: [{
                queryType: "filterCategory",
                args: "Misc"
            }]
        };

        var ws = new WebSocket("ws://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009");

        ws.onopen = function() {
            console.log("sending data..");
            ws.send(JSON.stringify(getRequest));
            console.log("sent")
        };

        ws.onmessage = function (evt) {
            console.log("anything");
            console.log(evt.data);
        };

        ws.onclose = function() {
            alert("Closed!");
        };

        ws.onerror = function(err) {
            alert("Error: " + err);
        };
    }

 constructor(props){
    super(props)
         //mock json must now have querytype filtercategory to send to backend
           this.state = {
             data: [
                    ],
             term: '',
           }
            this.searchHandler = this.searchHandler.bind(this);
        }
searchHandler(event){
  this.setState({term: event.target.value})
}

  render() {

    const{term, data} = this.state;
    return (
        <div className="result-container">
            <div className = "refresh-container" style = {{overflow: 'hidden', whitespace: 'overflow'}}>
                <ListGroupItem>
                       <form>
                            <input type = "text" onChange ={this.searchHandler} value = {term}/>
                            {" "}
                            <Button bsStyle = "primary" onClick = {this.getData}>Refresh</Button>
                       </form>
               </ListGroupItem>
            </div>
            {
            data.filter(searchingFor(term)).map(data =>
                <div key = {data.user}>
                    <center>
                        {data.user} |
                        {data.post_content} |
                        {data.category}
                        <Comments/>
                    </center>
                </div>
            )
          }
      </div>

    );
  }
}

export default Misc;