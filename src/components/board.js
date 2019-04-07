import React, { Component } from 'react';
import './board.css';

const colors = ['black', 'white'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

class Board extends Component {
  render() {
    return (
      <div className = "board">
        {buildBoard()}
      </div>
    );
  }
}

function buildBoard () {
  const board = [];
  for (let i = 0; i < 64; i++) {
    let numberIndex = 7 -Math.floor(i / 8);
    let letterIndex = i % 8;
    board.push(<Space spaceName={letters[letterIndex] + numbers[numberIndex]} index={i + numberIndex}/>);
  }
  return board;
}

function Space(props) {
    return  (
      <div
        name ={props.spaceName}
        className={"space "+colors[props.index % 2]}
        tabIndex={props.index}
      >
      </div>
    );
}


export default Board;
