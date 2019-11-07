let letterX = '<img src="x.png" height="120" width="120" id="x">';
let letterO = '<img src="o.png" height="120" width="120" id="o">';
let player = letterX
let numPlayers = 1;
let playerTurn = document.getElementById ("turn")
let playerXMoves = [];
let playerOMoves = [];
let currentArray = playerXMoves;
let opponentArray = playerOMoves;
let turnCount = 0;
let lineDiv = document.getElementById('line0');
let winner = null;

const corners = [0, 2, 6, 8];

const adjacentCorners = [
  [0, 2, 6],
  [2, 8, 0],
  [8, 6, 2],
  [6, 0, 8]
];

//List of all possible win conditions
const winConditions = [
  [0, 1, 2, 'top-row'],
  [3, 4, 5, 'middle-row'],
  [6, 7, 8, 'bottom-row'],
  [0, 3, 6, 'left-col'],
  [1, 4, 7, 'middle-col'],
  [2, 5, 8, 'right-col'],
  [0, 4, 8, 'left-diag'],
  [2, 4, 6, 'right-diag']
];



//computer v. computer
//function zeroPlayer() {
 // numPlayers = 0;
 // clearBoard();
 // computerPlayer2();
// }

//human v. computer
//function singlePlayer() {
 // numPlayers = 1;
 // start();
//}

//human v. human
//function twoPlayers() {
//  numPlayers = 2;
//  start();
//}

//--------------------------------Game Setup Functions--------------------------------------------------

//initializes start buttons, this is called at the very beginning to setup the game
//function buttonStart() {
  //document.getElementById('onePlayer').addEventListener('click', singlePlayer);
  //document.getElementById('twoPlayer').addEventListener('click', twoPlayers);
  //document.getElementById('zeroPlayer').addEventListener('click', zeroPlayer);
//}

let start = document.getElementById ('start')

start.addEventListener ('click', startGame)

function startGame(){ start.disabled = true 

playerTurn.innerHTML = "Player X's Turn"
}








//clears the board in preperation for a new game, and resets global variables
function clearBoard() {
  console.log('');
  console.log('----- New Game -----');
  winner = null;
  lineDiv.innerHTML = '';
  player = letterX
  playerXMoves = [];
  playerOMoves = [];
  currentArray = playerXMoves;
  playerTurn.innerHTML = "It is player X's turn";
  turnCount = 0;
  for (let i = 0; i < 9; i++) {
    let clearSquare = document.getElementById(`cell-${i}`);
    clearSquare.innerHTML = '';
  }
}

////adds event listeners to all squares, prep for new game
//function start() {
//  for (let i = 0; i < 9; i++) {
//    let startSquare = document.getElementById(`cell-${i}`);
//    startSquare.addEventListener('click', play);
//  }
//  clearBoard();
//}
//
//start()

//clears event listeners, and reintializes start buttons
function stop() {
  for (let i = 0; i < 9; i++) {
    let stopSquare = document.getElementById(`cell-${i}`);
    stopSquare.removeEventListener('click', play);
  }
  buttonStart();
}

//------------------------Win Checker--------------------------------------------------------

//alerts the winner
function xOrOWins() {
  if (player === letterX) {
    winner = "x";
    playerTurn.innerHTML = 'Congratulations!  Player X Wins!!!';
  } else {
    winner = "o";
    playerTurn.innerHTML = 'Congratulations!  Player O Wins!!!';
  }
  stop();
}

