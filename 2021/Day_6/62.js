const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split(',')
    .map((num) => parseInt(num));

module.exports = {
    input,
};
let a = 0
let L = [0,0,0,0,0,0,0,0,0];

//initialise L

for (i of input) {
    L[i]++;
}

console.log(L);

function changeDay() {
    let a = L[0]
    for (j in L) {
        if (j != 0) {
            L[j-1] = L[j];
        }
    }
    L[8] = a;
    L[6] += a;
}

for (k = 0 ; k < 256 ; k++) {
    changeDay();
}
/*changeDay();
console.log("L", L);
changeDay();
console.log("L", L);
changeDay();
console.log("L", L);*/

let result = 0;
for (l of L) {
    console.log("l", l);
    result += l;
}

//console.log("L", L)

console.log("result", result);

// >188344611300