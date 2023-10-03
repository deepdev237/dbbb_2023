// lerakja a gyalogokat bazdmeg
const position = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (let x in position) {
    $('td#2-' + position[x] + ' .space').prepend('<img id="d' + x + '" src="chess_pieces/Chess_pdt45.svg" alt="">')
}

for (let x in position) {
    $('td#11-' + position[x] + ' .space').prepend('<img id="l' + x + '" src="chess_pieces/Chess_plt45.svg" alt="">')
}

//todo: implement mozgas
//kiraly: 2 minden iranyba
//gyalog: elore 1,2,3  , utni atloban 1 lepesel


//fontos: azonositas kene a babuknak ;
//hogy tudjuk oket hasznalni itt :)
//talan ezzel lehetne: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes