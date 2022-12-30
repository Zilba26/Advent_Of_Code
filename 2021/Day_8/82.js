const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split("| "));

module.exports = {
    input,
};

//console.log(input);

function searchNumber (L, taille) {
    for (i of L) {
        if (i.length == taille) return i
    }
}

function searchLetter (Lp, Mg) {
    Lp = Lp.split("");
    Mg = Mg.split("");
    for (i of Mg) {
        if (!Lp.includes(i)) return i;
    }
}

function compteOccurences(L, lettre) {
    let s = 0;
    for (i of L) {
        if (i == lettre) s++;
    }
    return s;
}

input = [["be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb", "fdgacbe cefdb cefbgd gcbe"], ["edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec", "fcgedb cgb dgebacf gc"]];

console.log(input);

for (j of input) {
    let L = j[0].split(" ")
    let eigth = searchNumber(L, 7);
    let seven = searchNumber(L, 3);
    let one = searchNumber(L, 2);
    let four = searchNumber(L, 4);
    let a = searchLetter(one, seven);
    const P = ["a", "b", "c", "d", "e", "f", "g"];
    let b = "b";
    let e = "e";
    let f = "f";
    for (k of P) {
        if (compteOccurences(L, k) == 6) b = k;
        if (compteOccurences(L, k) == 4) e = k;
        if (compteOccurences(L, k) == 9) f = k;
    }
    console.log("a", a, "b", b, "e", e, "f", f);
}