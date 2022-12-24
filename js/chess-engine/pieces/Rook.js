import { Piece } from "../Piece.js"

class Rook extends Piece {
  constructor(color, position) {
    super(color, position);
    if (this.color == "white") {
      this.name="wR";
    }
    else {
      this.name="bR";
    }
  }

  // Return an array of valid positions that the Rook can move to
  getValidMoves(board) {
    let moves = []
    if (this.color == "white") {

      // up
      for (let i = 1; i<7; i++){
        if (0<=this.position[0]+i && this.position[0]+i<=7 && 0<=this.position[1] && this.position[1]<=7){
          if (board.blackPieces.includes(board.board[this.position[0]+i][this.position[1]])){
            moves.push([this.position[0]+i, this.position[1]]);
            break
          }
          if (board.board[this.position[0]+i][this.position[1]] == "e"){
            moves.push([this.position[0]+i, this.position[1]]);
            continue;
          }
          break;
        }
      }
      // left 
      for (let i = 1; i<7; i++){
        if (0<=this.position[0] && this.position[0]<=7 && 0<=this.position[1]-i && this.position[1]-i<=7){
          if (board.blackPieces.includes(board.board[this.position[0]][this.position[1]-i])){
            moves.push([this.position[0], this.position[1]-i]);
            break
          }
          if (board.board[this.position[0]][this.position[1]-i] == "e"){
            moves.push([this.position[0], this.position[1]-i]);
            continue;
          }
          break;
        }
      }
      // right
      for (let i = 1; i<7; i++){
        if (0<=this.position[0] && this.position[0]<=7 && 0<=this.position[1]+i && this.position[1]+i<=7){
          if (board.blackPieces.includes(board.board[this.position[0]][this.position[1]+i])){
            moves.push([this.position[0], this.position[1]+i]);
            break
          }
          if (board.board[this.position[0]][this.position[1]+i] == "e"){
            moves.push([this.position[0], this.position[1]+i]);
            continue;
          }
          break;
        }
      }
      // down
      for (let i = 1; i<7; i++){
        if (0<=this.position[0]-i && this.position[0]-i<=7 && 0<=this.position[1] && this.position[1]<=7){
          if (board.blackPieces.includes(board.board[this.position[0]-i][this.position[1]])){
            moves.push([this.position[0]-i, this.position[1]]);
            break
          }
          if (board.board[this.position[0]-i][this.position[1]] == "e"){
            moves.push([this.position[0]-i, this.position[1]]);
            continue;
          }
          break;
        }
    }
    
    return moves;
  }

  else {
    // up
    for (let i = 1; i<7; i++){
      if (0<=this.position[0]+i && this.position[0]+i<=7 && 0<=this.position[1] && this.position[1]<=7){
        if (board.whitePieces.includes(board.board[this.position[0]+i][this.position[1]])){
          moves.push([this.position[0]+i, this.position[1]]);
          break
        }
        if (board.board[this.position[0]+i][this.position[1]] == "e"){
          moves.push([this.position[0]+i, this.position[1]]);
          continue;
        }
        break;
      }
    }
    // left 
    for (let i = 1; i<7; i++){
      if (0<=this.position[0] && this.position[0]<=7 && 0<=this.position[1]-i && this.position[1]-i<=7){
        if (board.whitePieces.includes(board.board[this.position[0]][this.position[1]-i])){
          moves.push([this.position[0], this.position[1]-i]);
          break
        }
        if (board.board[this.position[0]][this.position[1]-i] == "e"){
          moves.push([this.position[0], this.position[1]-i]);
          continue;
        }
        break;
      }
    }
    // right
    for (let i = 1; i<7; i++){
      if (0<=this.position[0] && this.position[0]<=7 && 0<=this.position[1]+i && this.position[1]+i<=7){
        if (board.whitePieces.includes(board.board[this.position[0]][this.position[1]+i])){
          moves.push([this.position[0], this.position[1]+i]);
          break
        }
        if (board.board[this.position[0]][this.position[1]+i] == "e"){
          moves.push([this.position[0], this.position[1]+i]);
          continue;
        }
        break;
      }
    }
    // down
    for (let i = 1; i<7; i++){
      if (0<=this.position[0]-i && this.position[0]-i<=7 && 0<=this.position[1] && this.position[1]<=7){
        if (board.whitePieces.includes(board.board[this.position[0]-i][this.position[1]])){
          moves.push([this.position[0]-i, this.position[1]]);
          break
        }
        if (board.board[this.position[0]-i][this.position[1]] == "e"){
          moves.push([this.position[0]-i, this.position[1]]);
          continue;
        }
        break;
      }
    }
    return moves;
  }
}

  isAttacking(piece) {
    // Return true if the queen is attacking the specified piece, false otherwise
  }
}

export { Rook };