import React, { Component } from 'react';
import Board from '../../components/board';

class Chess extends Component {
  render() {
    return (
      <Board
        move = {this.props.move}
        updateBoard = {this.props.updateBoard}
      />
    );
  }
}

export default Chess;
