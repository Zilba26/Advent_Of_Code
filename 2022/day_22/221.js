const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
    .toString()
    //.trim()
    .replaceAll('\r', '')
    .split('\n\n')


const tab = input[0].split('\n').map((line) => line.split(''));
const instructions = input[1].split(/L|R/);
const max = tab.reduce((a,b) => Math.max(a.length, b.length));

console.log(tab);
console.log(instructions);
console.log(tab[0].length);