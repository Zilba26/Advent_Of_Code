const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split(',')

module.exports = {
    input,
};

let L = [];

function calculeCarburant(position) {
    let a = input[position];
    let s = 0;
    for (let i = 0 ; i < input.length ; i++) {
        if (i != position) {
            s += Math.abs(a - input[i]);
            s += ((Math.abs(a - input[i]) - 1) * (Math.abs(a - input[i])))/2;
        }
    }
    return s;
}

for (j in input) {
    L.push(calculeCarburant(j));
}

let b = 99999999999999999999999999999999999;
for (k of L) {
    if (k < b) b = k;
}

console.log(b);

// > 833772