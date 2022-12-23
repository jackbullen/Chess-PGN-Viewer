import { Piece } from "../Piece.js"

class King extends Piece {
  constructor(color, position) {
    super(color, position);
    if (this.color == "white") {
      this.name="wK";
    }
    else {
      this.name="bK";
    }
  }

  // Return an array of valid positions that the king can move to
  // (+1,+1), (+1,-1), (+1,0), (0,0), (-1,+1), (-1,-1), (-1,0), (-1,-1)
  getValidMoves(board) {
    let moves = [];

    moves.push([this.position[0]+1, this.position[1]+1]);
    moves.push([this.position[0]+1, this.position[1]-1]);
    moves.push([this.position[0]+1, this.position[1]+0]);
    moves.push([this.position[0]-0, this.position[1]-0]);
    moves.push([this.position[0]-1, this.position[1]+1]);
    moves.push([this.position[0]-1, this.position[1]-1]);
    moves.push([this.position[0]-1, this.position[1]-0]);
    moves.push([this.position[0]-1, this.position[1]-1]);
    return moves;
  }

  isAttacking(piece) {
    // Return true if the king is attacking the specified piece, false otherwise
  }
}

export { King };