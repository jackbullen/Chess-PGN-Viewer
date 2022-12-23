import { Piece } from "../Piece.js"

class Queen extends Piece {
  constructor(color, position) {
    super(color, position);
    if (this.color == "white") {
      this.name="wQ";
    }
    else {
      this.name="bQ";
    }
  }
  
  getValidMoves() {
    // Return an array of valid positions that the queen can move to
  }

  isAttacking(piece) {
    // Return true if the queen is attacking the specified piece, false otherwise
  }
}

export { Queen };