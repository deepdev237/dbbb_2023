async function Calculate() {
    let input = document.getElementById("i").value;

    let result = '';

    while (input > 0) {
        let remainder = input % 26;
        if (remainder === 0) {
            result = 'Z' + result;
            input = Math.floor(input / 26) - 1;
        } else {
            result = String.fromCharCode(remainder + 64) + result;
            input = Math.floor(input / 26);
        }
    }

    document.getElementById("result").innerHTML = result;
}