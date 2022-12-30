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

function getResult(input) {
    switch (input[0]) {
        case 'A':
            return input[2] == 'X' ? 1 + 3 : (
                input[2] == 'Y' ? 2 + 6 : 3 + 0
            )
        case 'B':
            return input[2] == 'X' ? 1 + 0 : (
                input[2] == 'Y' ? 2 + 3 : 3 + 6
            )
        case 'C':
            return input[2] == 'X' ? 1 + 6 : (
                input[2] == 'Y' ? 2 + 0 : 3 + 3
            )
    }
}

let result = 0;

for (let i = 0; i < input.length; i++) {
    result += getResult(input[i]);
}


console.log(result);