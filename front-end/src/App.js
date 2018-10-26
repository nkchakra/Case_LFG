import React, { Component } from 'react';
import './styles/App.css';
import {Jumbotron, Button} from 'react-bootstrap';
import Welcome from './Components/Welcome';
import Feed from './Components/Feed';
import Post from './Components/Post';
import Results from "./Components/Results"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome/>
        <Post/>
        <Feed/>
        <Results/>

      </div>
    );
  }
}

export default App;
