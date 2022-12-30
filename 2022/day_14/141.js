const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', '').split(' -> '));

module.exports = {
    input,
};

const tabSize = 1000;

const tab = [];
for (let i = 0; i < tabSize; i++) {
    const tabTemp = [];
    for (let j = 0; j < tabSize; j++) {
        tabTemp.push('.');
    }
    tab.push(tabTemp);
}

for (let i = 0 ; i < input.length; i++) {
    const chemin = input[i];
    for (let j = 0; j < chemin.length - 1; j++) {
        let [x1, y1] = chemin[j].split(',');
        let [x2, y2] = chemin[j + 1].split(',');
        [x1, y1, x2, y2] = [parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2)];
        for (let k = Math.min(x1, x2); k <= Math.max(x1, x2); k++) {
            for (let l = Math.min(y1, y2); l <= Math.max(y1, y2); l++) {
                tab[l][k] = '#';
            }
        }
    }
}

let sable = [0, 500];
let verifNotInfinite = 0;
let result = 0;

while (sable[0] < tab.length - 1 && verifNotInfinite < 10000) {
    verifNotInfinite++;
    let stuck = false;
    sable = [0, 500];
    while(!stuck && sable[0] < tab.length - 1) {
        if (tab[sable[0] + 1][sable[1]] === '.') {
            sable[0]++;
        } else if (tab[sable[0] + 1][sable[1] - 1] === '.') {
            sable[0]++;
            sable[1]--;
        } else if (tab[sable[0] + 1][sable[1] + 1] === '.') {
            sable[0]++;
            sable[1]++;
        } else {
            stuck = true;
            tab[sable[0]][sable[1]] = 'o';
            result++;
        }
    } 
}

if (verifNotInfinite >= 10000) console.log('infinite');

//tab.forEach(elt => console.log(elt.slice(494, 504).join('')));
console.log(result);
