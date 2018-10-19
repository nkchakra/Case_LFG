import React, { Component } from 'react';

// assumes dummy object called searchResults, will call api later on with backend

//framework of getting data using ajax
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

const searchResults = [
    {
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



//does searching by category for now
function searchingFor(term){
    return function(x){
        return x.description.toLowerCase().includes(term.toLowerCase()) || !term;
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
        <center>
         <table>
           <td>Username |</td>
           <td>Subject |</td>
           <td>Category </td>
         </table>
         </center>
      {
        searchResults.filter(searchingFor(term)).map(searchResults =>
            <div key = {searchResults.id}>
                  <center>
                        <ul className = "list-group">
                            <li className = "list-group-item">
                                {searchResults.username} |
                                {searchResults.description} |
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