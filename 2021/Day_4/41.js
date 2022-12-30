const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

module.exports = {
    input,
};

let tirage = input[0].split(",");
input.splice(0,1);

for (i = 0 ; i < input.length ; i++) {
    if (input[i] == '') input.splice(i,1);
}

let L = [];
let a = -1;
for (i = 0 ; i < input.length ; i++) {
    let b = input[i].split(" ");
    for (j = 0 ; j < b.length ; j++) {
        if (b[j] == '') b.splice(j,1);
    }
    if (i%5 == 0) {
        L.push([b]);
        a++
    } else {
        L[a].push(b);
    }
}

/*let z = 0
for (i of L[66]) {
    for (j of i) {
        z+= parseInt(j)
    }
}
console.log("z", z)*/
console.log("l", L)
function bingo() {
    for (i in L) {
        for (j of L[i]) {
            if (j.join() == ['','','','',''].join()) return i;
        }
        for (j in L[i]) {
            if (L[i][0][j] == '' && L[i][1][j] == '' && L[i][2][j] == '' && L[i][3][j] == '' && L[i][4][j] == '') return i;
        }        
    }
    return -1;
}

let result = 0;

for (t of tirage) {
    //console.log(L[66])
    for (j in L) {
        for (k in L[j]) {
            for (l in L[j][k]) {
                if (L[j][k][l] == t) L[j][k][l] = "";
            }
        }
    }
    if (bingo() != -1) {
        result = t;
        break;
    }
}

let z = 0;
for (i of L[66]) {
    for (j of i) {
        if (j != "") z+= parseInt(j);
    }
}
console.log("z", z)


console.log(result);
console.log(bingo());