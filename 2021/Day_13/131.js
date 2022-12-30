const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    //.map((num) => num.split(","));

module.exports = {
    input,
};

let instructions = input.splice(866,13);
instructions.splice(0,1);
input = input.map((num) => num.split(","));

//console.log("instructions", instructions);
//console.log("input", input);

let max = 1000;
for (a of input) {
    for (b of a) {
        if (b > max) max = b;
    }
}

console.log("max", max)

let L = [];
let M = [];

for (i = 0 ; i < max ; i++) {
    M.push(0);
}

for (i = 0 ; i < max ; i++) {
    L.push([...M]);
}

for (j of input) {
    L[Number(j[1])][Number(j[0])] = 1;
}

//console.log(L);