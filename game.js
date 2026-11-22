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
  let legalmoves = []

  if (selectedSquare === null) {
    // click 1: select a piece
    if (pieceClicked !== '') {
      selectedSquare = {row, col};
      drawBoard(); // to render border
    }
  } else {
    // click 2: move the selected piece to the new target square
    const fromRow = selectedSquare.row;
    const fromCol = selectedSquare.col;

    legalmoves = legalMoves(fromRow, fromCol)
    if (legalmoves.includes({row, col})) {
        // update board state
        boardState[row][col] = boardState[fromRow][fromCol];
        boardState[fromRow][fromCol] = '';
    }

    // reset selection and re-render
    selectedSquare = null;
    drawBoard();
  }
}

// get piece color - returns true if piece is white, false if black, null if empty square
// null is neither false nor true (in comparisons, null == false and null == true both return false), so this is the best method for comparisons
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
        legal = rookLegal(true)
    } else if (piece === '♞') { // white knight
        legal = knightLegal(true)
    } else if (piece === '♝') { // white bishop
        legal = bishopLegal(true)
    } else if (piece === '♛') { // white queen
        legal = rookLegal(true).concat(bishopLegal(true))
    } else if (piece === '♚') { // white king
        legal = kingLegal(true)
    } else if (piece === '♟') { // white pawn
        legal = pawnLegal(true)
    } else if (piece === '♖') { // black rook
        legal = rookLegal(false)
    } else if (piece === '♘') { // black knight
        legal = knightLegal(false)
    } else if (piece === '♗') { // black bishop
        legal = bishopLegal(false)
    } else if (piece === '♕') { // black queen
        legal = rookLegal(false).concat(bishopLegal(false))
    } else if (piece === '♔') { // black king
        legal = kingLegal(false)
    } else if (piece === '♙') { // black pawn
        legal = pawnLegal(false)
    }
    return legal;
}

// initial draw
drawBoard();



// helper funcs for generating legal moves

// pawn
// color: whether the pawn is white (true if white, false if black)
function pawnLegal(color) {
    let legalPawn = [];
    // checks if pawn can move straight ahead
    if (isWhite(board[startRow - 1][startCol]) == null) { 
        legalPawn.push({row: startRow - 1, col: startCol})
    }
    // checks if pawn can move 2 squares ahead
    if (startRow == 1 && isWhite(board[startRow - 2][startCol]) == null) {
        legalPawn.push({row: startRow - 2, col: startCol})
    }
    // checks if pawn can capture diagonally to left
    if (isWhite(board[startRow - 1][startCol - 1]) == (!color)) { 
        legalPawn.push({row: startRow - 1, col: startCol - 1})
    }
    // checks if pawn can capture diagonally to right
    if (isWhite(board[startRow - 1][startCol + 1]) == (!color)) { 
        legalPawn.push({row: startRow - 1, col: startCol + 1})
    }
    return legalPawn;
}

// knight
// color: whether the knight is white (true if white, false if black)
function knightLegal(color) {
    let legalKnight = [];
    // check every possible legal move
    if (isWhite(board[startRow + 1][startCol + 2]) != color) { 
        legalKnight.push({row: startRow + 1, col: startCol + 2})
    }
    if (isWhite(board[startRow - 1][startCol + 2]) != color) { 
        legalKnight.push({row: startRow - 1, col: startCol + 2})
    }
    if (isWhite(board[startRow + 1][startCol - 2]) != color) { 
        legalKnight.push({row: startRow + 1, col: startCol - 2})
    }
    if (isWhite(board[startRow - 1][startCol - 2]) != color) { 
        legalKnight.push({row: startRow - 1, col: startCol - 2})
    }
    if (isWhite(board[startRow + 2][startCol + 1]) != color) { 
        legalKnight.push({row: startRow + 2, col: startCol + 1})
    }
    if (isWhite(board[startRow + 2][startCol - 1]) != color) { 
        legalKnight.push({row: startRow + 2, col: startCol - 1})
    }
    if (isWhite(board[startRow - 2][startCol + 1]) != color) { 
        legalKnight.push({row: startRow - 2, col: startCol + 1})
    }
    if (isWhite(board[startRow - 2][startCol - 1]) != color) { 
        legalKnight.push({row: startRow - 2, col: startCol - 1})
    }
    return legalKnight;
}

