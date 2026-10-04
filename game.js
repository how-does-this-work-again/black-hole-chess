// initial board state
// capitalized is white, lowercase is black
// 'r': rook, 'n': knight, 'b': bishop, 'q': queen, 'k': king, 'p': pawn, '': empty
const boardState = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['',  '',  '',  '',  '',  '',  '',  ''],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

let selectedSquare = null; // Stores row/col of selected piece, e.g. { row: 6, col: 4 }

const boardElement = document.getElementById('board');

// 2. Render the board DOM elements
function drawBoard() {
  boardElement.innerHTML = ''; // Clear previous board

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

// 3. Handle click events (select piece vs. move piece)
function onSquareClick(event) {
  const row = parseInt(event.currentTarget.dataset.row);
  const col = parseInt(event.currentTarget.dataset.col);
  const pieceClicked = boardState[row][col];

  if (selectedSquare === null) {
    // FIRST CLICK: Select a piece
    if (pieceClicked !== '') {
      selectedSquare = { row, col };
      drawBoard();
    }
  } else {
    // SECOND CLICK: Move the selected piece to the new target square
    const fromRow = selectedSquare.row;
    const fromCol = selectedSquare.col;

    // Update 2D array state
    boardState[row][col] = boardState[fromRow][fromCol];
    boardState[fromRow][fromCol] = '';

    // Reset selection and re-render
    selectedSquare = null;
    drawBoard();
  }
}

// Initial draw
drawBoard();