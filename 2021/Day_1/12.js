const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => parseInt(num, 10));

module.exports = {
    input,
};

let result = 0
for (i in input) {
    if (i > 2) {
        if (input[i-3] < input[i]) result++
    }
}

console.log(result);