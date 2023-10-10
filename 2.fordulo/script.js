for (let i = 1; i < 9; i++) {
    $('td#2-' + i + ' .space').prepend('<img id="d' + i + 'p" class="black paraszt" src="chess_pieces/Chess_pdt45.svg" alt="d' + i + 'p">')
    $('td#11-' + i + ' .space').prepend('<img id="l' + i + 'p" class="white paraszt" src="chess_pieces/Chess_plt45.svg" alt="d' + i + 'p">')
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
let clickables = [];

function resetClickables(fullReset) {
    clickables.forEach(element => {
        $(element).hide();
    });
    clickables = [];
    if (fullReset === true) { selectedPiece = "";}
}

function selectPiece(id) {
    if (selectedPiece === id) {return;} //if the piece is already selected, do nothing
    
    selectedPiece = id;

    let space =  getSpaceByID(id);
    let id_split = ($(space).attr("id")).split('-'); //get x, y from id
    let coords = {y : parseInt(id_split[0]), x : parseInt(id_split[1])}

    resetClickables()

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

    
}

function movePiece(whereToID) {
    let td = getSpaceByID(selectedPiece);
    let img = $(td).find('img');
    //let piece_class = $(img).attr("class");

    let spaceToMove = getSpaceByID(whereToID);
    spaceToMove = $(spaceToMove).find('.space')[0];
    $(img).appendTo(spaceToMove);

    resetClickables(true);
}

$(".black").on( "click", function() {
    if (currentPlayer === "black") {
        selectPiece($(this).closest('td').attr("id"));
        currentPlayer = "white";
    }
});
$(".white").on( "click", function() {
    if (currentPlayer === "white") {
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
}

//sakk genyok mozgasa: https://hu.wikipedia.org/wiki/Sakk