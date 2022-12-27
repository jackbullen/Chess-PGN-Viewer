import { Board } from './chess-engine/Board.js';
import { Pawn } from './chess-engine/pieces/Pawn.js';
  

const chessBoardDiv = document.getElementById('board');
const chessBoard = [];

const applyMoves = (board, submovesList, movesList) => {
    
    console.log(submovesList[0], submovesList[1]);
    // White castles
    if (submovesList[0][3] == "King and Rook") {
        let king = board.whitePieces[3];
        // Short
        if (submovesList[0][2] == "O-O"){
            let rook = board.whitePieces[0];
            board.castle(king, rook, true);
        }
        // Long
        else {
            let rook = board.whitePieces[7];
            board.castle(king, rook, false);
        }
    }
    // Non-castle white move
    else {
        const pieceIndex = getSrcPieceIndex(board, submovesList[0][0], submovesList[0][1], submovesList[0][3], true); 
        let pieceW = board.whitePieces[pieceIndex];
        let srcSqrW = pieceW.position;
        if (submovesList[0][2][1] == "x") {
            board.board[submovesList[0][0]][submovesList[0][1]].captured = true;
        }
        board.move(srcSqrW, submovesList[0].slice(0,2), pieceW);
        submovesList[0].push(pieceIndex);
    }

    // Black castles
    if (submovesList[1][3] == "King and Rook") {
        let king = board.blackPieces[3];
        // Short
        
        if (submovesList[1][2] == "O-O"){
            let rook = board.blackPieces[0];
            board.castle(king, rook, true);
        }
        // Long
        else {
            let rook = board.blackPieces[7];
            board.castle(king, rook, false);
        }
    }
    // Non-castle black move
    else {
        const pieceIndex = getSrcPieceIndex(board, submovesList[1][0], submovesList[1][1], submovesList[1][3], false); 
        let pieceB = board.blackPieces[pieceIndex];
        let srcSqrB = pieceB.position;
        if (submovesList[1][2][1] == "x") {
            board.board[submovesList[1][0]][submovesList[1][1]].captured = true;
        }
        board.move(srcSqrB, submovesList[1].slice(0,2), pieceB);
        submovesList[1].push(pieceIndex);
    }
    movesList.push([submovesList[0],submovesList[1]]);
    submovesList.length=0;
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
            pieceImg.src = `./images/${board.board[i][j].name}.png`;
        }
        const sqrLoc = document.createElement('p');
        const txt = document.createTextNode(`${i} ${j}`);
        sqrLoc.appendChild(txt);
        // Append the img element to the square
        piece.appendChild(pieceImg);
        square.appendChild(piece);
        // square.appendChild(sqrLoc);
        row.appendChild(square);
        chessBoard.push(square);
      }
      chessBoardDiv.appendChild(row);
      
    }
    // const space = document.createElement('p')
    // const boardtxt = document.createTextNode(`${board.movenum}`);
    // space.appendChild(boardtxt);
    // chessBoardDiv.appendChild(space);
  };
  

  const updateBoard = (board) => {
    // Get all of the square elements on the board
    const squareElements = document.querySelectorAll('.square');

    // Loop through the rows of the board
    for (let row = 0; row <= 7; row++) {
      // Loop through the cells in the row
      for (let col = 0; col <= 7; col++) {
        // Get the corresponding square element
        const squareElement = squareElements[row * 8 + col];
  
        // Get the piece element within the square
        const pieceElement = squareElement.querySelector('.piece');
  
        // Get the img element within the piece element
        const pieceImg = pieceElement.querySelector('img');

        // Set the src attribute of the piece element's img element
        if (board.board[row][col]=="e"){
        
          pieceImg.src = `./images/e.png`;
        }
        else {
          pieceImg.src = `./images/${board.board[row][col].name}.png`;
        }
      }
    }
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
    // console.log(moves);
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

             // Handle PGN comments (e.g. "{Scandinavian Defense}")
             if (move == "}") {
                comment = false;
                continue;
            }
            if (move == "{" || comment == true) {
                comment = true;
                continue;
            }

        // Handle moves with a result,
        // (e.g. "1-0", "0-1", "1/2-1/2", "1.", "2.")
        if (move == "1-0" || move == "0-1" || move == "1/2-1/2") {
            applyMoves(board,submovesList,movesList);
            movesList.push(submovesList);
            // movesList.push(move);
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
        if (move.includes('.')) {

            applyMoves(board,submovesList,movesList);
            // renderBoard(board);
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
            peace = "King and Rook";
            dest_row = 0;
            dest_col = 0;
        }
        // Long castle
        if (move == "O-O-O") {
            peace = "King and Rook";
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

        // Ambiguous piece move
        if ((move[0] == "N" || move[0] == "R" || move[0] == "B") && (move.length==4) && move[1]!="x") {
            if (move[0] == "N") {
                peace = "Knight_"+move[1];
            }
            if (move[0] == "R") {
                peace = "Rook_"+move[1];
            }
            if (move[0] == "B") {
                peace = "Bishop_"+move[1];
            }
            dest_row = parseInt(move.substring(2)[1])-1;
            dest_col = 8-(move.substring(2).charCodeAt(0) - 96);

        }

        // Ambiguous piece capture 
        if ((move[0] == "N" || move[0] == "R" || move[0] == "B") && (move.length==5)) {
            console.log("Need to handle AMBIGUOUS PIECE CAPTURE!!")
            dest_row = parseInt(move.substring(2)[1])-1;
            dest_col = 8-(move.substring(2).charCodeAt(0) - 96);
            console.log("destrow:",dest_row,"dest_col:",dest_col);
        }

        // Promotions
        if (move.includes('=')) {
            dest_row = parseInt(move[1])-1;
            dest_col = 8-(move.charCodeAt(0) - 96);
        }
        
        submovesList.push([dest_row,dest_col,move+check,peace]);
        turn = !turn;

    }
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
    if (piece == "Knight") {
        let lKMoves = board.whitePieces[1].getValidMoves(board);
        let rKMoves = board.whitePieces[6].getValidMoves(board);
        if (!turn) {
            lKMoves = board.blackPieces[1].getValidMoves(board);
            rKMoves = board.blackPieces[6].getValidMoves(board);
        }
        if (lKMoves.some(el => arrayEquals(el, [dest_row,dest_col])) && board.whitePieces[1].captured == false) {
            return 1;
        }
        else {
            return 6;
        }
    }
    // Rook move
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

    // Ambiguous Knight move
    if (piece.slice(0,-1) == "Knight_"){        
        let k1 = board.whitePieces[1];
        let k2 = board.whitePieces[6]; 

        if (!turn) {
            let k1 = board.blackPieces[1];
            let k2 = board.blackPieces[6]; 
        }
        if (k1.position[1] == 8-(piece.charCodeAt(piece.length-1)-96)) {
            return 1;
        }
        else {
            return 6;
        }
         
    } 
    // Ambiguous Bishop move
    if (piece.slice(0,-1) == "Bishop_") {
        let k1 = board.whitePieces[2];
        let k2 = board.whitePieces[5]; 

        if (!turn) {
            k1 = board.blackPieces[2];
            k2 = board.blackPieces[5]; 
        }
        if (k1.position[1] == 8-(piece.charCodeAt(piece.length-1)-96)) {
            return 2;
        }
        else {
            return 5;
        }
    }  
    // Ambiguous Rook move
    if (piece.slice(0,-1) == "Rook_") {
        let k1 = board.whitePieces[0];
        let k2 = board.whitePieces[7]; 

        if (!turn) {
            k1 = board.blackPieces[0];
            k2 = board.blackPieces[7]; 
        }
        if (k1.position[1] == 8-(piece.charCodeAt(piece.length-1)-96)) {
            return 0;
        }
        else {
            return 7;
        }
    }
                                                              
  }
  
  let currentMove = 0;

  const playGame = (game, board, moves) => {
    // Render the initial board
    // renderBoard(board);

    // Get the forward arrow button
    const forwardButton = document.querySelector('#forward-button');

    // Add an event listener to the button that plays the next move
    forwardButton.addEventListener('click', () => {
      // Check if there are more moves to play
      if (currentMove < moves.length) {
        console.log(game[currentMove]);
        if (moves[currentMove] == "1-0" || moves[currentMove] == "0-1" || moves[currentMove] == "1/2-1/2" ){
            // showendBoard(board);
            console.log("end of game");
            return;
        }
        // Update the board with the next move
        // console.log(currentMove,moves[currentMove]);
        board.forwardMove(moves[currentMove]);
        
        // Update the board display with the updated board
        updateBoard(board);
        
        // Increment the current move counter
        currentMove++;
      }
    });
  
    // Get the backward arrow button
    const backwardButton = document.querySelector('#backward-button');
  
    // Add an event listener to the button that plays the previous move
    backwardButton.addEventListener('click', () => {
      // Check if there are more moves to play in reverse
      if (currentMove > 0) {
        // Decrement the current move counter
        currentMove--;
        // Update the board with the previous move
        board.update(moves[currentMove][0], moves[currentMove][1], true);
        // Update the board display with the updated board
        updateBoard(board);
      }
    });
  };
  
let gameBoard = new Board();
renderBoard(gameBoard);

let pgn = ""
let moves = [];
const pgnInput = document.getElementById('pgn-input');
const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', () => {
    currentMove = 0;
    gameBoard = new Board();
    updateBoard(gameBoard);
    pgn = pgnInput.value;
    const parseBoard = new Board();
  // Use pgn to update the chess game
    moves = parsePGN(pgn, parseBoard).flat();
    console.log(moves);
//   playGame(pgn, gameBoard, moves.flat());

});
    // Get the forward arrow button
    const forwardButton = document.querySelector('#forward-button');
    // Add an event listener to the button that plays the next move
    forwardButton.addEventListener('click', () => {
        // Check if there are more moves to play
        if (currentMove < moves.length) {
          console.log(moves[currentMove]);
          if (moves[currentMove] == "1-0" || moves[currentMove] == "0-1" || moves[currentMove] == "1/2-1/2" ){
              // showendBoard(board);
              console.log("end of game");
              return;
          }
          // Update the board with the next move
          gameBoard.forwardMove(moves[currentMove]);
          
          // Update the board display with the updated board
          updateBoard(gameBoard);
          
          // Increment the current move counter
          currentMove++;
        }
      });
    
      // Get the backward arrow button
      const backwardButton = document.querySelector('#backward-button');
    
      // Add an event listener to the button that plays the previous move
      backwardButton.addEventListener('click', () => {
        // Check if there are more moves to play in reverse
        if (currentMove > 0) {
          // Decrement the current move counter
          currentMove--;
          // Update the board with the previous move
          gameBoard.update(moves[currentMove][0], moves[currentMove][1], true);
          // Update the board display with the updated board
          updateBoard(gameBoard);
        }
      });