// king
// color: whether the king is white (true if white, false if black)
function kingLegal(color) {
    let legalKing = [];
    // just check one square in each direction
    if (isWhite(board[startRow + 1][startCol]) != color) { 
        legalKing.push({row: startRow + 1, col: startCol})
    }
    if (isWhite(board[startRow + 1][startCol + 1]) != color) { 
        legalKing.push({row: startRow + 1, col: startCol + 1})
    }
    if (isWhite(board[startRow + 1][startCol - 1]) != color) { 
        legalKing.push({row: startRow + 1, col: startCol - 1})
    }
    if (isWhite(board[startRow][startCol + 1]) != color) { 
        legalKing.push({row: startRow, col: startCol + 1})
    }
    if (isWhite(board[startRow][startCol - 1]) != color) { 
        legalKing.push({row: startRow, col: startCol - 1})
    }
    if (isWhite(board[startRow - 1][startCol + 1]) != color) { 
        legalKing.push({row: startRow - 1, col: startCol + 1})
    }
    if (isWhite(board[startRow - 1][startCol]) != color) { 
        legalKing.push({row: startRow - 1, col: startCol})
    }
    if (isWhite(board[startRow - 1][startCol - 1]) != color) { 
        legalKing.push({row: startRow - 1, col: startCol - 1})
    }
    return legalKing;
}

// rook
// color: whether the rook is white (true if white, false if black)
function rookLegal(color) {
    let legalRook = [];
    // so i could maybe make helper funcs for these but honestly that might take more code than repeating it
    for (let currentRow = startRow + 1; currentRow < 8; currentRow++) { // down the cols
        square = board[currentRow][startCol];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalRook.push({row: currentRow, col: startCol});
            break;
        } else { // no piece on square: legal
            legalRook.push({row: currentRow, col: startCol});
        }
    }
    for (let currentRow = startRow - 1; currentRow >= 0; currentRow--) { // up the cols
        square = board[currentRow][startCol];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalRook.push({row: currentRow, col: startCol});
            break;
        } else { // no piece on square: legal
            legalRook.push({row: currentRow, col: startCol});
        }
    }
    for (let currentCol = startCol + 1; currentCol < 8; currentCol++) { // right across rows
        square = board[startRow][currentCol];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalRook.push({row: startRow, col: currentCol});
            break;
        } else { // no piece on square: legal
            legalRook.push({row: startRow, col: currentCol});
        }
    }
    for (let currentCol = startCol - 1; currentCol >=0; currentCol--) { // left across rows
        square = board[startRow][currentCol];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalRook.push({row: startRow, col: currentCol});
            break;
        } else { // no piece on square: legal
            legalRook.push({row: startRow, col: currentCol});
        }
    }
    return legalRook;
}

// bishop
// color: whether the bishop is white (true if white, false if black)
function bishopLegal(color) {
    let legalBishop = [];
    // like the rook, i could maybe make helper funcs for these but honestly that might take more code than repeating it
    for (let i = 0; i < 8; i++) { // down the cols
        // within range check
        if (startRow + i >= 8 || startCol + i >= 8) {
            break;
        }
        square = board[startRow + i][startCol + i];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalBishop.push({row: startRow + i, col: startCol + i});
            break;
        } else { // no piece on square: legal
            legalBishop.push({row: startRow + i, col: startCol + i});
        }
    }
    for (let i = 0; i < 8; i++) { // up the cols
        // within range check
        if (startRow + i >= 8 || startCol - i < 0) {
            break;
        }
        square = board[startRow + i][startCol - i];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalBishop.push({row: startRow + i, col: startCol - i});
            break;
        } else { // no piece on square: legal
            legalBishop.push({row: startRow + i, col: startCol - i});
        }
    }
    for (let i = 0; i < 8; i++) { // right across rows
        // within range check
        if (startRow - i < 0 || startCol + i >= 8) {
            break;
        }
        square = board[startRow - i][startCol + i];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalBishop.push({row: startRow - i, col: startCol + i});
            break;
        } else { // no piece on square: legal
            legalBishop.push({row: startRow - i, col: startCol + i});
        }
    }
    for (let i = 0; i < 8; i--) { // left across rows
        // within range check
        if (startRow - i < 0 || startCol - i < 0) {
            break;
        }
        square = board[startRow - i][startCol - i];
        if (isWhite(square) == color) { // piece on square is same color: not legal
            break;
        } else if (isWhite(square) == !color) { // piece on square is opp color: legal (cant move further)
            legalBishop.push({row: startRow - i, col: startCol - i});
            break;
        } else { // no piece on square: legal
            legalBishop.push({row: startRow - i, col: startCol - i});
        }
    }
    return legalBishop;
}