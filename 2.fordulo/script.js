const position = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

var pieces = []
pieces.push({ id: "", categories: "", relase_date: "1996. május 22.", img: "chess_pieces/Chess_pdt45.svg", link: "https://www.imdb.com/title/tt0117060/" });


for (let x in position) {
    $('td#2-' + position[x] + ' .space').prepend('<img id="d' + x + 'p" data_color="white" data-piece="paraszt" data-x="2" data-y="' + x + '" src="chess_pieces/Chess_pdt45.svg" alt="d' + x + 'p">')
    $('td#11-' + position[x] + ' .space').prepend('<img id="l' + x + 'p" data_color="white" data-piece="paraszt" data-x="11" data-y="' + x + '" src="chess_pieces/Chess_plt45.svg" alt="d' + x + 'p">')

    $('td#2-' + position[x] + ' .space').addClass("piece");
    $('td#11-' + position[x] + ' .space').addClass("piece");
}

//todo: implement mozgas
//kiraly: 2 minden iranyba
//gyalog: elore 1,2,3  , utni atloban 1 lepesel


//fontos: azonositas kene a babuknak ;
//hogy tudjuk oket hasznalni itt :)
//talan ezzel lehetne: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes