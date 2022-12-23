import { Board } from './chess-engine/Board.js';
  

const chessBoardDiv = document.getElementById('board');
const chessBoard = [];

const applyMoves = (board, submovesList, movesList) => {
    
    let pieceW = board.whitePieces[submovesList[0][4]];
    let pieceB = board.blackPieces[submovesList[1][4]];
    let srcSqrW = pieceW.position;
    let srcSqrB = pieceB.position;
    board.move(srcSqrW, submovesList[0].slice(0,2), pieceW);
    board.move(srcSqrB, submovesList[1].slice(0,2), pieceB);
    movesList.push([submovesList[0],submovesList[1],submovesList[2]]);
    submovesList.length=0;
    renderBoard(board);
}
// Function for rendering the initial board, 
// only used once for each board, updateBoard()
// is used for rendering new moves.
const renderBoard = (board) => {
    
    for (let i = 0; i < 8; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
      for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        if ((i + j) % 2 === 0) {
          square.classList.add('white');
        } else {
          square.classList.add('black');
        }
        const piece = document.createElement('div');
        piece.classList.add('piece');

        // Create img element for chess piece
        const pieceImg = document.createElement('img');
    
        // Set src attribute to the location of the image file for the piece
        if (board.board[i][j]=="e"){
            pieceImg.src = `./images/e.png`;
        }
        else {
            // console.log(board.toString());
            pieceImg.src = `./images/${board.board[i][j].name}.png`;
        }
        const sqrLoc = document.createElement('p');
        const txt = document.createTextNode(`${i} ${j}`);
        sqrLoc.appendChild(txt);
        // Append the img element to the square
        piece.appendChild(pieceImg);
        square.appendChild(piece);
        square.appendChild(sqrLoc);
        row.appendChild(square);
        chessBoard.push(square);
      }
      chessBoardDiv.appendChild(row);
      
    }
    const space = document.createElement('p')
    const boardtxt = document.createTextNode(`${board.movenum}`);
    space.appendChild(boardtxt);
    chessBoardDiv.appendChild(space);
  };
  

  // ParsePGN(pgn, board)
  /*
    Input: 
        pgn: a string representing the PGN notation of a chess game.
        board: an instance of the Board class.

    Output:
        movesList: an array of arrays representing the moves made 
        in the chess game, with each inner array containing the 
        source square, destination square, and piece moved for 
        each move.

    Description:
    The parsePGN function first splits the pgn string into an array 
    of moves using a regular expression. It then initializes an empty
    array called movesList to store the moves as (row, col) pairs and 
    an empty array called submovesList to store the moves made in 
    each turn. It also initializes a boolean comment to track whether 
    the current move is within a comment block, a string check to 
    store whether the move results in a check, and a string peace to 
    store the piece being moved.

    The function then iterates over the array of moves and
    For each move, the function extracts the source and destination
    squares and the piece being moved. It then updates the 
    board by calling the move method on the board object. 
    The function stores each move in the movesList array and returns
    it to be used with seperate Board instances in the main program.

  */
  const parsePGN = (pgn, board) => {
    // Split the PGN string into an array of moves
    const moves = pgn.split(/\s+/);
  
    // Create an array to store the moves as (row, col) pairs
    const movesList = [];
    const submovesList = [];

    // Boolean to store whether we are in a comment or not
    let comment = false; 

    // String to store whether moves makes a check or not (+)
    let check = "";

    // What piece is being moved
    let peace = "";

    // Whose turn
    let turn = true;

    // Iterate over the moves to
    // find the destination (Row,Col) for the move and
    // handle the various cases for PGN notation
    for (let move of moves) {

        // Handle moves with a result,
        // (e.g. "1-0", "0-1", "1/2-1/2", "1.", "2.")
        if (move == "1-0" || move == "0-1" || move == "1/2-1/2") {
            // let pieceW = board.whitePieces[getSrcSqrIndex(board, submovesList[0][0], submovesList[0][1], submovesList[0][3])];
            // let pieceB = board.blackPieces[getSrcSqrIndex(board, submovesList[1][0], submovesList[1][1], submovesList[1][3])];
            // let srcSqrW = pieceW.position;
            // let srcSqrB = pieceB.position;
            // board.move(srcSqrW, submovesList[0].slice(0,2), pieceW);
            // board.move(srcSqrB, submovesList[1].slice(0,2), pieceB);
            // movesList.push([submovesList[0],submovesList[1],submovesList[2]]);
            // submovesList.length=0;
            applyMoves(board,submovesList,movesList);
            movesList.push(move);
            break;
        }

        // Reset peace and check indicators for new move
        peace = "";
        check = "";
        if (move.slice(-1) == "+") {
            check == "+";
            move = move.slice(0,-1);
        }

        // When the move is a move number, use this as a chance to 
        // update previous white and black moves on the parseBoard.
        if (move == "1.") continue;
        if ((move.includes(0) && move.includes(1)) ||  (move.includes(2) && move.includes(1))) continue;
        if (move.includes('.')) {

            // console.log(submovesList[0],submovesList[1]);

            // let pieceW = board.whitePieces[getSrcSqrIndex(board, submovesList[0][0], submovesList[0][1], submovesList[0][3])];
            // let pieceB = board.blackPieces[getSrcSqrIndex(board, submovesList[1][0], submovesList[1][1], submovesList[1][3])];
            // // console.log(getSrcSqrIndex(board, submovesList[0][0], submovesList[0][1], submovesList[0][3]));
            // let srcSqrW = pieceW.position;
            // let srcSqrB = pieceB.position;
            // board.move(srcSqrW, submovesList[0].slice(0,2), pieceW);
            // board.move(srcSqrB, submovesList[1].slice(0,2), pieceB);
            // movesList.push([submovesList[0],submovesList[1],submovesList[2]]);
            // submovesList.length=0;
            applyMoves(board,submovesList,movesList);
            continue;
        }

        // Handle PGN comments (e.g. "{Scandinavian Defense}")
        if (move == "}") {
            comment = false;
            continue;
        }
        if (move == "{" || comment == true) {
            comment = true;
            continue;
        }

        // Assume the move is pawn,
        // variables will update otherwise.
        peace = move[0]+"Pawn";
        let dest_row = parseInt(move[1])-1;
        let dest_col = 8-(move.charCodeAt(0) - 96);
        // console.log(board.toString());
    
        // Short castle
        if (move == "O-O") {
            peace = "King";
            dest_row = 0;
            dest_col = 0;
        }
        // Long castle
        if (move == "O-O-O") {
            peace = "King";
            dest_row = 0;
            dest_col = 0;
        }

        // King move
        if (move[0] == "K"){
            peace = "King";
            dest_row = parseInt(move.substring(1)[1])-1;
            dest_col = 8-(move.substring(1).charCodeAt(0) - 96);
        }
    
        // Bishop move
        if (move[0] == "B"){
            peace = "Bishop";
            dest_row = parseInt(move.substring(1)[1])-1;
            dest_col = 8-(move.substring(1).charCodeAt(0) - 96);
        }
    
        // Knight move
        if (move[0] == "N"){
            peace = "Knight";
            dest_row = parseInt(move.substring(1)[1])-1;
            dest_col = 8-(move.substring(1).charCodeAt(0) - 96);
        }
        // Rook move
        if (move[0] == "R"){
            peace = "Rook";
            dest_row = parseInt(move.substring(1)[1])-1;
            dest_col = 8-(move.substring(1).charCodeAt(0) - 96);
        }
        // Queen move
        if (move[0] == "Q"){
            peace = "Queen";
            dest_row = parseInt(move.substring(1)[1])-1;
            dest_col = 8-(move.substring(1).charCodeAt(0) - 96);
        }
        // Pawn captures
        if (move[1] == "x"){
            dest_row = parseInt(move.substring(2)[1])-1;
            dest_col = 8-(move.substring(2).charCodeAt(0) - 96);
        }

        // Ambiguous piece captures
        if ((move.length == 4 && !check) || move.length == 5) {
            dest_row = parseInt(move.substring(2)[1])-1;
            dest_col = 8-(move.substring(2).charCodeAt(0) - 96);
        }

        // Promotions
        if (move.includes('=')) {
            dest_row = parseInt(move[1])-1;
            dest_col = 8-(move.charCodeAt(0) - 96);
        }

        // console.log(dest_row, dest_col, move, peace);

        // add the move to the list
        // console.log(move+check, turn, getSrcPieceIndex(board, dest_row, dest_col, peace, turn));
        // console.log(board.whitePieces[2].position);

        submovesList.push([dest_row,dest_col,move+check,peace,getSrcPieceIndex(board, dest_row, dest_col, peace, turn)]);
        turn = !turn;
    }
    // console.log(movesList);
    return movesList;
  }
  const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  const getSrcPieceIndex= (board, dest_row, dest_col, piece, turn) => {

    // Pawn move
    if (piece.slice(1,) == "Pawn") {
        return 8+8-(piece[0].charCodeAt(0) - 96);
    }

    // King move
    if (piece == "King") {
        return 3;
    }

    // Bishop move
    if (piece == "Bishop") {
        let lBMoves = board.whitePieces[2].getValidMoves(board);
        let dBMoves = board.whitePieces[5].getValidMoves(board);
        if (!turn) {
            lBMoves = board.blackPieces[2].getValidMoves(board);
            dBMoves = board.blackPieces[5].getValidMoves(board);
        }
        if (lBMoves.some(el => arrayEquals(el, [dest_row,dest_col]))) {
            return 2;
        }
        else {
            return 5;
        }
    }
    // Knight move
    // Still need to handle which bishop is moving.
    // Write a getValidMoves() method in Bishop class.
    if (piece == "Knight") {
        let lKMoves = board.whitePieces[0].getValidMoves(board);
        let rKMoves = board.whitePieces[7].getValidMoves(board);
        if (!turn) {
            lKMoves = board.blackPieces[0].getValidMoves(board);
            rKMoves = board.blackPieces[7].getValidMoves(board);
        }
        if (lKMoves.some(el => arrayEquals(el, [dest_row,dest_col]))) {
            return 1;
        }
        else {
            return 6;
        }
        if (true) return 1;
        else return 6;
    }
    // Rook move
    // Still need to handle which bishop is moving.
    // Write a getValidMoves() method in Bishop class.
    if (piece == "Rook") {
        let lRMoves = board.whitePieces[0].getValidMoves(board);
        let rRMoves = board.whitePieces[7].getValidMoves(board);
        if (!turn) {
            lRMoves = board.blackPieces[0].getValidMoves(board);
            rRMoves = board.blackPieces[7].getValidMoves(board);
        }
        if (lRMoves.some(el => arrayEquals(el, [dest_row,dest_col]))) {
            return 0;
        }
        else {
            return 7;
        }
    }
    // Queen move
    if (piece == "Queen"){
        return 4;
    }
                                                              
  }
  
  const playGame = (game, board) => {

    renderBoard(board);

    game.forEach(move => {

        board.move(move[0], move[1]);
        renderBoard(board);
    });
  };

  


