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

function getPoints(input) {
    const firstHalf = input.substring(0, input.length / 2);
    const secondHalf = input.substring(input.length / 2);
    let count = [];
    for (let i = 0; i < firstHalf.length; i++) {
        if (secondHalf.includes(firstHalf[i])) {
            count.push(firstHalf[i]);
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

for (let i = 0; i < input.length; i++) {
    result += getPoints(input[i]);
}


console.log(result);