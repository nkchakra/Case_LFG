import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Sports extends Component {


//framework of getting data using ajax, this will get sports data
//    getData(){
//      $.ajax(
//            {
//                type: 'get',
//                url: url,
//                success: function (data) {
//                    this.setState({ data: JSON.parse(data) })  //or parse
//                }.bind(this)
//            },
//
//        );
//    }

 constructor(){
     super()
       this.state = {
         data: [    {
                        id: 1,
                        username:"byrrice",
                        description: "Ping Pong Club at 7 pm",
                    },
                    {
                        id: 2,
                        username:"niknak",
                        description: "Basketball at 6 at Veale",
                    },
                    {
                        id: 3,
                        username:"vishthefish",
                        description: "Tennis at 7 pm",
                    }
                ]
       };
    }
  render() {

    const tabData = this.state.data;
    return (
        <ListGroup className="Sports">
            {
              this.state.data.map(function(data) {
                return <ListGroupItem key={data.id}>{data.username}: {data.description} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}

export default Sports;