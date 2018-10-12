import React, { Component } from 'react';
import './styles/App.css';
import {Jumbotron, Button} from 'react-bootstrap';
import Welcome from './Components/Welcome';
import Feed from './Components/Feed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome/>
        <Feed/>
      </div>
    );
  }
}

export default App;
