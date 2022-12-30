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
let M = [];
let a = -1;
for (i = 0 ; i < input.length ; i++) {
    let b = input[i].split(" ");
    for (j = 0 ; j < b.length ; j++) {
        if (b[j] == '') b.splice(j,1);
    }
    if (i%5 == 0) {
        L.push([b]);
        //M.push([b]);
        a++
    } else {
        L[a].push(b);
        //M[a].push(b);
    }
}

/*let z = 0
for (i of L[66]) {
    for (j of i) {
        z+= parseInt(j)
    }
}
console.log("z", z)*/

tirage = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
L = [
    [
        [22, 13, 17, 11,  0],
        [8,  2, 23,  4, 24],
        [21,  9, 14, 16,  7],
        [6, 10,  3, 18,  5],
        [1, 12, 20, 15, 19]
    ],
    [
        [14, 21, 17, 24,  4],
        [10, 16, 15,  9, 19],
        [18,  8, 23, 26, 20],
        [22, 11, 13,  6,  5],
        [ 2,  0, 12,  3,  7]
    ]
];


//console.log("l", L)
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

/*let somme = 0;
const n = bingo();
console.log(n);

for (i of M[n]) {
    for (j of i) somme += parseInt(j);
}*/

let z = 0;
for (i of L[1]) {
    for (j of i) {
        if (j != "") z+= parseInt(j);
    }
}
console.log("z", z)

console.log(result);
console.log(bingo());
console.log(L);