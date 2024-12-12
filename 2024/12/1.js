const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(''))

module.exports = {
    input,
};

function calcFencePrices(i, j) {
    const letter = input[i][j];
    let area = 1;
    let perimetre = 0;
    indexTreated.push(i + "-" + j);
    if (i > 0) {
        if (!indexTreated.includes((i-1) + "-" + j)) {
            const nextLetter = input[i-1][j];
            if (nextLetter === letter) {
                const [subArea, subPerimetre] = calcFencePrices(i - 1, j);
                area += subArea;
                perimetre += subPerimetre;
            } else perimetre++;
        } else {
            perimetre += input[i-1][j] === letter ? 0 : 1
        }
    } else perimetre++;
    if (j > 0) {
        if (!indexTreated.includes(i + "-" + (j-1))) {
            const nextLetter = input[i][j-1];
            if (nextLetter === letter) {
                const [subArea, subPerimetre] = calcFencePrices(i, j - 1);
                area += subArea;
                perimetre += subPerimetre;
            } else perimetre++;
        } else {
            perimetre += input[i][j-1] === letter ? 0 : 1
        }
    } else perimetre++;
    if (i < input.length - 1) {
        if (!indexTreated.includes((i+1) + "-" + j)) {
            const nextLetter = input[i+1][j];
            if (nextLetter === letter) {
                const [subArea, subPerimetre] = calcFencePrices(i + 1, j);
                area += subArea;
                perimetre += subPerimetre;
            } else perimetre++;
        } else {
            perimetre += input[i+1][j] === letter ? 0 : 1
        }
    } else perimetre++;
    if (j < input[i].length - 1) {
        if (!indexTreated.includes(i + "-" + (j+1))) {
            const nextLetter = input[i][j+1];
            if (nextLetter === letter) {
                const [subArea, subPerimetre] = calcFencePrices(i, j + 1);
                area += subArea;
                perimetre += subPerimetre;
            } else perimetre++;
        } else {
            perimetre += input[i][j+1] === letter ? 0 : 1
        }
    } else perimetre++;
    return [area, perimetre]
}

const indexTreated = [];
let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        if (!indexTreated.includes(i + "-" + j)) {
            const [area, perimetre] = calcFencePrices(i, j);
            result += area * perimetre;
            console.log("A region of " + input[i][j] + " plants with price " + area + " * " + perimetre);
        }
    }
}

console.log(result);