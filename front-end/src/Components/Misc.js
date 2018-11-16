import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


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
                args: "All"
            }]
        };
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009", true);
        xhttp.send("filterCategory" + "All")
        xhttp.onload = function() {
            var result = xhttp.responseText;
            this.setState(result);
        };
    }

 constructor(){
     super()
       //mock json must now have querytype filtercategory to send to backend
          this.state = {
            data: [
                ]
       };
   }

  render() {

    const tabData = this.state.data;
    return (
        <ListGroup className="Misc">
        <Button bsStyle = "primary" onClick = {this.getData}>Refresh</Button>
            {
              this.state.data.map(function(data) {
                return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}

export default Misc;