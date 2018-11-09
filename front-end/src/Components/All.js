import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';


class All extends Component {


//framework of getting data using ajax, we will be getting all the data in multiple categories
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
        <ListGroup className="All">

            {
              this.state.data.map(function(data) {
                return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}

export default All;