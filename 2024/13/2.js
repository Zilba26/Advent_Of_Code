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
const epsilon = Math.pow(10, -10);

function test(a1,a2,a3,x,y) {
    return x * a1 + y * a2 === a3;
}

for (let machine of input) {
    const tab = machine.split('\n');
    const a1 = parseInt(tab[0].split(',')[0].split('+')[1]);
    const b1 = parseInt(tab[0].split('+')[2]);
    const a2 = parseInt(tab[1].split(',')[0].split('+')[1]);
    const b2 = parseInt(tab[1].split('+')[2]);
    const a3 = parseInt(tab[2].split(',')[0].split('=')[1]) + 10000000000000;
    const b3 = parseInt(tab[2].split('=')[2]) + 10000000000000;

    const yTemp = (new Decimal(a3 * b1).dividedBy(a1).minus(b3)).dividedBy(new Decimal(b1 * a2).dividedBy(a1).minus(b2));
    const xTemp = new Decimal(a3 - yTemp * a2).dividedBy(a1);
    if (xTemp > 0 && yTemp > 0 && yTemp % 1 == 0 && xTemp % 1 == 0) {
        result += 3 * parseInt(xTemp) + parseInt(yTemp);
    }
    const y = (((a3 * b1) / a1) - b3) / (((b1 * a2) / a1) - b2);
    //console.log(yTemp, y);
    const x = (a3 - y * a2) / a1;
    
    let yes = false;
    if (x > 0 && y > 0 && test(a1, a2, a3, Math.round(x), Math.round(y))) {
        //result += 3 * Math.round(x) + Math.round(y);
        yes = true;
    }

    if (y > 0 && Math.abs(y - Math.round(y)) < epsilon && Math.abs(x - Math.round(x)) < epsilon) {
        if (Math.abs(x - Math.round(x)) > epsilon) console.log("Alerte : ", x, y, x % 1, epsilon);
       
    } else if (yes) {
        console.log("alerte");
        //console.log(x, y, Math.abs(y - Math.round(y)), yTemp)
    }
}

console.log(result);

// > 70103715469585
// > 70025590469496
// < 102334003088601
// ! 102255878088503