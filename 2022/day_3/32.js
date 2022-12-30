const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    //.map((num) => parseInt(num, 10));

module.exports = {
    input,
};

function getPoints(input1, input2, input3) {
    let count = [];
    for (let i = 0; i < input1.length; i++) {
        if (input2.includes(input1[i]) && input3.includes(input1[i])) {
            count.push(input1[i]);
        }
    }
    let letter = count[0];
    if (letter.toLowerCase() === letter) {
        return letter.charCodeAt(0) - 96;
    } else {
        return letter.charCodeAt(0) - 38;
    }
}

let result = 0;

for (let i = 0; i < input.length; i+=3) {
    result += getPoints(input[i], input[i+1], input[i+2]);
}


console.log(result);