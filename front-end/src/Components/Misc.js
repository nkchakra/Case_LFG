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
                        id: 1,
                        username:"byrrice",
                        description: "Anime Club",
                    },
                    {
                        id: 2,
                        username:"niknak",
                        description: "Case Engineering Council",
                    },
                    {
                        id: 3,
                        username:"vishthefish",
                        description: "Cooking club",
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
                return <ListGroupItem key={data.id}>{data.username}: {data.description} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}

export default Misc;