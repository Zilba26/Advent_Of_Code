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

let result = [-1, -1 ,-1];
let currentResult = 0;
for (let i = 0 ; i < input.length ; i++) {
    if (input[i].toString() == "NaN") {
        let caloriesMin = getMin(result);
        if (currentResult > caloriesMin[0]) {
            result[caloriesMin[1]] = currentResult;
        }
        currentResult = 0;
    } else {
        currentResult += input[i];
    }
}

function getMin(tab) {
    let min = tab[0];
    let index = 0;
    for (let i = 0 ; i < tab.length ; i++) {
        if (tab[i] < min) {
            min = tab[i];
            index = i;
        }
    }
    return [min, index];
}

let r = 0;
for (let i = 0 ; i < result.length ; i++) {
    r += result[i];
}

console.log(r);