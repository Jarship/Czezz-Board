import React, { Component, useState, useEffect } from 'react';
import './board.css';

const colors = ['black', 'white'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

class Board extends Component {
  state = {
    previousSpace: null
  };
  handleSpaceClick = (name) => {
    return (evt) => {
      if (!this.state.previousSpace) {
        this.setState({
          previousSpace : name
        });
      }
      else {
        //Transmit previousSpace and name
        //Render the board with no spaces selected
        console.log(this.state.previousSpace);
        this.setState({
          previousSpace : null
        });
      }
    };
  };
  render() {
    return (
      <div className = "board">
        {buildBoard(this.handleSpaceClick)}
      </div>
    );
  }
}


function buildBoard (onClick) {
  const board = [];
  for (let i = 0; i < 64; i++) {
    let numberIndex = 7 -Math.floor(i / 8);
    let letterIndex = i % 8;
    board.push(<Space
                  key={i}
                  spaceName={letters[letterIndex] + numbers[numberIndex]}
                  index={i + numberIndex}
                  handleClick = {onClick}
                />);
  }
  return board;
}

function Space(props) {
  const [hasPiece,setHasPiece] = useState(false);
  useEffect(() => {

  })
  return  (
    <div
      value ={props.spaceName}
      className={"space "+colors[props.index % 2]}
      tabIndex={props.index}
      onClick={props.handleClick(props.spaceName)}
    >

    </div>
  );
}


export default Board;
