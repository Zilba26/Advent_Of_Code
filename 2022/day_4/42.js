const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((elt) => elt.split(','));

module.exports = {
    input,
};

function isOverlap(firstPart, secondPart) {
    const firstPartTab = firstPart.split('-').map((elt) => parseInt(elt, 10));
    const secondPartTab = secondPart.split('-').map((elt) => parseInt(elt, 10));
    if (firstPartTab[0] < secondPartTab[0] && firstPartTab[1] < secondPartTab[0]) {
        return false;
    }
    if (firstPartTab[0] > secondPartTab[1] && firstPartTab[1] > secondPartTab[1]) {
        return false;
    }
    return true;
}

let result = 0;

for (let i = 0; i < input.length; i++) {
    if (isOverlap(input[i][0], input[i][1])) {
        result++;
    }
}


console.log(result);