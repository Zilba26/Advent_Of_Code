const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split(''));

module.exports = {
    input,
};

function search(tab, i, j) {
    if (tab[i][j] != "A") return false;
    if (i < 1 || j < 1 || i >= tab.length - 1 || j >= tab[i].length - 1) return false;
    if (tab[i-1][j-1] === "M") {
        if (tab[i+1][j+1] != "S") return false;

        if (tab[i-1][j+1] === "M") {
            return tab[i+1][j-1] === "S";
        } else if (tab[i-1][j+1] === "S") {
            return tab[i+1][j-1] === "M";
        } else return false;
    } else if (tab[i-1][j-1] === "S")  {
        if (tab[i+1][j+1] != "M") return false;

        if (tab[i-1][j+1] === "M") {
            return tab[i+1][j-1] === "S";
        } else if (tab[i-1][j+1] === "S") {
            return tab[i+1][j-1] === "M";
        } else return false;
    } else return false;
}

let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        result += search(input, i, j);
    }
}

console.log(result);