const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split(" "));

module.exports = {
    input,
};

let profondeur = 0;
let horizontal = 0;
let cible = 0;

for (i of input) {
    switch (i[0]) {
        case "forward": 
            horizontal += parseInt(i[1]);
            profondeur += parseInt(i[1]) * cible;
            break;
        case "up": 
            cible -= parseInt(i[1]);
            break;
        case "down": 
            cible += parseInt(i[1]);
            break;
        default: console.log(i);
    }
}

console.log(profondeur * horizontal);