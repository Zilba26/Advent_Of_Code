const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    //.map((num) => num.split("| "));

module.exports = {
    input,
};

input = ["2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678"];

let result = 0;
L = [];

for (i = 0 ; i < input.length ; i++) {
    if (i == 0) {
        for (j = 0 ; j < input[0].length ; j++) {
            if (j == 0) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            } else if (j == input[0].length-1) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            } else {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            }
        }
    } else if (i == input.length-1) {
        for (j = 0 ; j < input[0].length ; j++) {
            if (j == 0) {
                if (input[i][j] < input[i-1][j] && input[i][j] < input[i][j+1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            } else if (j == input[0].length-1) {
                if (input[i][j] < input[i-1][j] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            } else {
                if (input[i][j] < input[i-1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            }
        }
        
    } else {
        for (j = 0 ; j < input[0].length ; j++) {
            if (j == 0) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i-1][j]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            } else if (j == input[0].length-1) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j-1] && input[i][j] < input[i-1][j]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            } else {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1] && input[i][j] < input[i-1][j]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push(input[i][j]);
                }
            }
        }
    }
    console.log("->", i, L, result);
}

console.log(result);

// < 792