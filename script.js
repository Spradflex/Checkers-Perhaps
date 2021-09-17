//Game state data, Based on HTML Table layout, ID consistency with pieces

const board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]
/*---cached variables---*/
//parses through pieceId's and returns the index of that pieces place on the board
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

/*DOM reference https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model || 
"The DOM represents a document with a logical tree. Each branch of the tree ends in a node,
and each node contains objects. DOM methods allow programmatic access to the tree. With them,
you can change the document's structure, style, or content."*/
const tiles = document.querySelectorAll("td");//Returns all element descendants of node that match selectors. tiles = td ; html flex td cells = static 
let redsPieces = document.querySelectorAll("p");// redPieces are now allocated to <p> in html for use in the script(now knows what I want it to target)
let blacksPieces = document.querySelectorAll("span");// blackPieces are now allocated to <span> this makes it easy to write out instead of targeting 2 <p> elements 
const redTurnTxt = document.querySelectorAll(".red-turn-text");//static text needing script    
const blackTurnTxt = document.querySelectorAll(".black-turn-txt");//^^
const divider = document.querySelectorAll("#divider")//static text needing Script

//Player properties 
let turn = true; //true === red turn ; false === black turn
let redsScore = 12; //12 pieces per player ; tracks pieces 0 === loss 
let blacksScore = 12;
let playerPieces;

//Selected piece
let selectedPiece = {
     pieceId: -1, //selected piece will reveal Id; no piece gives false id tag
     indexOfBoardPiece: -1, //recognizes place on board, false till click
     isKing: false, //checks king state
     seventhSpace: false, //checks available movement red + movement
     ninthSpace: false,
     fourtheethSpace: false,
     eighteenthSpace: false,
     minusSeventhSpace: false, //checks available movement black ; account for the fact black moves different direction to red
     minusNinthSpace: false,
     minusFourteenthSpace: false,
     minusEighteethSpace: false
}

// Event Listener red/blackPieces on click
/*-------LISTENS TO PIECES!!!!!!!!!!!!!!----*/
function givePiecesEventListeners() {
    if (turn) { //if turn red; event listeners are on for red pieces off for 
        for(let i = 0; i < redsPieces.length; i++){ //for loop, cycle though all red aligned pieces and listen for click
            redPieces[i].addEventListener("click", getPlayerPieces);
        }
} else {
        for(let i = 0; i < blacksPieces.length; i++){//else for loop for black pieces
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
}
}

/*--logicals--*/

// Holds the length of the players piece count 

function getPlayerPieces() {
    if (turn) {
        playerPieces = redsPieces;
    } else {
        playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders();
}
/* Designed to reset traits that have not been changed yet in the code ---Recomended first in the chain to prevent data carry over--- */

//removes possible moves from old selected piece (*pick piece put it down*) removes on click (dynamic board)
function removeCellonClick() {
    for(let i = 0; i < playerPieces.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

/*many of these where suggested to be tied together to create functions that push together other functions to ensure good data transfer*/
/*later use of on click action; Intent to place unique border on selected piece, necissary for dynamic board and new piece selection*/
//resets piece border to default 
function resetBorders() { 
    for(let i = 0; i < playerPieces.length; i++) {
        playerPiece[i].style.border = "2px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

//reset piece proporties 
function resetSelectedPieceProperties(){
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourtheethSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteethSpace = false;
}//resets all the properties from previously selected piece 

//finds piece on the board, 
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

//check is piece is a king; This should later be able to referense element ID of a piece and determin Kingship
function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing =false;
    }
    getAvailableSpaces();
}
    
/*------Visual-----
||( )||( )||( )||+9 || 8 ||+7||6 ||5 ||
||(4)||(3)||(2)||(1)||(P)||-1||-2||-3||
||-4 ||-5 ||-6 ||-7}||-8||-9}||()||()||
*/
//Getting super hard, Need to input movement based on cell for activated piece. 
function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null && 
        cells[selectedPiece.indexOfBoardPiece + 7].classList.contains("nPH") !== true) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && 
        cells[selectedPiece.indexOfBoardPiece + 9].classList.contains("nPh") !== true) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && 
        cells[selectedPiece.indexOfBoardPiece - 7].classList.contains("nPH") !== true) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 9] === null && 
        cells[selectedPiece.indexOfBoardPiece - 9].classList.contains("nPH") !== true) {
        selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
}