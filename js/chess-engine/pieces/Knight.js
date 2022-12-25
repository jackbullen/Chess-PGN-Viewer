import { Piece } from "../Piece.js"

class Knight extends Piece {
  constructor(color, position) {
    super(color, position);
    if (this.color == "white") {
      this.name="wN";
    }
    else {
      this.name="bN";
    }
  }

  // Return an array of valid positions that the knight can move to
  // (+2,+1), (+2,-1), (-2,+1), (-2,-1), (-1,+2), (-1,-2), (+1,-2), (+1,+2)
  getValidMoves(board) {
    let moves = [];
    
    if (this.captured == true) {
      return [];
    }
    if(this.color == "black"){
      if (0<=this.position[0]+2 && this.position[0]+2<=7 && 0<=this.position[1]+1 && this.position[1]+1<=7){
        if (board.whitePieces.includes(board.board[this.position[0]+2][this.position[1]+1])){
          moves.push([this.position[0]+2, this.position[1]+1]);
          
        }
        if (board.board[this.position[0]+2][this.position[1]+1] == "e") {
          moves.push([this.position[0]+2, this.position[1]+1]);
        }
      }
    
      if (0<=this.position[0]+2 && this.position[0]+2<=7 && 0<=this.position[1]-1 && this.position[1]-1<=7){
        if (board.whitePieces.includes(board.board[this.position[0]+2][this.position[1]-1])){
          moves.push([this.position[0]+2, this.position[1]-1]);
          
        }
        if (board.board[this.position[0]+2][this.position[1]-1] == "e") {
          moves.push([this.position[0]+2, this.position[1]-1]);
        }
      }
      
      if (0<=this.position[0]-2 && this.position[0]-2<=7 && 0<=this.position[1]+1 && this.position[1]+1<=7){
        if (board.whitePieces.includes(board.board[this.position[0]-2][this.position[1]+1])){
          moves.push([this.position[0]-2, this.position[1]+1]);
          
        }
        if (board.board[this.position[0]-2][this.position[1]+1] == "e") {
          moves.push([this.position[0]-2, this.position[1]+1]);
        }
      }
      
      if (0<=this.position[0]-2 && this.position[0]-2<=7 && 0<=this.position[1]-1 && this.position[1]-1<=7){
        if (board.whitePieces.includes(board.board[this.position[0]-2][this.position[1]-1])){
          moves.push([this.position[0]-2, this.position[1]-1]);
          
        }
        if (board.board[this.position[0]-2][this.position[1]-1] == "e") {
          moves.push([this.position[0]-2, this.position[1]-1]);
        }
      }
      
      if (0<=this.position[0]-1 && this.position[0]-1<=7 && 0<=this.position[1]+2 && this.position[1]+2<=7){
        if (board.whitePieces.includes(board.board[this.position[0]-1][this.position[1]+2])){
          moves.push([this.position[0]-1, this.position[1]+2]);
          
        }
        if (board.board[this.position[0]-1][this.position[1]+2] == "e") {
          moves.push([this.position[0]-1, this.position[1]+2]);
        }
      }
      
      if (0<=this.position[0]-1 && this.position[0]-1<=7 && 0<=this.position[1]-2 && this.position[1]-2<=7){
        if (board.whitePieces.includes(board.board[this.position[0]-1][this.position[1]-2])){
          moves.push([this.position[0]-1, this.position[1]-2]);
          
        }
        if (board.board[this.position[0]-1][this.position[1]-2] == "e") {
          moves.push([this.position[0]-1, this.position[1]-2]);
        }
      }
      
      if (0<=this.position[0]+1 && this.position[0]+1<=7 && 0<=this.position[1]-2 && this.position[1]-2<=7){
        if (board.whitePieces.includes(board.board[this.position[0]+1][this.position[1]-2])){
          moves.push([this.position[0]+1, this.position[1]-2]);
          
        }
        if (board.board[this.position[0]+1][this.position[1]-2] == "e") {
          moves.push([this.position[0]+1, this.position[1]-2]);
        }
      }
      
      if (0<=this.position[0]+1 && this.position[0]+1<=7 && 0<=this.position[1]+2 && this.position[1]+2<=7){
        if (board.whitePieces.includes(board.board[this.position[0]+1][this.position[1]+2])){
          moves.push([this.position[0]+1, this.position[1]+2]);
          
        }
        if (board.board[this.position[0]+1][this.position[1]+2] == "e") {
          moves.push([this.position[0]+1, this.position[1]+2]);
        }
      }
  }
  else {
    if (0<=this.position[0]+2 && this.position[0]+2<=7 && 0<=this.position[1]+1 && this.position[1]+1<=7){
      if (board.blackPieces.includes(board.board[this.position[0]+2][this.position[1]+1])){
        moves.push([this.position[0]+2, this.position[1]+1]);
        
      }
      if (board.board[this.position[0]+2][this.position[1]+1] == "e") {
        moves.push([this.position[0]+2, this.position[1]+1]);
      }
    }
  
    if (0<=this.position[0]+2 && this.position[0]+2<=7 && 0<=this.position[1]-1 && this.position[1]-1<=7){
      if (board.blackPieces.includes(board.board[this.position[0]+2][this.position[1]-1])){
        moves.push([this.position[0]+2, this.position[1]-1]);
        
      }
      if (board.board[this.position[0]+2][this.position[1]-1] == "e") {
        moves.push([this.position[0]+2, this.position[1]-1]);
      }
    }
    
    if (0<=this.position[0]-2 && this.position[0]-2<=7 && 0<=this.position[1]+1 && this.position[1]+1<=7){
      if (board.blackPieces.includes(board.board[this.position[0]-2][this.position[1]+1])){
        moves.push([this.position[0]-2, this.position[1]+1]);
        
      }
      if (board.board[this.position[0]-2][this.position[1]+1] == "e") {
        moves.push([this.position[0]-2, this.position[1]+1]);
      }
    }
    
    if (0<=this.position[0]-2 && this.position[0]-2<=7 && 0<=this.position[1]-1 && this.position[1]-1<=7){
      if (board.blackPieces.includes(board.board[this.position[0]-2][this.position[1]-1])){
        moves.push([this.position[0]-2, this.position[1]-1]);
        
      }
      if (board.board[this.position[0]-2][this.position[1]-1] == "e") {
        moves.push([this.position[0]-2, this.position[1]-1]);
      }
    }
    
    if (0<=this.position[0]-1 && this.position[0]-1<=7 && 0<=this.position[1]+2 && this.position[1]+2<=7){
      if (board.blackPieces.includes(board.board[this.position[0]-1][this.position[1]+2])){
        moves.push([this.position[0]-1, this.position[1]+2]);
        
      }
      if (board.board[this.position[0]-1][this.position[1]+2] == "e") {
        moves.push([this.position[0]-1, this.position[1]+2]);
      }
    }
    
    if (0<=this.position[0]-1 && this.position[0]-1<=7 && 0<=this.position[1]-2 && this.position[1]-2<=7){
      if (board.blackPieces.includes(board.board[this.position[0]-1][this.position[1]-2])){
        moves.push([this.position[0]-1, this.position[1]-2]);
        
      }
      if (board.board[this.position[0]-1][this.position[1]-2] == "e") {
        moves.push([this.position[0]-1, this.position[1]-2]);
      }
    }
    
    if (0<=this.position[0]+1 && this.position[0]+1<=7 && 0<=this.position[1]-2 && this.position[1]-2<=7){
      if (board.blackPieces.includes(board.board[this.position[0]+1][this.position[1]-2])){
        moves.push([this.position[0]+1, this.position[1]-2]);
        
      }
      if (board.board[this.position[0]+1][this.position[1]-2] == "e") {
        moves.push([this.position[0]+1, this.position[1]-2]);
      }
    }
    
    if (0<=this.position[0]+1 && this.position[0]+1<=7 && 0<=this.position[1]+2 && this.position[1]+2<=7){
      if (board.blackPieces.includes(board.board[this.position[0]+1][this.position[1]+2])){
        moves.push([this.position[0]+1, this.position[1]+2]);
        
      }
      if (board.board[this.position[0]+1][this.position[1]+2] == "e") {
        moves.push([this.position[0]+1, this.position[1]+2]);
      }
    }

  }
    console.log(this.color, moves);
    return moves;
  }
  
}

export { Knight };