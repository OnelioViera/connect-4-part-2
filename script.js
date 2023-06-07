/** Connect Four */
// Declare constant variables for the width and height of the game board
const WIDTH = 7; // The number of columns in the game board
const HEIGHT = 6; // The number of rows in the game board


let currPlayer = 1; // Declare a variable to track the current player (1 or 2)
let board = []; // Declare an empty array to represent the game board

// Function to create the game board
function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
        board.push(Array.from({ length: WIDTH }));  // Create an empty row for each height
    }
}

// Function to create the HTML representation of the game board
function makeHtmlBoard() {
    const board = document.getElementById('board');  // Get the game board element from the DOM using the "board" ID
    const top = document.createElement('tr'); // Create a new table row element for the top row
    top.setAttribute('id', 'column-top'); // Set the 'id' attribute of the top row to 'column-top'
    top.addEventListener('click', handleClick); // Add a click event listener to the top row, which will call the handleClick function

    for (let x = 0; x < WIDTH; x++) { // Iterate over the columns of the top row
        const headCell = document.createElement('td'); // Create a new table cell element for each column
        headCell.setAttribute('id', x); //set the 'id' attribute of the cell to the column index
        top.append(headCell); // Apend the table cell to the top row
    }

    board.append(top); // Append the top row to the game board element

    for (let y = 0; y < HEIGHT; y++) { // Iterate over the rows of the game board
        const row = document.createElement('tr'); // Create a new table row element for each row

        for (let x = 0; x < WIDTH; x++) { //Iterate over the columns of each row
            const cell = document.createElement('td'); // Create a new talble cell element for each column
            cell.setAttribute('id', `${y}-${x}`); // Set the ID attribute of the table cell to a unique identifier based on the row and column indices
            row.append(cell); //Append the table cell to the current row
        }

        board.append(row); //Append the row to the game board element
    }
}

// Function to find the empty spot for a column
function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) { // Iterate through each row from bottom to top
        if (!board[y][x]) { // If the spot is empty
            return y; // Return the row index
        }
    }
    return null; // Return null if the column is full
}

//Function to place piece into HTML table of board
function placeInTable(y, x) {
    const piece = document.createElement('div'); // Create a new <div> element for the game piece
    piece.classList.add('piece'); // Add the 'piece' class to the element
    piece.classList.add(`p${currPlayer}`); // Add the class corresponding to the current player to the element

    const spot = document.getElementById(`${y}-${x}`); // Get the element representing the specific spot on the game board
    spot.append(piece); // Append the game piece to the spot element
}

// Function to end the game and display a message
function endGame(msg) {
    alert(msg);
}

// Function to handle the click event on the top row (column selection)
function handleClick(evt) {
    const x = +evt.target.id; // Get the selected column from the clicked cell's ID
    const y = findSpotForCol(x); // Show an alert with the provided message

    if (y === null) { // If the column is full
        return; // Stop further execution
    }

    board[y][x] = currPlayer; // Place the game piece on the HTML game board
    placeInTable(y, x); // Place the game piece on the HTML game board

    // check for win
    if (checkForWin()) { // If there is a win
        return endGame(`Player ${currPlayer} won!`); // End the game and display the winning message
    }

    // check for tie
    if (board.every(row => row.every(cell => cell))) { // If the game board is completely filled
        return endGame('Tie!'); // End the game and display a tie message
    }

    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1; // Switch the current player to the next player
}


// Function to check for win condition
function checkForWin() {
    function _win(cells) { // Helper function to check if a set of cells represents a winning combination

        return cells.every(
            ([y, x]) =>
                y >= 0 && // Check if y is within the game board height boundaries
                y < HEIGHT && // Check if y is within the game board height boundaries
                x >= 0 && // Check if x is within the game board width boundaries
                x < WIDTH && // Check if x is within the game board width boundaries
                board[y][x] === currPlayer // Check if the cell belongs to the current player
        );
    }

    for (let y = 0; y < HEIGHT; y++) { // Iterate over each row
        for (let x = 0; x < WIDTH; x++) { // Iterate over each column

            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // Set of cells in a horizontal line
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // Set of cells in a vertical line
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // Set of cells in a diagonal (down-right) line
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // Set of cells in a diagonal (down-left) line

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // Check if any of the combinations result in a win
                return true; // Return true to indicate a win
            }
        }
    }
}

document.querySelector('#restart-btn').addEventListener('click', function () {
    window.location.reload(); // Reload the page to restart the game
    return false;
});

// // Define a plaayer class
// class Player {
//     constructor(color) {
//         this.color = color; // Set the player's color
//     }
// }

// // Evewnt listeners for starting the game with player colors
// document.getElementById('start-game').addEventListener('click', () => {
//     let p1 = new Player(document.getElementById('p1-color').value); // Create player 1 with the color specified in the input field
//     let p2 = new Player(document.getElementById('p2-color').value); // Create player 2 with the color specified in the input field
//     new Game(p1, p2); // Create a new game instance with the two players
// });

makeBoard(); // Create the game board array
makeHtmlBoard(); // Create the HTML representation of the game board
