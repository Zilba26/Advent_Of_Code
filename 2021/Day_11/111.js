const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split(""));

module.exports = {
    input,
};

//input = [[5,4,8,3,1,4,3,2,2,3],[2,7,4,5,8,5,4,7,1,1], [5,2,6,4,5,5,6,1,7,3], [6,1,4,1,3,3,6,1,4,6], [6,3,5,7,3,8,5,4,7,8], [4,1,6,7,5,2,4,6,4,5], [2,1,7,6,8,4,1,7,2,1], [6,8,8,2,8,8,1,1,3,4], [8,4,6,8,4,8,5,5,4], [5,2,8,3,7,5,1,5,2,6]]

//console.log(input);

function plusOne(i,j) {
    try {
        if (input[i][j-1] != 0 && input[i][j-1] != undefined) input[i][j-1]++;
        //console.log("1", i,j-1,input[i][j-1])
    } catch {}
    try {
        if (input[i][j+1] != 0 && input[i][j+1] != undefined) input[i][j+1]++;
        //console.log("2", i,j+1,input[i][j+1])
    } catch {}
    try {
        if (input[i+1][j] != 0 && input[i+1][j] != undefined) input[i+1][j]++;
        //console.log("3", i+1,j,input[i+1][j])
    } catch {}
    try {
        if (input[i-1][j] != 0 && input[i-1][j] != undefined) input[i-1][j]++;
        //console.log("4", i-1,j-1,input[i-1][j-1])
    } catch {}
    try {
        if (input[i+1][j-1] != 0 && input[i+1][j-1] != undefined) input[i+1][j-1]++;
        //console.log("5", i+1,j-1,input[i+1][j-1])
    } catch {}
    try {
        if (input[i+1][j+1] != 0 && input[i+1][j+1] != undefined) input[i+1][j+1]++;
        //console.log("6", i+1,j+1,input[i+1][j+1])
    } catch {}
    try {
        if (input[i-1][j+1] != 0 && input[i-1][j+1] != undefined) input[i-1][j+1]++;
        //console.log("7", i-1,j+1,input[i-1][j+1])
    } catch {}
    try {
        if (input[i-1][j-1] != 0 && input[i-1][j-1] != undefined) input[i-1][j-1]++;
        //console.log("8", i-1,j-1,input[i-1][j-1])
    } catch {}
}

function compteZeros() {
    let r = 0
    for (f of input) {
        for (g of f) {
            if (g == 0) r++;
        }
    }
    return r;
}

let result = 0

while (compteZeros(input) != 100) {
    for (j in input) {
        for (k in input[j]) input[j][k]++
    }

    let b = false;

    do {
        b = false;
        //console.log("test", input.map(elt => elt.join("")));
        for (j in input) {
            for (k in input[j]) {
                if (input[j][k] > 9) {
                    input[j][k] = 0;
                    plusOne(Number(j), Number(k));
                    //console.log("j", j, "k", k, input);
                    b = true;
                }
            }
        }
    } while (b)

    //result += compteZeros(input);
    result++;
    console.log(result);
}

console.log(result);

// < 1806