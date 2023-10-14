for (let i = 1; i < 9; i++) {
    $('td#2-' + i + ' .space').prepend('<img id="d' + i + 'p" class="black gyalog" src="chess_pieces/Chess_pdt45.svg" alt="d' + i + 'p">')
    $('td#11-' + i + ' .space').prepend('<img id="l' + i + 'p" class="white gyalog" src="chess_pieces/Chess_plt45.svg" alt="d' + i + 'p">')
}

$('td#1-1 .space').prepend('<img id="rd0" class="black bastya" src="chess_pieces/Chess_rdt45.svg" alt="rd0">');
$('td#1-2 .space').prepend('<img id="nd1" class="black huszar" src="chess_pieces/Chess_ndt45.svg" alt="nd1">');
$('td#1-3 .space').prepend('<img id="db2" class="black futo" src="chess_pieces/Chess_bdt45.svg" alt="db2">');
$('td#1-4 .space').prepend('<img id="qd3" class="black kiraly" src="chess_pieces/Chess_qdt45.svg" alt="qd3">');
$('td#1-5 .space').prepend('<img id="kd4" class="black vezer" src="chess_pieces/Chess_kdt45.svg" alt="kd4">');
$('td#1-6 .space').prepend('<img id="db5" class="black futo" src="chess_pieces/Chess_bdt45.svg" alt="db5">');
$('td#1-7 .space').prepend('<img id="nd6" class="black huszar" src="chess_pieces/Chess_ndt45.svg" alt="nd6">');
$('td#1-8 .space').prepend('<img id="rd7" class="black bastya" src="chess_pieces/Chess_rdt45.svg" alt="rd7">');

$('td#12-1 .space').prepend('<img id="rl0" class="white bastya" src="chess_pieces/Chess_rlt45.svg" alt="rl0">');
$('td#12-2 .space').prepend('<img id="nl1" class="white huszar" src="chess_pieces/Chess_nlt45.svg" alt="nl1">');
$('td#12-3 .space').prepend('<img id="dl2" class="white futo" src="chess_pieces/Chess_blt45.svg" alt="dl2">');
$('td#12-4 .space').prepend('<img id="ql3" class="white kiraly" src="chess_pieces/Chess_qlt45.svg" alt="ql3">');
$('td#12-5 .space').prepend('<img id="kl4" class="white vezer" src="chess_pieces/Chess_klt45.svg" alt="kl4">');
$('td#12-6 .space').prepend('<img id="dl5" class="white futo" src="chess_pieces/Chess_blt45.svg" alt="dl5">');
$('td#12-7 .space').prepend('<img id="nl6" class="white huszar" src="chess_pieces/Chess_nlt45.svg" alt="nl6">');
$('td#12-8 .space').prepend('<img id="rl7" class="white bastya" src="chess_pieces/Chess_rlt45.svg" alt="rl7">');

//todo: implement mozgas
//kiraly: 2 minden iranyba
//gyalog: elore 1,2,3  , utni atloban 1 lepesel

function GetSpaceByCoords(x, y) { //returns td
    return document.getElementById(x + '-' + y);
}

function getSpaceByID(id) {
    return document.getElementById(id);
}

let currentPlayer = "black";
let selectedPiece = "";
let canMove = true;
let clickables = [];
let knockables = [];

function resetClickables(fullReset) {
    clickables.forEach(element => {
        $(element).hide();
    });
    clickables = [];
    if (fullReset === true) { selectedPiece = "";}
}

function opposingColor() {
    //playerSpeed = PlayerControls["shift"].toggle == true ? 2 : PlayerControls["space"].toggle == true ? 0.5 : 1;
    //return currentPlayer == "black" ? "white" : currentPlayer == "white" ? "black" : ""
    if (currentPlayer === "black") {
        return "white";
    } else {
        return "black";
    }
}

function getMovement(x, y, i, direction) {
    let new_x = x;
    let new_y = y;

    if (direction === "leftup") {
        x = x - 1
        y = y - 1
    } else if (direction === "left") {
        y = y - 1
    } else if (direction === "leftdown") {
        x = x + 1
        y = y - 1
    } else if (direction === "up") {
        x = x - 1
    } else if (direction === "down") {
        x = x + 1
    } else if (direction === "rightup") {
        x = x - 1
        y = y + 1
    } else if (direction === "right") {
        y = y + 1
    } else if (direction === "rightdown") {
        x = x + 1
        y = y + 1
    }

    return [new_x, new_y];
}

