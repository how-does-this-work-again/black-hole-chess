// TODO: make sure the board is flippable so that the players' pieces are at the bottom
// probably a variable saying which side the player is on, and flipping the board w that
// legal move function will need to be updated, its hard coded based on whether piece is black or white
// OR we render the board as upside down on white player's screen only

// initial board state
// implement customizable board later?
const boardState = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

let selectedSquare = null; // stores row/col of selected piece, ex. { row: 6, col: 4 }
let isWhiteTurn = true;

const boardElement = document.getElementById('board');

// render board elements
function drawBoard() {
  boardElement.innerHTML = ''; // clear previous board

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      
      // Determine square color (alternating)
      const isLight = (row + col) % 2 === 0;
      square.className = `square ${isLight ? 'light' : 'dark'}`;

      // Attach coordinates to the element for click handlers
      square.dataset.row = row;
      square.dataset.col = col;

      // Add piece text if present
      square.textContent = boardState[row][col];

      // Highlight selected square
      if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
        square.classList.add('selected');
      }

      // Handle clicks
      square.addEventListener('click', onSquareClick);

      boardElement.appendChild(square);
    }
  }
}

// handle click events (select piece vs. move piece)
function onSquareClick(event) {
  const row = parseInt(event.currentTarget.dataset.row);
  const col = parseInt(event.currentTarget.dataset.col);
  const pieceClicked = boardState[row][col];

  if (selectedSquare === null) {
    // click 1: select a piece
    if (pieceClicked !== '') {
      selectedSquare = { row, col };
      drawBoard(); // to render border
    }
  } else {
    // click 2: move the selected piece to the new target square
    const fromRow = selectedSquare.row;
    const fromCol = selectedSquare.col;

    // update board state
    boardState[row][col] = boardState[fromRow][fromCol];
    boardState[fromRow][fromCol] = '';

    // reset selection and re-render
    selectedSquare = null;
    drawBoard();
  }
}

// get piece color - returns true if piece is white, false if black, null if empty square
function isWhite(piece) {
    if (piece === ' ') {
        return null;
    } else if (piece === '♜' || piece === '♞' || piece === '♝'
            || piece === '♛' || piece === '♚' || piece === '♟') {
        return true;
    } else {
        return false;
    }
}

