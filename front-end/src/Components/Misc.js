import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Misc extends Component {


//framework of getting data using ajax, this will get all labeled misc
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