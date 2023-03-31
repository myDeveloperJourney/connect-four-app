/*----- constants -----*/


/*----- state variables -----*/
let turn;   // 1 (purple) -1 (orange)
let winner; // null (if no winner) 'T' if tie, 1/-1 for winner
let board;  // 2d array (7x6 cols/rows) of numbers 0, 1, -1

/*----- cached elements  -----*/


/*----- event listeners -----*/
const markerEls = document.querySelectorAll('#markers > div');
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

/*----- functions -----*/

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
}

