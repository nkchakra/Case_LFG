import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


class All extends Component {

getData(){
    var getRequest = {
        request :
        [
            {
            queryType: "filterCategory",
            args: "All"
            }
        ]
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009", true);
    xhttp.send("filterCategory" + "All")
    xhttp.onload = function () {
      var result = xhttp.responseText;
    };
    fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
      method: 'GET',
      body: JSON.stringify(getRequest)
//      this.setState({data: response}),
    })
    .then(response => response.json());
}

//Fetch which will get the data and set the state to the response, need to update constantly
//fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
//      method: 'GET',
//      this.setState(response),
//    });


 constructor(){
     super()
       //mock json must now have querytype filtercategory to send to backend
      this.state = {
        data: [
                //queryType : "filterCategory",
            {
                user:"byrrice",
                post_content: "CSGO 5 queue at 3",
                category: "Videogames"
            },
            {
                user:"niknak",
                post_content: "Basketball at 6 at Veale",
                category: "Sports"
            },
            {
                user:"vishthefish",
                post_content: "Coding group for 293?",
                category: "Misc"
            }
        ]
       };
   }

  render() {

    const tabData = this.state.data;
    return (
        <div className = "allContainer">
        <Button bsStyle = "primary" onClick = {this.getData}>Get Data</Button>
        <ListGroup className="All">

            {
              this.state.data.map(function(data) {
                return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
              })
            }
          </ListGroup>
          </div>

    );
  }
}

export default All;