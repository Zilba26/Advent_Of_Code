const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((elt) => elt.split('   ').map((num) => parseInt(num, 10)));

const c1 = [];
const c2 = [];

for (let i = 0; i < input.length; i++) {
    c1.push(input[i][0]);
    c2.push(input[i][1]);
}

c1.sort((a, b) => a - b);
c2.sort((a, b) => a - b);

let result = 0;

for (let i = 0; i < c1.length; i++) {
  result += Math.abs(c2[i] - c1[i]);
}

console.log(result);