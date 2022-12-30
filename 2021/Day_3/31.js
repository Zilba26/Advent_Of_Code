const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

module.exports = {
    input,
};

function bitToDecimal(bit) {
    let result = 0;
    for (i = 0 ; i < bit.length ; i++) {
        if (bit[bit.length - i - 1] == "1") result += 2**i;
    }
    return result;
}

let compteur1 = 0;
let compteur0 = 0;
let tauxGamma = "";
let tauxEpsilon = "";

for (i in input[0]) {
    for (j of input) {
        if (j[i] == "0") compteur0++;
        if (j[i] == "1") compteur1++;
    }
    if (compteur0 > compteur1) {
        tauxEpsilon += "1";
        tauxGamma += "0";
    }
    else {
        tauxEpsilon += "0";
        tauxGamma += "1";
    }
    compteur0 = 0;
    compteur1 = 0;
}

console.log(bitToDecimal(tauxEpsilon) * bitToDecimal(tauxGamma));