//checks if a winning combo has been played
function winTriplet(a, b, c) {
  if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${b}`) && currentArray.includes(`cell-${c}`)) {
    return true;
  }
};

//checks if the game is over
function winCheck() {
  for (let win of winConditions) {
    if (winTriplet(win[0], win[1], win[2])) {
      showWinner(win[3]);
      return true;
    }
  } if (turnCount === 9) {
    playerTurn.innerHTML = "It's a DRAW.........";
  } else {
    toggle();
  }
}


////checks if a winning move is available for the computer
//function canIWin(a, b, c) {
//  if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${b}`) && document.getElementById(`cell-${c}`).innerHTML === '') {
//    return `cell-${c}`;
//  } else if (currentArray.includes(`cell-${b}`) && currentArray.includes(`cell-${c}`) && document.getElementById(`cell-${a}`).innerHTML === '') {
//    return `cell-${a}`;
//  } else if (currentArray.includes(`cell-${a}`) && currentArray.includes(`cell-${c}`) && document.getElementById(`cell-${b}`).innerHTML === '') {
//    return `cell-${b}`;
//  }
//}
//
////if a winning move is available the computer will play there
//function iCanWin() {
//  for (let win of winConditions) {
//    if (canIWin(win[0], win[1], win[2])) {
//      let winCell = canIWin(win[0], win[1], win[2]);
//      return winCell;
//    }
//  }
//}
//
////computer checks if the other player is about to win
//function winBlock(a, b, c) {
//  if (opponentArray.includes(`cell-${a}`) && opponentArray.includes(`cell-${b}`) && document.getElementById(`cell-${c}`).innerHTML === '') {
//    return `cell-${c}`;
//  } else if (opponentArray.includes(`cell-${b}`) && opponentArray.includes(`cell-${c}`) && document.getElementById(`cell-${a}`).innerHTML === '') {
//    return `cell-${a}`;
//  } else if (opponentArray.includes(`cell-${a}`) && opponentArray.includes(`cell-${c}`) && document.getElementById(`cell-${b}`).innerHTML === '') {
//    return `cell-${b}`;
//  }
//}
//
////computer blocks the opponents winning square
//function iCanBlock() {
//  for (let win of winConditions) {
//    if (winBlock(win[0], win[1], win[2])) {
//      let blockedCell = winBlock(win[0], win[1], win[2]);
//      return blockedCell;
//    }
//  }
//}
//
//get a random element from an array
function randomArray(array) {
  return array[(Math.floor(Math.random() * array.length))];
}

////computer will play in a blocking adjacent corner
//function secondCorner() {
//  for (array of adjacentCorners) {
//    if (opponentArray[0] == `cell-${array[0]}`) {
//      return array[randomArray([1, 2])];
//    }
//  }
//}

//computer will play in a random available square
//function randomSquare() {
//  let emptyArray = [];
//  for (let i = 0; i < 9; i++) {
//    if (document.getElementById("cell-" + i).innerHTML === '') {
//      emptyArray.push("cell-" + i);
//      return randomArray(emptyArray);
//    }
//  }
//}
//
////computer decides what the best play is in hierarchy: center, random corner, opposite corner, winning move, blocking move, random move
//function computerAI() {
//  if (document.getElementById("cell-4").innerHTML === '') {
//    return "cell-4";
//  } else if (turnCount === 1) {
//    return `cell-${randomArray(corners)}`;
//  } else if (turnCount === 2) {
//    return `cell-${secondCorner()}`;
//  } else if (iCanWin()) {
//    console.log("win");
//    return (iCanWin());
//  } else if (iCanBlock()) {
//    console.log("block");
//    return (iCanBlock());
//  } else if (turnCount === 9) {
//    playerTurn.innerHTML = "It's a DRAW.........";
//    return true;
//  } else {
//    console.log("random");
//    return (randomSquare());
//  }
//}


function play(e) {
    if (e.currentTarget.innerHTML === '') {
      e.currentTarget.innerHTML = player;
      currentArray.push(e.currentTarget.id);
      turnCount++;
      winCheck();
      if (numPlayers === 1) {
        computerPlayer();
      }
    } else {
      playerTurn.innerHTML = "Impossible! That cell is already full.";
    };
  }
  



//draws a line through the winning combo

function showWinner(line) {
    lineDiv.innerHTML = `<div id="${line}"></div>`;
    xOrOWins();
  }

//
//Switches players
function toggle() {
    if (player === letterX) {
      player = letterO;
      currentArray = playerOMoves;
      opponentArray = playerXMoves;
      playerTurn.innerHTML = "It is player O's turn";
    }
    else {
      player = letterX;
      currentArray = playerXMoves;
      opponentArray = playerOMoves;
      playerTurn.innerHTML = "It is player X's turn";
    };
  };
  