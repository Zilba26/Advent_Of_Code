const path = require('path');
const fs = require('fs');
const Decimal = require('decimal.js');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

module.exports = {
    input,
};

let result = 0;

for (let machine of input) {
    const tab = machine.split('\n');
    const a1 = parseInt(tab[0].split(',')[0].split('+')[1]);
    const b1 = parseInt(tab[0].split('+')[2]);
    const a2 = parseInt(tab[1].split(',')[0].split('+')[1]);
    const b2 = parseInt(tab[1].split('+')[2]);
    const a3 = parseInt(tab[2].split(',')[0].split('=')[1]) + 10000000000000;
    const b3 = parseInt(tab[2].split('=')[2]) + 10000000000000;

    const u = (a3 * b1 - b3 * a1 ) * a1;
    const v = a1 * (b1 * a2 - b2 * a1);
    const y = u / v;
    const x = (a3 - y * a2) / a1;
    if (Math.abs(y - Math.round(y)) < 0.001 && Math.abs(y - Math.round(y)) > 0) {
        console.log("Alerte", a1,b1,a2,b2,a3,b3, x, y);
        console.log(Math.round(x) * a1 + Math.round(y) * a2, a3);
    }
    
    if (y > 0 && Math.abs(y - Math.round(y)) < 0.001 && x > 0 && Math.abs(x - Math.round(x)) < 0.001) {
        //console.log(x, y);
        result += 3 * Math.round(x) + Math.round(y);
    }
}

console.log(result);

// > 70103715469585
// > 70025590469496
// < 102334003088601
// = 102255878088512
// ! 102255878088503
// ! 97777063146393
// ! 97698938146304