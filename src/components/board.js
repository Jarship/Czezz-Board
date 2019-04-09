import React, { Component, useState, useEffect } from 'react';
import './board.css';

const colors = ['black', 'white'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const pieceTable = {
  "c": "blackChecker", "C": "whiteChecker",
  "p": "blackPawn", "P": "whitePawn",
  "i": "blackPike", "I": "whitePike",
  "b": "blackBishop", "B": "whiteBishop",
  "n": "blackKnight", "N": "whiteKnight",
  "g": "blackGeneral", "G": "whiteGeneral",
  "y": "blackCavalry", "Y": "whiteCavalry",
  "r": "blackRook", "R": "whiteRook",
  "o": "blackCannon", "O": "whiteCannon",
  "l": "blackPatrol", "L": "whitePatrol",
  "q": "blackQueen", "Q": "whiteQueen",
  "e": "blackPrince", "E": "whitePrince",
  "s": "blackPrincess", "S": "whitePrincess",
  "k": "blackKing", "K": "whiteKing"
};

class Board extends Component {
  state = {
    previousSpace: null,
    board: {
      "A1":"", "A2": "", "A3": "", "A4": "", "A5": "", "A6": "", "A7": "", "A8": "",
      "B1":"", "B2": "", "B3": "", "B4": "", "B5": "", "B6": "", "B7": "", "B8": "",
      "C1":"", "C2": "", "C3": "", "C4": "", "C5": "", "C6": "", "C7": "", "C8": "",
      "D1":"", "D2": "", "D3": "", "D4": "", "D5": "", "D6": "", "D7": "", "D8": "",
      "E1":"", "E2": "", "E3": "", "E4": "", "E5": "", "E6": "", "E7": "", "E8": "",
      "F1":"", "F2": "", "F3": "", "F4": "", "F5": "", "F6": "", "F7": "", "F8": "",
      "G1":"", "G2": "", "G3": "", "G4": "", "G5": "", "G6": "", "G7": "", "G8": "",
      "H1":"", "H2": "", "H3": "", "H4": "", "H5": "", "H6": "", "H7": "", "H8": "",

    }
  };
  componentDidMount() {
    this.loadBoard();
  }

  loadBoard = () => {
    this.props.updateBoard()
      .then(res => {
        console.log(res);
        if(res === this.state.board) {
          setTimeout('', 5000);
          this.loadBoard();
        }
        else {
          this.setState({
            board:res
          });
        }
      })
      .catch(err => console.error(err));
  };

  sendMove = (newMove) => {
    this.props.move({
      "spaceFrom": this.state.previousSpace,
      "spaceTo": newMove
    });
  };

  handleSpaceClick = (name) => {
    return (evt) => {
      if (!this.state.previousSpace) {
        this.setState({
          previousSpace : name
        });
      }
      else if (this.state.previousSpace !== name) {
        this.sendMove(name);
        this.setState({
          previousSpace: null
        });
      }
    };
  };
  render() {
    return (
      <div className = "board">
        {buildBoard(this.state.board,this.handleSpaceClick)}
      </div>
    );
  }
}


function buildBoard (pieces, onClick) {
  const board = [];//An array of Components
  for (let i = 0; i < 64; i++) {
    let numberIndex = 7 -Math.floor(i / 8); //To order the numbers right to left,subtract by max index.
    let letterIndex = i % 8; //Have the letters based upon the remainder
    let spaceName = letters[letterIndex] + numbers[numberIndex];
    board.push(<Space
                  key={i} //Separate key values are recommended by React. I don't need this though
                  spaceName={spaceName}
                  index={i + numberIndex} // rotate the color each row
                  handleClick = {onClick} // Pass the event handler down.
                  piece= {pieces[spaceName]}
                />);
  }
  return board;
}

function Space(props) {
  const [piece,setPiece] = useState("");
  const fileString = `http://localhost:3000/images/pngs/${piece}.png`;
  useEffect(() => {
    if (!!props.piece) {
      const p = pieceTable[props.piece];
      if (p !== piece) {
        setPiece(p);
      }
    }
    else {
      setPiece("");
    }
  })
  return  (
    <div
      value ={props.spaceName}
      className={"space "+colors[props.index % 2]}
      tabIndex={props.index}
      onClick={props.handleClick(props.spaceName)}
    >
    <img src={piece?fileString:""} alt={piece}/>
    </div>
  );
}


export default Board;
