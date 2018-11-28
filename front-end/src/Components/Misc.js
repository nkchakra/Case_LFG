import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class Misc extends Component {


    //On startup
    componentDidMount() {
        this.setState({
            data: [
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
                <Button bsStyle = "primary" onClick = {this.getData}>Refresh</Button>
                   <form>
                       <input type = "text"
                           onChange ={this.searchHandler}
                           value = {term}
                       />
                   </form>
          {
            data.filter(searchingFor(term)).map(data =>
                <div key = {data.user}>
                      <center>
                            <ul className = "list-group">
                                <li className = "list-group-item">
                                    {data.user} |
                                    {data.post_content}
                                </li>
                             </ul>
                      </center>

                </div>
            )
          }
          </div>

    );
  }
}

export default Misc;