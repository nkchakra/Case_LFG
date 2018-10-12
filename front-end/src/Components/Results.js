import React, { Component } from 'react';

// assumes dummy object called searchResults, will call api later on with backend

const searchResults = [
    {
        id: 1,
        title: "CSGO 5 queue at 3",
        category: "Videogames"
    },
    {
        id: 2,
        title: "Basketball at 6 at Veale",
        category: "Sports"
    },
    {
        id: 3,
        title: "Coding group for 293?",
        category: "Misc"
    }
]



//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
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
      <div className="Results">
        <form>
            <input type = "text"
                onChange ={this.searchHandler}
                value = {term}
            />
        </form>
      {
        searchResults.filter(searchingFor(term)).map(searchResults =>
            <div key = {searchResults.id}>
                <h1> {searchResults.title} </h1>
            </div>
        )
      }
      </div>
    );
  }
}

export default Results;