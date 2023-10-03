const position = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (let x in position) {
    $('td#2-' + position[x] + ' .space').prepend('<img id="dp' + x + '" data_color="white" data-piece="paraszt" data-x="2" data-y="' + x + '" src="chess_pieces/Chess_pdt45.svg" alt="d' + x + 'p">')
    $('td#11-' + position[x] + ' .space').prepend('<img id="lp' + x + '" data_color="white" data-piece="paraszt" data-x="11" data-y="' + x + '" src="chess_pieces/Chess_plt45.svg" alt="d' + x + 'p">')

    $('td#2-' + position[x] + ' .space').addClass("piece");
    $('td#11-' + position[x] + ' .space').addClass("piece");
}

$('td#1-' + position[0] + ' .space').prepend('<img id="rd0" data-color="black" data-piece="bastya" data-x="0" data-y="0" src="chess_pieces/Chess_rdt45.svg" alt="rd0">');
$('td#1-' + position[1] + ' .space').prepend('<img id="nd1" data-color="black" data-piece="huszar" data-x="1" data-y="0" src="chess_pieces/Chess_ndt45.svg" alt="nd1">');
$('td#1-' + position[2] + ' .space').prepend('<img id="db2" data-color="black" data-piece="futo" data-x="2" data-y="0" src="chess_pieces/Chess_bdt45.svg" alt="db2">');
$('td#1-' + position[3] + ' .space').prepend('<img id="qd3" data-color="black" data-piece="kiraly" data-x="3" data-y="0" src="chess_pieces/Chess_qdt45.svg" alt="qd3">');
$('td#1-' + position[4] + ' .space').prepend('<img id="kd4" data-color="black" data-piece="vezer" data-x="4" data-y="0" src="chess_pieces/Chess_kdt45.svg" alt="kd4">');
$('td#1-' + position[5] + ' .space').prepend('<img id="db5" data-color="black" data-piece="futo" data-x="5" data-y="0" src="chess_pieces/Chess_bdt45.svg" alt="db5">');
$('td#1-' + position[6] + ' .space').prepend('<img id="nd6" data-color="black" data-piece="huszar" data-x="6" data-y="0" src="chess_pieces/Chess_ndt45.svg" alt="nd6">');
$('td#1-' + position[7] + ' .space').prepend('<img id="rd7" data-color="black" data-piece="bastya" data-x="7" data-y="0" src="chess_pieces/Chess_rdt45.svg" alt="rd7">');

$('td#12-' + position[0] + ' .space').prepend('<img id="rl0" data-color="white" data-piece="bastya" data-x="0" data-y="11" src="chess_pieces/Chess_rlt45.svg" alt="rl0">');
$('td#12-' + position[1] + ' .space').prepend('<img id="nl1" data-color="white" data-piece="huszar" data-x="1" data-y="11" src="chess_pieces/Chess_nlt45.svg" alt="nl1">');
$('td#12-' + position[2] + ' .space').prepend('<img id="dl2" data-color="white" data-piece="futo" data-x="2" data-y="11" src="chess_pieces/Chess_blt45.svg" alt="dl2">');
$('td#12-' + position[3] + ' .space').prepend('<img id="ql3" data-color="white" data-piece="kiraly" data-x="3" data-y="11" src="chess_pieces/Chess_qlt45.svg" alt="ql3">');
$('td#12-' + position[4] + ' .space').prepend('<img id="kl4" data-color="white" data-piece="vezer" data-x="4" data-y="11" src="chess_pieces/Chess_klt45.svg" alt="kl4">');
$('td#12-' + position[5] + ' .space').prepend('<img id="dl5" data-color="white" data-piece="futo" data-x="5" data-y="11" src="chess_pieces/Chess_blt45.svg" alt="dl5">');
$('td#12-' + position[6] + ' .space').prepend('<img id="nl6" data-color="white" data-piece="huszar" data-x="6" data-y="11" src="chess_pieces/Chess_nlt45.svg" alt="nl6">');
$('td#12-' + position[7] + ' .space').prepend('<img id="rl7" data-color="white" data-piece="bastya" data-x="7" data-y="11" src="chess_pieces/Chess_rlt45.svg" alt="rl7">');

//todo: implement mozgas
//kiraly: 2 minden iranyba
//gyalog: elore 1,2,3  , utni atloban 1 lepesel


//fontos: azonositas kene a babuknak ;
//hogy tudjuk oket hasznalni itt :)
//talan ezzel lehetne: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
//sakk genyok mozgasa: https://hu.wikipedia.org/wiki/Sakk