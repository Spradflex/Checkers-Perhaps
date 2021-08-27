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
    return board.indexOf(pieceId);
};

/*DOM reference https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model || 
"The DOM represents a document with a logical tree. Each branch of the tree ends in a node,
and each node contains objects. DOM methods allow programmatic access to the tree. With them,
 you can change the document's structure, style, or content."*/
 const tiles = document.querySelectorAll("td");//Returns all element descendants of node that match selectors. tiles = td ; html flex td cells = static 
 let redPieces = document.querySelectorAll("p");// redPieces are now allocated to <p> in html for use in the script(now knows what I want it to target)
 let blackPieces = document.querySelectorAll("span");// blackPieces are now allocated to <span> this makes it easy to write out instead of targeting 2 <p> elements 
 const redTurnTxt = document.querySelectorAll(".red-turn-text");//static text needing script    
 const blackTurnTxt = document.querySelectorAll(".black-turn-txt");//^^
 const divider = document.querySelectorAll("#divider")//static text needing js place holder "not sure if i need yet but just incase"