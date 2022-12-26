import { Piece } from './Piece.js';
import { Bishop } from './pieces/Bishop.js'
import { Knight } from './pieces/Knight.js'
import { King } from './pieces/King.js'
import { Rook } from './pieces/Rook.js'
import { Queen } from './pieces/Queen.js'
import { Pawn } from './pieces/Pawn.js'

class StringBuilder {
    constructor() {
      this.data = [];
    }
    append(string) {
      this.data.push(string);
    }
    toString() {
      return this.data.join('');
    }
  }

class Board {
    constructor() {
        this.board = this.createBoard();
        this.undoMove = this.createBoard();
        this.whitePieces = [];
        this.blackPieces = [];
        this.initializePieces();
        this.movenum = 0
    }
    toString() {
        let sb = new StringBuilder();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 7; col++) {
                sb.append(this.board[row][col]);
            }
            sb.append("\n");
        }
        return sb.toString();
    }

  createBoard() {
    // Create and return a 2D array representing the chess board
    const board = [];
    for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
          row.push('e');
        }
        board.push(row);
    }
    return board;
  }
// Add the initial set of chess pieces to the piece arrays, then to the board.
  initializePieces() {
    // Add white pieces
    this.whitePieces.push(new Rook('white', [0, 0]));
    this.whitePieces.push(new Knight('white', [0, 1]));
    this.whitePieces.push(new Bishop('white', [0, 2]));
    this.whitePieces.push(new King('white', [0, 3]));
    this.whitePieces.push(new Queen('white', [0, 4]));
    this.whitePieces.push(new Bishop('white', [0, 5]));
    this.whitePieces.push(new Knight('white', [0, 6]));
    this.whitePieces.push(new Rook('white', [0, 7]));
    for (let i = 0; i < 8; i++) {
    this.whitePieces.push(new Pawn('white', [1, i]));
    }
    // Add black pieces
    this.blackPieces.push(new Rook('black', [7, 0])); 
    this.blackPieces.push(new Knight('black', [7, 1]));
    this.blackPieces.push(new Bishop('black', [7, 2]));
    this.blackPieces.push(new King('black', [7, 3]));
    this.blackPieces.push(new Queen('black', [7, 4]));
    this.blackPieces.push(new Bishop('black', [7, 5]));
    this.blackPieces.push(new Knight('black', [7, 6]));   
    this.blackPieces.push(new Rook('black', [7, 7]));
    for (let i = 0; i < 8; i++) {
    this.blackPieces.push(new Pawn('black', [6, i]));
    }

    // Add the pieces to the board
    for (let i = 0; i < this.whitePieces.length; i++) {
    const piece = this.whitePieces[i];
    let x = piece.position[0];
    let y = piece.position[1];
    this.board[x][y] = piece;
    }
    for (let i = 0; i < this.blackPieces.length; i++) {
    const piece = this.blackPieces[i];
    let x = piece.position[0];
    let y = piece.position[1];
    this.board[x][y] = piece;
    }
  }

  reset() {
    this.board = this.createBoard();
    this.whitePieces = [];
    this.blackPieces = [];
    this.initializePieces();
  }

  // Castle move logic
  castle(king, rook, short) {

    this.movenum+=1/2;

    // Check castle is possible?

    // Perform the castling
    this.board[king.position[0]][king.position[1]] = "e";
    this.board[rook.position[0]][rook.position[1]] = "e";
    if (short) {
      this.board[king.position[0]][king.position[1]-1] = rook;
      this.board[rook.position[0]][rook.position[1]+1] = king;
      const tmp = [rook.position[0], rook.position[1]];
      rook.position = [king.position[0], king.position[1]-1];
      king.position = [tmp[0], tmp[1]+1];
    }
    else {
      this.board[king.position[0]][king.position[1]+1] = rook;
      this.board[rook.position[0]][rook.position[1]-2] = king;
      const tmp = [rook.position[0], rook.position[1]];
      rook.position = [king.position[0], king.position[1]+1];
      king.position = [tmp[0], tmp[1]-2];
    }
  }

  // Move logic
  move(src, dest, piece) {

    this.movenum+=1/2;

    const srcX = piece.position[0];
    const srcY = piece.position[1];

    const endX = dest[0];
    const endY = dest[1];

    // Check if the end positions are valid
    if (endX < 0 || endX >= this.board.length || endY < 0 || endY >= this.board[0].length) {
      console.log('Invalid start position');
    return;
    }
    
    // Perform the moves
    this.board[endX][endY] = piece;
    this.board[src[0]][src[1]] = "e";
    
    piece.position = [endX, endY];
  }

  forwardMove(move) {
console.log(move);
      if (this.movenum == Math.floor(this.movenum)) {
        // White castles
        if (move[3] == "King and Rook") {
            let king = this.whitePieces[3];
            // Short
            if (move[2] == "O-O"){
                let rook = this.whitePieces[0];
                this.castle(king, rook, true);
            }
            // Long
            else {
                let rook = this.whitePieces[7];
                this.castle(king, rook, false);
            }
        }
        // Non-castle white move
        else {
            let pieceW = this.whitePieces[move[4]];
            let srcSqrW = pieceW.position;
            this.move(srcSqrW, move.slice(0,2), pieceW);
        }
    }
    else{
        // Black castles
        if (move[3] == "King and Rook") {
            let king = this.blackPieces[3];
            // Short
            
            if (move[2] == "O-O"){
                let rook = this.blackPieces[0];
                // console.log(king.position,rook.position);
                this.castle(king, rook, true);
            }
            // Long
            else {
                let rook = this.blackPieces[7];
                this.castle(king, rook, false);
            }
        }
        // Non-castle black move
        else {
            const pieceB = this.blackPieces[move[4]];
            const srcSqrB = pieceB.position;
            this.move(srcSqrB, move.slice(0,2), pieceB);
        }
    }
  }
  // Check if a square is occupied by a piece, return true if so.
  occupied(sqr){
    if (this.board[sqr] == "e") return false;
    else return true;
  }

}
export { Board };