// generates legal moves, returns an array of valid target coordinates [{ row: row, col: col }, ...]
// for the piece at (startRow, startCol)
function legalMoves(startRow, startCol) {
    let piece = board[startRow][startCol];
    let legal = [];
    if (piece === '♜') { // white rook
        
    } else if (piece === '♞') { // white knight
        // check every possible legal move
        if (isWhite(board[startRow + 1][startCol + 2]) != true) { 
            legal.push({row: startRow + 1, col: startCol + 2})
        }
        if (isWhite(board[startRow - 1][startCol + 2]) != true) { 
            legal.push({row: startRow - 1, col: startCol + 2})
        }
        if (isWhite(board[startRow + 1][startCol - 2]) != true) { 
            legal.push({row: startRow + 1, col: startCol - 2})
        }
        if (isWhite(board[startRow - 1][startCol - 2]) != true) { 
            legal.push({row: startRow - 1, col: startCol - 2})
        }
        if (isWhite(board[startRow + 2][startCol + 1]) != true) { 
            legal.push({row: startRow + 2, col: startCol + 1})
        }
        if (isWhite(board[startRow + 2][startCol - 1]) != true) { 
            legal.push({row: startRow + 2, col: startCol - 1})
        }
        if (isWhite(board[startRow - 2][startCol + 1]) != true) { 
            legal.push({row: startRow - 2, col: startCol + 1})
        }
        if (isWhite(board[startRow - 2][startCol - 1]) != true) { 
            legal.push({row: startRow - 2, col: startCol - 1})
        }
    } else if (piece === '♝') { // white bishop

    } else if (piece === '♛') { // white queen
        
    } else if (piece === '♚') { // white king
        // just check one square in each direction
        if (isWhite(board[startRow + 1][startCol]) != true) { 
            legal.push({row: startRow + 1, col: startCol})
        }
        if (isWhite(board[startRow + 1][startCol + 1]) != true) { 
            legal.push({row: startRow + 1, col: startCol + 1})
        }
        if (isWhite(board[startRow + 1][startCol - 1]) != true) { 
            legal.push({row: startRow + 1, col: startCol - 1})
        }
        if (isWhite(board[startRow][startCol + 1]) != true) { 
            legal.push({row: startRow, col: startCol + 1})
        }
        if (isWhite(board[startRow][startCol - 1]) != true) { 
            legal.push({row: startRow, col: startCol - 1})
        }
        if (isWhite(board[startRow - 1][startCol + 1]) != true) { 
            legal.push({row: startRow - 1, col: startCol + 1})
        }
        if (isWhite(board[startRow - 1][startCol]) != true) { 
            legal.push({row: startRow - 1, col: startCol})
        }
        if (isWhite(board[startRow - 1][startCol - 1]) != true) { 
            legal.push({row: startRow - 1, col: startCol - 1})
        }
    } else if (piece === '♟') { // white pawn
        // checks if pawn can move straight ahead
        if (isWhite(board[startRow + 1][startCol]) === null) { 
            legal.push({row: startRow + 1, col: startCol})
        }
        // checks if pawn can move 2 squares ahead
        if (startRow === 1 && isWhite(board[startRow + 2][startCol]) === null) {
            legal.push({row: startRow + 2, col: startCol})
        }
        // checks if pawn can capture diagonally to whites left
        if (isWhite(board[startRow + 1][startCol + 1]) === false) { 
            legal.push({row: startRow + 1, col: startCol + 1})
        }
        // checks if pawn can capture diagonally to whites right
        if (isWhite(board[startRow + 1][startCol - 1]) === false) { 
            legal.push({row: startRow + 1, col: startCol - 1})
        }
    } else if (piece === '♖') { // black rook
         
    } else if (piece === '♘') { // black knight
        // check every possible legal move
        if (isWhite(board[startRow + 1][startCol + 2]) != false) { 
            legal.push({row: startRow + 1, col: startCol + 2})
        }
        if (isWhite(board[startRow - 1][startCol + 2]) != false) { 
            legal.push({row: startRow - 1, col: startCol + 2})
        }
        if (isWhite(board[startRow + 1][startCol - 2]) != false) { 
            legal.push({row: startRow + 1, col: startCol - 2})
        }
        if (isWhite(board[startRow - 1][startCol - 2]) != false) { 
            legal.push({row: startRow - 1, col: startCol - 2})
        }
        if (isWhite(board[startRow + 2][startCol + 1]) != false) { 
            legal.push({row: startRow + 2, col: startCol + 1})
        }
        if (isWhite(board[startRow + 2][startCol - 1]) != false) { 
            legal.push({row: startRow + 2, col: startCol - 1})
        }
        if (isWhite(board[startRow - 2][startCol + 1]) != false) { 
            legal.push({row: startRow - 2, col: startCol + 1})
        }
        if (isWhite(board[startRow - 2][startCol - 1]) != false) { 
            legal.push({row: startRow - 2, col: startCol - 1})
        }
    } else if (piece === '♗') { // black bishop
        
    } else if (piece === '♕') { // black queen
        
    } else if (piece === '♔') { // black king
        // just check one square in each direction
        if (isWhite(board[startRow + 1][startCol]) != false) { 
            legal.push({row: startRow + 1, col: startCol})
        }
        if (isWhite(board[startRow + 1][startCol + 1]) != false) { 
            legal.push({row: startRow + 1, col: startCol + 1})
        }
        if (isWhite(board[startRow + 1][startCol - 1]) != false) { 
            legal.push({row: startRow + 1, col: startCol - 1})
        }
        if (isWhite(board[startRow][startCol + 1]) != false) { 
            legal.push({row: startRow, col: startCol + 1})
        }
        if (isWhite(board[startRow][startCol - 1]) != false) { 
            legal.push({row: startRow, col: startCol - 1})
        }
        if (isWhite(board[startRow - 1][startCol + 1]) != false) { 
            legal.push({row: startRow - 1, col: startCol + 1})
        }
        if (isWhite(board[startRow - 1][startCol]) != false) { 
            legal.push({row: startRow - 1, col: startCol})
        }
        if (isWhite(board[startRow - 1][startCol - 1]) != false) { 
            legal.push({row: startRow - 1, col: startCol - 1})
        }
    } else if (piece === '♙') { // black pawn
        // checks if pawn can move straight ahead
        if (isWhite(board[startRow - 1][startCol]) === null) { 
            legal.push({row: startRow - 1, col: startCol})
        }
        // checks if pawn can move 2 squares ahead
        if (startRow === 1 && isWhite(board[startRow - 2][startCol]) === null) {
            legal.push({row: startRow - 2, col: startCol})
        }
        // checks if pawn can capture diagonally to blacks left
        if (isWhite(board[startRow - 1][startCol - 1]) === true) { 
            legal.push({row: startRow - 1, col: startCol - 1})
        }
        // checks if pawn can capture diagonally to blacks right
        if (isWhite(board[startRow - 1][startCol + 1]) === true) { 
            legal.push({row: startRow - 1, col: startCol + 1})
        }
    }
    return legal;
}

// initial draw
drawBoard();