import { Board } from "../Board.js";
import { Piece } from "../Piece.js"

class Pawn extends Piece {
  constructor(color, position) {
    super(color, position);
    if (this.color == "white") {
      this.name="wP";
    }
    else {
      this.name="bP";
    }
  }

  getValidMoves(board) {
    let moves = [];
    if (this.color == "white") {
      if (this.position[0]==1) {
        if (board.board[this.position[0]+1][this.position[1]] == "e") {
          moves.push([this.position[0]+1, this.position[1]]);
        }
        if (board.board[this.position[0]+2][this.position[1]] == "e") {
          moves.push([this.position[0]+2, this.position[1]])
        }
      }

      else {
        if (board.board[this.position[0]+1][this.position[1]] == "e") {
          moves.push([this.position[0]+1,this.position[1]]);
        } 
      }
    }

    if (this.color == "black") {
      if (this.position[0]==6){
        if (this.position[0]==1) {
          if (board.board[this.position[0]-1][this.position[1]] == "e") {
            moves.push([this.position[0]-1, this.position[1]]);
          }
          if (board.board[this.position[0]-2][this.position[1]] == "e") {
            moves.push([this.position[0]-2, this.position[1]])
          }
        }
  
        else {
          if (board.board[this.position[0]-1][this.position[1]] == "e") {
            moves.push([this.position[0]-1,this.position[1]]);
          } 
        }
      }
    }
  }

}

export { Pawn };