const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split(","));

module.exports = {
    input,
};

for (i in input) {
    input[i][1] = input[i][1].split(" -> ");
    input[i] = [parseInt(input[i][0]), parseInt(input[i][1][0]), parseInt(input[i][1][1]), parseInt(input[i][2])];
}


let L = [];
let M = [];
for (j = 0 ; j < 1000 ; j++) {
    M.push(0);  
}
for (i = 0 ; i < 1000 ; i++) {
    L.push([...M]);
}


for (k of input) {
    if (k[1] == k[3]) {
        for (l = Math.min(k[0], k[2]) ; l <= Math.max(k[0], k[2]) ; l++) {
            L[k[1]][l]++;
        }
    }
    if (k[0] == k[2]) {
        for (m = Math.min(k[1], k[3]) ; m <= Math.max(k[1], k[3]) ; m++) {
            L[m][k[0]]++;
        }
    }
}

let result = 0;

for (n of L) {
    for (o of n) {
        if (o >= 2) result++;
    }
}

console.log(result);

// <20000
// >215