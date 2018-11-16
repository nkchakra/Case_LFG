import React, { Component } from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class All extends Component {

    /* <div className = "allContainer">

    <ListGroup className="All">

        {
          this.state.data.map(function(data) {
            return <ListGroupItem key={data.user}>{data.user}: {data.post_content} </ListGroupItem>
          })
        }
      </ListGroup>
      </div>
      */
    //On startup
    componentDidMount() {
        this.setState({
            data: [
                //queryType : "filterCategory",
                {
                    user: "byrrice",
                    post_content: "CSGO 5 queue at 3",
                    category: "Videogames"
                },
                {
                    user: "niknak",
                    post_content: "Basketball at 6 at Veale",
                    category: "Sports"
                },
                {
                    user: "vishthefish",
                    post_content: "Coding group for 293?",
                    category: "Misc"
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
    //    fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
    //      method: 'GET',
    //      body: JSON.stringify(getRequest)
    ////      this.setState({data: response}),
    //    })
    //    .then(response => response.json());
    //}

    //Fetch which will get the data and set the state to the response, need to update constantly
    //fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
    //      method: 'GET',
    //      this.setState(response),
    //    });


    constructor(props) {
        super(props);
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
                                        {data.post_content} |
                                        {data.category}
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

export default All;