const parseBoard = new Board();
renderBoard(parseBoard);
const pgn = '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bf5 { B01 Scandinavian Defense: Classical Variation } 6. Bc4 e6 7. O-O c6 8. Re1 Nbd7 9. d5 cxd5 10. Nxd5 Nxd5 11. Bxd5 Rd8 12. Bg5 Nf6 13. Qe2 Rxd5 14. c4 Rd7 15. Qe5 Qxe5 16. Rxe5 Bd6 17. Re2 Ne4 18. Be3 O-O 19. Rc1 Bc5 20. Bxc5 Nxc5 21. Ne5 Rd4 22. b3 Rfd8 23. f3 Nd3 24. Nxd3 Bxd3 25. Rd2 b5 26. c5 Kf8 27. Kf2 Ke7 28. Ke3 e5 29. Rcd1 Bf5 30. Rxd4 exd4+ 31. Rxd4 Rxd4 32. Kxd4 Kd7 33. b4 Kc6 34. g4 Be6 35. h3 Bxa2 36. f4 Bb1 37. f5 Bc2 38. h4 Bb3 39. g5 f6 40. g6 hxg6 41. fxg6 Bd5 42. Ke3 a5 43. bxa5 Kxc5 44. h5 b4 45. h6 gxh6 46. a6 b3 47. a7 Kb4 48. g7 b2 49. a8=Q Bxa8 50. g8=Q Kc3 51. Qc8+ Kb3 0-1';
const moves = parsePGN(pgn, parseBoard);
// console.log(moves);
renderBoard(parseBoard);
// const playBoard = new Board();

// playGame(moves, playBoard);

  
  