const path = require('path');
const fs = require('fs');

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
    const a3 = parseInt(tab[2].split(',')[0].split('=')[1]);
    const b3 = parseInt(tab[2].split('=')[2]);
    
    //const y = (((a3 * b1) / a1) - b3) / (((b1 * a2) / a1) - b2);
    const u = (a3 * b1 - b3 * a1 ) * a1;
    const v = a1 * (b1 * a2 - b2 * a1);
    const y = u / v;
    const x = (a3 - y * a2) / a1;

    if (y > 0 && y % 1 === 0) {
        result += 3 * Math.round(x) + Math.round(y);
    }
}

console.log(result);