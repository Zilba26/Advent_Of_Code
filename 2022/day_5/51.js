const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .slice(10)
    .map((elt) => elt.split(' '));

module.exports = {
    input,
};

let caisses = [
    ["B", "S", "V", "Z", "G", "P", "W"],
    ["J", "V", "B", "C", "Z", "F"],
    ["V", "L", "M", "H", "N", "Z", "D", "C"],
    ["L", "D", "M", "Z", "P", "F", "J", "B"],
    ["V", "F", "C", "G", "J", "B", "Q", "H"],
    ["G", "F", "Q", "T", "S", "L", "B"],
    ["L", "G", "C", "Z", "V"],
    ["N", "L", "G"],
    ["J", "F", "H", "C"],
];

for (let i = 0; i < input.length; i++) {
    console.log(input[i]);
    for (let j = 0 ; j < parseInt(input[i][1]) ; j++) {
        const p = caisses[parseInt(input[i][3]) - 1].pop();
        caisses[parseInt(input[i][5]) - 1].push(p);
    }
}

let result = "";

for (let i = 0; i < caisses.length; i++) {
    result += caisses[i][caisses[i].length - 1];
}

console.log(result);