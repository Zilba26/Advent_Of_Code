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

let compteur0 = 0;
let compteur1 = 0;
let oxygene = "";
let co2 = "";
let Ltempo = [];
let L = input;

for (i in input[0]) {
    if (L.length != 1) {
        for (j of L) {
            if (j[i] == "0") compteur0++;
            if (j[i] == "1") compteur1++;
        }
        if (compteur0 > compteur1) {
            oxygene += "0";
            for (j of L) {
                if (j[i] == "0") Ltempo.push(j);
            }
        }
        else {
            oxygene += "1";
            for (j of L) {
                if (j[i] == "1") Ltempo.push(j);
            }
        }
        console.log("L", L);
        L = Ltempo;
        Ltempo = [];
        compteur0 = 0;
        compteur1 = 0;
    }
    else oxygene = L[0];
}

L = input;

for (i in input[0]) {
    if (L.length != 1) {
        for (j of L) {
            if (j[i] == "0") compteur0++;
            if (j[i] == "1") compteur1++;
        }
        if (compteur0 > compteur1) {
            co2 += "1";
            for (j of L) {
                if (j[i] == "1") Ltempo.push(j);
            }
        }
        else {
            co2 += "0";
            for (j of L) {
                if (j[i] == "0") Ltempo.push(j);
            }
        }
        L = Ltempo;
        Ltempo = [];
        compteur0 = 0;
        compteur1 = 0;
    }
    else co2 = L[0];
}

console.log(bitToDecimal(oxygene) * bitToDecimal(co2));