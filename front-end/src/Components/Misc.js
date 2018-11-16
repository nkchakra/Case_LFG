import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Misc extends Component {


//Fetch which will get the data and set the state to the response, need to update constantly
//fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
//      method: 'GET',
//      body: JSON.stringify(data),
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
       };
   }

  render() {

    const tabData = this.state.data;
    return (
        <ListGroup className="Misc">
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