const romanToArabic = (input) => {
    const romans = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
    return [...input.toUpperCase()].reduce(
      (previousValue, currentValue, currentIndex, array) =>
        romans[array[currentIndex + 1]] > romans[currentValue]
          ? previousValue - romans[currentValue]
          : previousValue + romans[currentValue],
      0
    );
};

function Calculate() {
    let roman = document.getElementById("i").value;

    if (parseInt(roman) > 3999) {
        document.getElementById("result").innerHTML = "A római szám nem lehet nagyobb mint 3999";
        return;
    } else {
        let text = romanToArabic(roman);

        document.getElementById("result").innerHTML = text;
    }
}