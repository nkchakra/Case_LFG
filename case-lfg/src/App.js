import React, { Component } from 'react';
import './styles/App.css';
import {Jumbotron, Button} from 'react-bootstrap';
import Welcome from './Components/Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome/>
      </div>
    );
  }
}

export default App;
