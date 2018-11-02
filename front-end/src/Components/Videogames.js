import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class Videogames extends Component {


//framework of getting data using ajax, this will get videogames data
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
                        description: "CSGO 5 queue",
                    },
                    {
                        id: 2,
                        username:"niknak",
                        description: "Destiny 2 group",
                    },
                    {
                        id: 3,
                        username:"vishthefish",
                        description: "Looking Fortnite Gamers",
                    }
                ]
       };

   }

  render() {
    const tabData = this.state.data;
    return (
        <ListGroup className="Videogames">
            {
              this.state.data.map(function(data) {
                return <ListGroupItem key={data.id}>{data.username}: {data.description} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}


export default Videogames;