const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('')

module.exports = {
    input,
};

let tab = input.slice(0, 4);

for (let i = 0; i < input.length; i++) {
    tab.shift();
    tab.push(input[i]);
    if (verifTab(tab)) {
        console.log(i + 1);
        break;
    }
}

//verifier qu'il n'y a pas 2 fois le même caractère dans le tableau
function verifTab(tab) {
    for (let i = 0; i < tab.length; i++) {
        for (let j = i + 1; j < tab.length; j++) {
            if (tab[i] === tab[j]) {
                return false;
            }
        }
    }
    return true;    
}

console.log(input);