import React, { Component } from 'react';
import '../styles/Results.css';


// assumes dummy object called searchResults, will call api later on with backend

//Fetch which will get the data and set the state to the response, need to update constantly
//fetch('http://ec2-18-191-25-105.us-east-2.compute.amazonaws.com:6009', {mode: 'no-cors'}, {
//      method: 'GET',
//      this.setState(response),
//    });

//This will be the right data for each category

const searchResults = [
    {
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



//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.post_content.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}
class Results extends Component {

  constructor(props){
    super(props);
        this.state = {
            searchResults: searchResults,
            term: '',
        }
        this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(event){
    this.setState({term: event.target.value})
  }
  render() {
    const{term, people} = this.state;
    return (
      <div className="result-container">

               <form>
                   <input type = "text"
                       onChange ={this.searchHandler}
                       value = {term}
                   />
               </form>
      {
        searchResults.filter(searchingFor(term)).map(searchResults =>
            <div key = {searchResults.user}>
                  <center>
                        <ul className = "list-group">
                            <li className = "list-group-item">
                                {searchResults.user} |
                                {searchResults.post_content} |
                                {searchResults.category}
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

export default Results;