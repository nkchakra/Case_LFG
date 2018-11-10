import React, { Component } from 'react';
import './styles/App.css';
import Welcome from './Components/Welcome';
import Feed from './Components/Feed';
import Post from './Components/Post';
import Results from "./Components/Results"
import Login from "./Components/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome/>
        <Post/>
        <Feed/>
        <Login/>
      </div>
    );
  }
}

export default App;