// Initialize the moves array using a parsing board and parsePGN().
// const parseBoard = new Board();
// const pgn = '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bf5 { B01 Scandinavian Defense: Classical Variation } 6. Bc4 e6 7. O-O c6 8. Re1 Nbd7 9. d5 cxd5 10. Nxd5 Nxd5 11. Bxd5 Rd8 12. Bg5 Nf6 13. Qe2 Rxd5 14. c4 Rd7 15. Qe5 Qxe5 16. Rxe5 Bd6 17. Re2 Ne4 18. Be3 O-O 19. Rc1 Bc5 20. Bxc5 Nxc5 21. Ne5 Rd4 22. b3 Rfd8 23. f3 Nd3 24. Nxd3 Bxd3 25. Rd2 b5 26. c5 Kf8 27. Kf2 Ke7 28. Ke3 e5 29. Rcd1 Bf5 30. Rxd4 exd4+ 31. Rxd4 Rxd4 32. Kxd4 Kd7 33. b4 Kc6 34. g4 Be6 35. h3 Bxa2 36. f4 Bb1 37. f5 Bc2 38. h4 Bb3 39. g5 f6 40. g6 hxg6 41. fxg6 Bd5 42. Ke3 a5 43. bxa5 Kxc5 44. h5 b4 45. h6 gxh6 46. a6 b3 47. a7 Kb4 48. g7 b2 49. a8=Q Bxa8 50. g8=Q Kc3 51. Qc8+ Kb3 { Black wins on time. } 0-1';
// Parse the PGN string and get the array of moves
// const moves = parsePGN(pgn, parseBoard);



// playGame(pgn, gameBoard, moves.flat());

  
