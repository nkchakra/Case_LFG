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
                        id: 1,
                        username:"byrrice",
                        description: "CSGO 5 queue at 3",
                        category: "Videogames"
                    },
                    {
                        id: 2,
                        username:"niknak",
                        description: "Basketball at 6 at Veale",
                        category: "Sports"
                    },
                    {
                        id: 3,
                        username:"vishthefish",
                        description: "Coding group for 293?",
                        category: "Misc"
                    }
                ]
       };
   }

  render() {

    const tabData = this.state.data;
    return (
        {/*<ListGroup className="All">

            {
              this.state.data.map(function(data) {
                return <ListGroupItem key={data.id}>{data.username}: {data.description} </ListGroupItem>
              })
            }
          </ListGroup>*/}

    );
  }
}

export default All;