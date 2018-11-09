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
                        user:"byrrice",
                        post_content: "CSGO 5 queue",
                    },
                    {
                        user:"niknak",
                        post_content: "Destiny 2 group",
                    },
                    {
                        user:"vishthefish",
                        post_content: "Looking Fortnite Gamers",
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
                return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
              })
            }
          </ListGroup>

    );
  }
}


export default Videogames;