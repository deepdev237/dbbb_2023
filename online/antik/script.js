//Manapság  már  bitföldjén  is  mindenki  okostelefonnal  jár.  Régen  viszont  a  nyomógomb  volt  a divat. Ez a kép egy ilyen„billentyűzetet” mutat:Korábban az volt a jellemző, hogy egy karakter beírásához egy gombot többször is meg kellett nyomni. Például az ’n’ karakter a 6-os gomb kétszeri megnyomására lett elérhető, míg az ’s’ karakterhez a 7-es gombot kellett négyszer megnyomni.A  modern  technológia  azonban  lehetővé  teszi,  hogy  kevesebb  gombnyomással  is  tudjunk dolgozni. Minden karakter egyértelműen valamelyik gombhoz tartozik, és megfelelő predikciós algoritmusok  segítségével  elég  lehet  a  gombokat  egyszer  megnyomni.  Így  például  a„bat” szó beírásához a 228sorozatot kellene beütni. Ez a sorozat azonban jelentheti a „cat”szót is, így a jelölés nem mindig egyértelmű.Teljes mondat esetén a szóközt a 0 jelöli. Így a „There is a bat in the cave” mondat kódolása: 84373047020228046084302283.Készítsetek egy olyan honlapot, ahova be lehet írni egy számsorozatot, és visszafordítja aztegy mondatra.  Amennyiben  valamelyik  szó  kódja  több  szóra  is  illeszkedik,  úgy  az  alternatívák  is jelenjenek meg valamilyen módon.A szövegben csak angol szavakat kell kezelni, kis betűkkel. A  szavak  listája  beépíthető  a  honlapba,  vagy  letölthető  távolról. Célszerű  az  alábbi  listát használni:https://www.mit.edu/~ecprice/wordlist.10000

const numberToLetter = {
    '0': ' ',
    '1': '1',
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
};

function numbersToLetters(numbers) {
    let result = [''];

    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];

        if (number === '0' || number === '1') {
            for (let j = 0; j < result.length; j++) {
                result[j] += numberToLetter[number];
            }
        } else if (numberToLetter[number]) {
            let newResult = [];

            for (let j = 0; j < result.length; j++) {
                for (let k = 0; k < numberToLetter[number].length; k++) {
                    newResult.push(result[j] + numberToLetter[number][k]);
                }
            }

            result = newResult;
        } else {
            // Handle unknown numbers
            for (let j = 0; j < result.length; j++) {
                result[j] += `(${number})`;
            }
        }
    }

    return result;
}

async function getWordList() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/bmschmidt/7a903432d42606ead4c22b677646df1a/raw/0feb5962658ac8b92c6a33971973357333b6fe53/wordlist.txt', {
            method: 'GET',
            headers: {
                accept: 'html/text',
            },
        });

        let text = await response.text();
        const wordlist = text.split('\n').map(word => word.toLowerCase());
        return wordlist;
    } catch (err) {
        console.log(err);
        return [];
    }   
}

async function Calculate() {
    let numbers = document.getElementById("i").value;

    let possibleWords = numbersToLetters(numbers);
  
    let wordlist = await getWordList();

    let words = possibleWords.filter(word => wordlist.includes(word));

    let sentence = words.join(', ');

    document.getElementById("result").innerHTML = "Lehetseges szavak: " + sentence;
}

// 8 4 3 7 3 4 7 2 22 8 4 6 8 4 3 22 8 3