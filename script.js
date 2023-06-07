/** Connect Four */
// Declare constant variables for the width and height of the game board
const WIDTH = 7; // The number of columns in the game board
const HEIGHT = 6; // The number of rows in the game board


let currPlayer = 1; // Declare a variable to track the current player (1 or 2)
let board = []; // Declare an empty array to represent the game board


function makeBoard() { // Function to create the game board
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));  // Create an empty row for each height
    }
}

function makeHtmlBoard() { // Function to create the HTML representation of the game board
    const board = document.getElementById('board');  // Get the game board element from the DOM
    const top = document.createElement('tr'); // Create the top row for column selection
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClick); // Add a click event listener to the top row

    for (let x = 0; x < WIDTH; x++) { // Create the cells for the top row (column selection)
        const headCell = document.createElement('td');
        headCell.setAttribute('id', x);
        top.append(headCell);
    }

    board.append(top); // Append the top row to the game board element

    for (let y = 0; y < HEIGHT; y++) { // Create the remaining rows and cells of the game board
        const row = document.createElement('tr');

        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
        }

        board.append(row);
    }
}

function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
    alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) { // Function to handle the click event on the top row (column selection)
    const x = +evt.target.id; // Get the selected column from the clicked cell's ID
    const y = findSpotForCol(x);

    if (y === null) {
        return;
    }

    board[y][x] = currPlayer;
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
    }

    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}
/* Restart Button */
document.querySelector('#restart-btn').addEventListener('click', function () {
    window.location.reload();
    return false;
});
/* End Restart Button */
//
class Player {
    constructor(color) {
        this.color = color;
    }
}

// Evewnt listeners for starting the game with player colors
document.getElementById('start-game').addEventListener('click', () => {
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    new Game(p1, p2);
});

// Call the necessary functions to initialize the game board
makeBoard();
makeHtmlBoard();
