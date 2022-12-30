const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => 811589153 * parseInt(num, 10));

module.exports = {
    input,
};

class Number {
    constructor(number) {
        this.number = number;
    }
}

const tab = input.map((num) => new Number(num));
const tabCopy = [...tab];
let zero = null;

for (let j = 0 ; j < 10 ; j++) {
    for (let i = 0 ; i < tabCopy.length ; i++) {
        const number = tabCopy[i];
        if (number.number === 0) {
            zero = number;
        }
        const index = tab.indexOf(number);
        tab.splice(index, 1);
        tab.splice((index + number.number) % (tabCopy.length - 1), 0, number);
    }
}

console.log(tab.map((num) => num.number).join(', '));

const zeroIndex = tab.indexOf(zero);

const mille = tab[(1000 + zeroIndex) % tab.length];
const twoMille = tab[(2000 + zeroIndex) % tab.length];
const threeMille = tab[(3000 + zeroIndex) % tab.length];

console.log(mille.number);
console.log(twoMille.number);
console.log(threeMille.number);

console.log(mille.number + twoMille.number + threeMille.number);

// > 248346280818