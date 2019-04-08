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
        this.props.move({
            "spaceFrom": this.state.previousSpace,
            "spaceTo": name
        });
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
  const board = [];//An array of Components
  for (let i = 0; i < 64; i++) {
    let numberIndex = 7 -Math.floor(i / 8); //To order the numbers right to left,subtract by max index.
    let letterIndex = i % 8; //Have the letters based upon the remainder
    board.push(<Space
                  key={i} //Separate key values are recommended by React. I don't need this though
                  spaceName={letters[letterIndex] + numbers[numberIndex]}
                  index={i + numberIndex} // rotate the color each row
                  handleClick = {onClick} // Pass the constraints down.
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
