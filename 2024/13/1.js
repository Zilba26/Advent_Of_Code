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
const epsilon = Math.pow(10, -10);

for (let machine of input) {
    const tab = machine.split('\n');
    const a1 = parseInt(tab[0].split(',')[0].split('+')[1]);
    const b1 = parseInt(tab[0].split('+')[2]);
    const a2 = parseInt(tab[1].split(',')[0].split('+')[1]);
    const b2 = parseInt(tab[1].split('+')[2]);
    const a3 = parseInt(tab[2].split(',')[0].split('=')[1]);
    const b3 = parseInt(tab[2].split('=')[2]);
    
    const y = (((a3 * b1) / a1) - b3) / (((b1 * a2) / a1) - b2);
    const x = (a3 - y * a2) / a1;

    if (y > 0 && Math.abs(y - Math.round(y)) < epsilon) {
        if (Math.abs(y - Math.round(y)) > epsilon) console.log("Alerte : ", x, y, x % 1, epsilon);
        result += 3 * Math.round(x) + Math.round(y);
    }
}

console.log(result);