const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split(',')
    .map((num) => parseInt(num));

module.exports = {
    input,
};
let a = 0

for (i = 0 ; i < 80 ; i++) {
    a = input.length;
    for(j in input) {
        if (input[j] == 0) {
            input[j] = 6;
            input.push(8);
        }
        else input[j]--;
    }
}

console.log(input.length);
