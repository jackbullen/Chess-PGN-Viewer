# Chess-PGN-Viewer
A Chess PGN Viewer built with JavaScript, HTML, and CSS. The Chess PGN Viewer implements a class for the Board and each of the Pieces. These classes are used to parse the PGN and render updates on the board in board.js file.

*Promoting pawn moves, en passant and the backwards move control button have not yet been implemented.*
*Todo: Modify the move logic so getValidMoves() is check to determine the moving piece, for every move. Error showcased in this line 1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 1/2-1/2*

## Sample PGN: 

<p> 1. e4 d6 2. d4 Nf6 3. f3 { B00 Lion Defense: Lion's Jaw } g6 4. c4 Bg7 5. Bd3 O-O 6. Ne2 c5 7. d5 Nbd7 8. a3 Rb8 9. b4 b5 10. bxc5 Nxc5 11. Ra2 bxc4 12. Bxc4 Rxb1 13. h4 Qa5+ 14. Kf2 h5 15. Nf4 Bh6 16. Qc2 Rxc1 17. Qxc1 Ba6 18. Bxa6 Qxa6 19. g3 Bxf4 20. Qg1 Be5 21. g4 Bd4+ { White resigns. } 0-1 </p>

## Usage:

If one of the autocompleted PGNs does not play out until the end of the notation, simply add 1-0 (or any other result) to the end of the Load PGN input field.

## Features:
 Description | Status | To-do
 --- | --- | --- |
 Chess board, moves, and controls view | 0.5 | Highlight current move. Backward move control not implemented. 
 PGN reading | 0.5 | Some errors with ambiguous piece moves. Not handling promotion of pieces or en passant.
 Responsive to screensize | 0 | For small screen sizes the board currently goes out of view and the grey appview backdrop does not rescale to fit the board.
 Click-to-move | 0 | 
 PGN writing | 0 | 

## Picture:
<img width="1032" alt="screenshot" src="https://user-images.githubusercontent.com/37254717/209571443-9f8e8e3a-76b1-4a2f-a585-25ac7e9892ae.png">

Data from
https://github.com/lichess-org/chess-openings

Code assistance from
https://openai.com/
