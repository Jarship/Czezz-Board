import React, { Component } from 'react';
import './App.css';
import Chess from './modules/chess';
import communication from './io/communication';

class App extends Component {
  render() {
    return (
      <Chess
        move={communication.makeMove}
      />
    );
  }
}

export default App;
