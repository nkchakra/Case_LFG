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
                        user:"byrrice",
                        post_content: "Ping Pong Club at 7 pm",
                    },
                    {
                        user:"niknak",
                        post_content: "Basketball at 6 at Veale",
                    },
                    {
                        user:"vishthefish",
                        post_content: "Tennis at 7 pm",
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
                return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}

export default Sports;