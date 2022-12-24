import { Piece } from "../Piece.js"

class Bishop extends Piece {
  constructor(color, position) {
    super(color, position);
    if (this.color == "white") {
      this.name="wB";
    }
    else {
      this.name="bB";
    }
  }

  // Return an array of valid positions that the bishop can move to.
  // iterate down each diagonal and collect the move if the square
  // is empty, if not, break.
  getValidMoves(board) {
    let moves = [];

    if (this.color == "white") {
      // up right diag
      for (let i = 1; i<=7; i++){
        if (this.position[0]+i<=7 && 0<=this.position[1]-i){
          if (board.blackPieces.includes(board.board[this.position[0]+i][this.position[1]-i])){
            moves.push([this.position[0]+i, this.position[1]-i]);
            break
          }
          if (board.board[this.position[0]+i][this.position[1]-i] == "e"){
            moves.push([this.position[0]+i, this.position[1]-i]);
            continue;
          }
          break;
        }
      }
      // up left diag
      for (let i = 1; i<=7; i++){
        if (this.position[0]+i<=7 && this.position[1]+i<=7){
          if (board.blackPieces.includes(board.board[this.position[0]+i][this.position[1]+i])){
            moves.push([this.position[0]+i, this.position[1]+i]);
            break
          }
          if (board.board[this.position[0]+i][this.position[1]+i] == "e"){
            moves.push([this.position[0]+i, this.position[1]+i]);
            continue;
          }
          break;
        }
      }
      // down right diag
      for (let i = 1; i<=7; i++){
        if (0<=this.position[0]-i && 0<=this.position[1]-i){
          if (board.blackPieces.includes(board.board[this.position[0]-i][this.position[1]-i])){
            moves.push([this.position[0]-i, this.position[1]-i]);
            break
          }
          if (board.board[this.position[0]-i][this.position[1]-i] == "e"){
            moves.push([this.position[0]-i, this.position[1]-i]);
            continue;
          }
          break;
        }
      }
      // down left diag
      for (let i = 1; i<=7; i++){
        if (0<=this.position[0]-i && this.position[1]+i<7){
          if (board.blackPieces.includes(board.board[this.position[0]-i][this.position[1]+i])){
            moves.push([this.position[0]-i, this.position[1]+i]);
            break
          }
          if (board.board[this.position[0]-i][this.position[1]+i] == "e"){
            moves.push([this.position[0]-i, this.position[1]+i]);
            continue;
          }
          break;
        }
      }

      
    }
    else {
      // up right diag
      for (let i = 1; i<=7; i++){
        if (this.position[0]+i<=7 && 0<=this.position[1]-i){
          if (board.whitePieces.includes(board.board[this.position[0]+i][this.position[1]-i])){
            moves.push([this.position[0]+i, this.position[1]-i]);
            break
          }
          if (board.board[this.position[0]+i][this.position[1]-i] == "e"){
            moves.push([this.position[0]+i, this.position[1]-i]);
            continue;
          }
          break;
        }
      }
      // up left diag
      for (let i = 1; i<=7; i++){
        if (this.position[0]+i<=7 && this.position[1]+i<=7){
          if (board.whitePieces.includes(board.board[this.position[0]+i][this.position[1]+i])){
            moves.push([this.position[0]+i, this.position[1]+i]);
            break
          }
          if (board.board[this.position[0]+i][this.position[1]+i] == "e"){
            moves.push([this.position[0]+i, this.position[1]+i]);
            continue;
          }
          break;
        }
      }
      // down right diag
      for (let i = 1; i<=7; i++){
        if (0<=this.position[0]-i && 0<=this.position[1]-i){
          if (board.whitePieces.includes(board.board[this.position[0]-i][this.position[1]-i])){
            moves.push([this.position[0]-i, this.position[1]-i]);
            break
          }
          if (board.board[this.position[0]-i][this.position[1]-i] == "e"){
            moves.push([this.position[0]-i, this.position[1]-i]);
            continue;
          }
          break;
        }
      }
      // down left diag
      for (let i = 1; i<=7; i++){
        if (0<=this.position[0]-i && this.position[1]+i<7){
          if (board.whitePieces.includes(board.board[this.position[0]-i][this.position[1]+i])){
            moves.push([this.position[0]-i, this.position[1]+i]);
            break
          }
          if (board.board[this.position[0]-i][this.position[1]+i] == "e"){
            moves.push([this.position[0]-i, this.position[1]+i]);
            continue;
          }
          break;
        }
      }
    }
    // console.log(board.movenum,moves);
    return moves;
  }


  isAttacking(piece) {
    // Return true if the bishop is attacking the specified piece, false otherwise
  }
}

export { Bishop };
