const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(""));

module.exports = {
    input,
};

let arbres = new Set();

//gauche vers la droite
for (let i = 0; i < input.length; i++) {
    let maxSize = -1;
    for (let j = 0; j < input[i].length; j++) {
        if (parseInt(input[i][j]) > maxSize) {
            arbres.add(i.toString() + '-' + j.toString());
            maxSize = parseInt(input[i][j]);
        }
    }
}

//haut vers le bas
for (let i = 0; i < input[0].length; i++) {
    let maxSize = -1;
    for (let j = 0; j < input.length; j++) {
        if (parseInt(input[j][i]) > maxSize) {
            arbres.add(j.toString() + '-' + i.toString());
            maxSize = parseInt(input[j][i]);
        }
    }
}

//bas vers le haut
for (let i = 0; i < input[0].length; i++) {
    let maxSize = -1;
    for (let j = input.length - 1; j >= 0; j--) {
        if (parseInt(input[j][i]) > maxSize) {
            arbres.add(j.toString() + '-' + i.toString());
            maxSize = parseInt(input[j][i]);
        }
    }
}

//droite vers la gauche
for (let i = 0; i < input.length; i++) {
    let maxSize = -1;
    for (let j = input[i].length - 1; j >= 0; j--) {
        if (parseInt(input[i][j]) > maxSize) {
            arbres.add(i.toString() + '-' + j.toString());
            maxSize = parseInt(input[i][j]);
        }
    }
}

console.log(arbres.size);