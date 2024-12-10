const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(''))

module.exports = {
    input,
};

function trail(i, j, tab) {
    const nb = parseInt(input[i][j]);
    if (nb === 9) {
        if (!tab.some(elt => elt[0] == i && elt[1] == j)) {
            tab.push([i, j]);
        }
        return tab;
    }
    if (i > 0 && parseInt(input[i - 1][j]) === (nb + 1)) tab = trail(i - 1, j, tab);
    if (j > 0 && parseInt(input[i][j - 1]) === (nb + 1)) tab = trail(i, j - 1, tab);
    if (i < input.length - 1 && parseInt(input[i + 1][j]) === (nb + 1)) tab = trail(i + 1, j, tab);
    if (j < input[i].length - 1 && parseInt(input[i][j + 1]) === (nb + 1)) tab = trail(i, j + 1, tab);
    return tab;
}

let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        if (input[i][j] === "0") result += trail(i, j, []).length;
    }
}

console.log(result);