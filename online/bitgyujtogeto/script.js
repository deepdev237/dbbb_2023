// Define the number of rows and columns in the board
const ROWS = 8;
const COLS = 8;

// Define the initial pieces on the board
const PIECES = ['V', 'B', 'B', 'B'];

// Create an empty board array
const board = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ''));

// Initialize the game by creating the table and adding click event listeners
function init() {
    const table = document.querySelector('#board');
    table.innerHTML = board.map(row => `<tr>${row.map(() => '<td></td>').join('')}</tr>`).join('');
    table.addEventListener('click', setPiece);
}

// Set a piece on the board when a cell is clicked
function setPiece(event) {
    const { target } = event;

    if (target.tagName === 'TD') {
        const row = target.parentNode.rowIndex;
        const col = target.cellIndex;
        const piece = PIECES.shift();

        if (piece) {
            board[row][col] = piece;
            target.textContent = piece;
        }
    }
}

// Collect the bits by moving the hunter and removing the bits from the board
async function collectBits() {
    let row = 0;
    let col = 0;
    let bitCount = 0;

    while (row < ROWS && col < COLS) {
        const piece = board[row][col];
        if (piece === 'V') {
            col++;
        } else if (piece === 'B') {
            bitCount++;
            board[row][col] = '';
            const cell = document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
            cell.textContent = '';
            col++;

            if (bitCount === 3) {
                bitCount = 0;
                row++;
                col = 0;
            }
        } else {
            col++;
        }
    }
    alert('Bitek összegyűjtve!');
}

// Start the game by initializing the board
init();