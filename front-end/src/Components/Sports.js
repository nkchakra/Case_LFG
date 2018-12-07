import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Comments from './Comments';

//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}
class Sports extends Component {

    /*
            <ListGroup className="Sports">
            <Button bsStyle = "primary" onClick = {this.getData}>Refresh</Button>
                {
                  this.state.data.map(function(data) {
                    return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
                  })
                }
              </ListGroup>

*/
    //On startup
    componentDidMount() {
        this.setState({
            data: [
                //queryType : "filterCategory",
                {
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
        });
    }

    //On click refresh, will reload data to include new posts
    getData() {
        var getRequest = {
            request: [{
                queryType: "filterCategory",
                args: "All"
            }]
        };
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009", true);
        xhttp.send("filterCategory" + "All")
        xhttp.onload = function() {
            var result = xhttp.responseText;
            this.setState(result);
        };
    }



 constructor(props){
     super(props)
     //mock json must now have querytype filtercategory to send to backend
       this.state = {
         data: [
                ],
         term: '',
       }
        this.searchHandler = this.searchHandler.bind(this);
    }
  searchHandler(event){
      this.setState({term: event.target.value})
    }
    render() {
      const{term, data} = this.state;
    return (
    <div className="result-container">
            <div className = "refresh-container" style = {{overflow: 'hidden', whitespace: 'overflow'}}>
                <ListGroupItem>
                       <form>
                            <input type = "text" onChange ={this.searchHandler} value = {term}/>
                            {" "}
                            <Button bsStyle = "primary" onClick = {this.getData}>Refresh</Button>
                       </form>
               </ListGroupItem>
            </div>
            {
            data.filter(searchingFor(term)).map(data =>
                <div key = {data.user}>
                    <center>
                        {data.user} |
                        {data.post_content} |
                        {data.category}
                        <Comments/>
                    </center>
                </div>
            )
          }
      </div>

    );
  }
}

export default Sports;