/*
const moves = {
    "kiraly" : {
        "x" : 1,
        "y" : 1
    },
    "vezer" : {
        "x" : 10,
        "y" : 10
    },
    "futo" : {
        "x" : 4,
        "y" : 4
    },
    "bastya" : {
        "x" : 12,
        "y" : 12
    },
    "huszar" : {
        "x" : 0,
        "y" : 3
    },
    "gyalog" : {
        "x" : 0,
        "y" : 3
    },
}
*/

function updateClickables(td, coords) {
    let img = $(td).find("img");
    let img_class = $(img).attr("class");
    let class_split = img_class.split(" ");
    let piece = class_split[1];
    if (piece == "gyalog") {
        for (let i = 0; i < 3; i++) {
            let clickableCoords = {};

            if (currentPlayer == "black") {
                clickableCoords = {x : coords.x, y : (coords.y + (i+1))}
            } else {
                clickableCoords = {x : coords.x, y : (coords.y - (i+1))}
            }
            
            let td = GetSpaceByCoords(clickableCoords.y, clickableCoords.x) //td
            let img = $(td).closest('img');
            let circle = $(td).find('.circle');
            let knockable = $(td).find('.knockable');
            //console.log(td);
            //console.log(img);
            if (class_split[0] == opposingColor()) { //piece can be knocked down (knockable)
                console.log(img);
                knockables.push(knockable);
                td.addClass("knockable");
                circle.hide();
                knockable.show();
                
            } else {

                clickables.push(circle);
                knockable.hide();
                circle.show();
                
            }
        }
    }
    
}

function selectPiece(id) {
    if (selectedPiece === id) {return;} //if the piece is already selected, do nothing
    
    selectedPiece = id;

    let td =  getSpaceByID(id);
    let id_split = ($(td).attr("id")).split('-'); //get x, y from id
    let coords = {y : parseInt(id_split[0]), x : parseInt(id_split[1])}

    resetClickables()

    updateClickables(td, coords)

    canMove = false;

    /*
    if (currentPlayer === "black") {
        for (let i = 0; i < 2; i++) {
            let clickableCoords = {x : coords.x, y : (coords.y + (i+1))}
            let td = GetSpaceByCoords(clickableCoords.y, clickableCoords.x) //td
            let img = $(td).closest('img');
            console.log(td);
            console.log(img);
            if ($(img).hasClass("black")) {
                break;
            } else {
                let circle = $(td).find('.circle');
    
                clickables.push(circle);
                circle.show();
            }
        }
    } else {
        for (let i = 0; i < 2; i++) {
            let clickableCoords = {x : coords.x, y : (coords.y - (i+1))}
            let td = GetSpaceByCoords(clickableCoords.y, clickableCoords.x) //td
            let img = $(td).closest('img');
            console.log(td);
            console.log(img);
            if ($(img).hasClass("white")) {
                break;
            } else {
                let circle = $(td).find('.circle');
    
                clickables.push(circle);
                circle.show();
            }
        }
    }
    */
}

function movePiece(whereToID) {
    let td = getSpaceByID(selectedPiece);
    let img = $(td).find('img');
    //let piece_class = $(img).attr("class");

    let spaceToMove = getSpaceByID(whereToID);
    spaceToMove = $(spaceToMove).find('.space')[0];
    $(img).appendTo(spaceToMove);

    resetClickables(true);
    canMove = true;
}

$(".black").on( "click", function() {
    if (currentPlayer === "black" && canMove) {
        selectPiece($(this).closest('td').attr("id"));
        currentPlayer = "white";
    }
});
$(".white").on( "click", function() {
    if (currentPlayer === "white" && canMove) {
        selectPiece($(this).closest('td').attr("id"));
        currentPlayer = "black";
    }
});

$(".circle").on( "click", function() {
    let To_id = $(this).closest('td').attr("id");
    movePiece(To_id)
});

window.onload = function() {
    $(".circle").hide(); //hide circles on start
    $(".knockable").hide(); //hide circles on start
}

//sakk genyok mozgasa: https://hu.wikipedia.org/wiki/Sakk