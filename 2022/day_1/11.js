const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => parseInt(num, 10));

module.exports = {
    input,
};

console.log(input);


let result = -1;
let currentResult = 0;
for (let i = 0 ; i < input.length ; i++) {
    if (input[i].toString() == "NaN") {
        if (currentResult > result) {
            result = currentResult;
        }
        currentResult = 0;
    } else {
        currentResult += input[i];
    }
}

console.log(result);