/*----- constants -----*/
const playerKeyLookup = {
    '1': 'purple',
    '-1': 'orange',
    '0': 'white'
};

/*----- state variables -----*/
let turn;   // 1 (purple) -1 (orange)
let winner; // null (if no winner) 'T' if tie, 1/-1 for winner
let board;  // 2d array (7x6 cols/rows) of numbers 0, 1, -1

/*----- cached elements  -----*/
const markerEls = document.querySelectorAll('#markers > div');
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');


/*----- event listeners -----*/
playAgainBtn.addEventListener('click', initialize);
document.getElementById('markers').addEventListener('click', handleDrop);

/*----- functions -----*/
initialize(); // make sure the game is set up when it loads in the brower

function initialize() {
    // this function initializes state to their
    // initial values
    turn = 1;
    winner = null;
    board = [
        [0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0], // col 6
    //  r0 r1 r2 r3 r4 r5
    ];
    render();
}

function handleDrop(evt) {
    // determine which marker was clicked on
    const colIdx =  [...markerEls].indexOf(evt.target);
    // match the position of that marker to the colArr
    if(colIdx === -1) return; // stop execution of this function
    const colArr = board[colIdx];
    const rowIdx = colArr.indexOf(0);
    // change the first zero available to 1/-1 based on the turn
    colArr[rowIdx] = turn;
    // toggle turn
    turn *= -1;
    // check if winning move

    winner = getWinner(colIdx, rowIdx);

    render();
}

function getWinner(colIdx, rowIdx) {
    // all functions will return 1, -1, null
    // win horizontally
    return checkHorizontalWin(colIdx, rowIdx) ||
           checkVerticalWin(colIdx, rowIdx) ||
           checkDiagonalWinNESW(colIdx, rowIdx) ||
           checkDiagonalWinNWSE(colIdx, rowIdx)
    // win vertically
    // win diagonally NESW
    // win diagonally NWSE
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
    const countNW = countAdjacent(colIdx, rowIdx, -1, 1);
    const countSE = countAdjacent(colIdx, rowIdx, 1, -1);

    if(countNW + countSE >= 3) {
        return board[colIdx][rowIdx];
    } else {
        return null;
    }
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
    // step 1) count NE
    const countNE = countAdjacent(colIdx, rowIdx, 1, 1);
    // step 2) count SW
    const countSW = countAdjacent(colIdx, rowIdx, -1, -1)
    console.log({ countNE, countSW})
    
    // if NE + SW >= 3 return winner
    if(countNE + countSW >= 3) {
        return board[colIdx][rowIdx];
    } else {
        // else return null
        return null;
    }
}



function checkVerticalWin(colIdx, rowIdx) {
    const countUp = countAdjacent(colIdx, rowIdx, 0, -1)
    console.log({ countUp })
    if(countUp === 3) {
        return board[colIdx][rowIdx] // 1, -1
    } else {
        return null;
    }
}

function checkHorizontalWin(colIdx, rowIdx) {
    // colIdx + rowidx = the position of the last placed color disc
    // step 1) count discs of same color left
    const countLeft = countAdjacent(colIdx, rowIdx, -1, 0);
    const countRight = countAdjacent(colIdx, rowIdx, 1, 0);
    console.log({countLeft, countRight})
    // step 2) count discs of same color  right
    if(countLeft + countRight >= 3) {
        return board[colIdx][rowIdx] // 1, -1
        // if left count + right count >= 3 return 1, -1
    } else {
        // else return null
        return null;
    }
}


function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    let count = 0;
    const playerValue = board[colIdx][rowIdx] // 1, -1

    // counting in a direction specified by the offsets
    colIdx += colOffset
    rowIdx += rowOffset
    while (
        // make sure the col exists
        board[colIdx] !== undefined &&
        // make sure the row exists
        board[colIdx][rowIdx] !== undefined &&
        // make sure the current value matches the playervalue
        board[colIdx][rowIdx] === playerValue
    ) {
        count++ // increment count because we found a matchin disc
        colIdx += colOffset // keep us moving in a specific direction
        rowIdx += rowOffset 
    }
    return count;
}


function render() {
    // render board
    renderBoard();
    // render message (who's turn, winner or tie)
    renderMessage();
    // render the controls (hide marks is col full - hide button while game is in play)
    renderControls();
}

function renderBoard() {
    // 1) scan the board by col and row
    // 2) check each value for each row position
    // 3) if the value is 0, we set background to white
    // 4) if the value is 1, we set background to purple
    // 5) if the value is -1, we set background to orange
    board.forEach((colArr, colIdx) => {
        colArr.forEach((rowVal, rowIdx) => {
            const cellId = `c${colIdx}r${rowIdx}`;
            const celEl = document.getElementById(cellId);
            celEl.style.backgroundColor = playerKeyLookup[rowVal];
        });
    });
}

function renderMessage() {
    // check if winner == 'T'
    let playerColor;


    if (winner === 'T') {
        // message content set to "It's a tie"
        messageEl.innerText = "It's a Tie!!!!";
        // if winner is 1 or -1
    } else if (winner) {

        playerColor = playerKeyLookup[winner]; // purple / orange

        messageEl.innerHTML = `<span style="color: ${playerColor}">${playerColor.toUpperCase()}</span> Wins!`;
    } else {

        playerColor = playerKeyLookup[turn]; // purple / orange

        messageEl.innerHTML = `<span style="color: ${playerColor}">${playerColor.toUpperCase()}</span>'s turn`;
    }

}

function renderControls() {
    // if game is in play, hide the play again button
    if(winner === null) {
        playAgainBtn.style.visibility = 'hidden';
    } else {
        playAgainBtn.style.visibility = 'visible';
    }
    // if any column is fully occupied (no cells available) hide that corresponding marker
    board.forEach((colArr, colIdx) => {
        if(!colArr.includes(0) || winner) {
            // cond 1) column has no zeros - it's full
            // hide the corresponding marker
            const marker = markerEls[colIdx];
            marker.style.visibility = 'hidden';
        } else {
            const marker = markerEls[colIdx];
            marker.style.visibility = 'visible';
        }
        // check if the colArr has any zeros in it
        // cond 2) colum HAS zeros - still has cells to be occupied
        // cond 3 if there is a winner or tie; hide all markers
    });
}

