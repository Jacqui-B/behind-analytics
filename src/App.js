import React, { Component } from 'react';
import './App.css';

//What are my steps
//set up react app in react create
//add express 
//create route paths for root page / about page abd video page / log page
// set up boot strap for a simple outline of the web page

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
