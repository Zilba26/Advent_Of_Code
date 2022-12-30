const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    //.map((num) => num.split("| "));

module.exports = {
    input,
};

/*input = ["2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678"];*/

let result = 0;
L = [];

for (i = 0 ; i < input.length ; i++) {
    if (i == 0) {
        for (j = 0 ; j < input[0].length ; j++) {
            if (j == 0) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            } else if (j == input[0].length-1) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            } else {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            }
        }
    } else if (i == input.length-1) {
        for (j = 0 ; j < input[0].length ; j++) {
            if (j == 0) {
                if (input[i][j] < input[i-1][j] && input[i][j] < input[i][j+1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            } else if (j == input[0].length-1) {
                if (input[i][j] < input[i-1][j] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            } else {
                if (input[i][j] < input[i-1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            }
        }
        
    } else {
        for (j = 0 ; j < input[0].length ; j++) {
            if (j == 0) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i-1][j]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            } else if (j == input[0].length-1) {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j-1] && input[i][j] < input[i-1][j]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            } else {
                if (input[i][j] < input[i+1][j] && input[i][j] < input[i][j+1] && input[i][j] < input[i][j-1] && input[i][j] < input[i-1][j]) {
                    result += 1 + parseInt(input[i][j]);
                    L.push([i, j, input[i][j]]);
                }
            }
        }
    }
}

function include(L, M) {
    for (i of L) {
        let b = true;
        for (j in i) {
            if (i[j] != M[j]) {
                b = false;
            }
        }
        if (b) return true;
    }
    return false;
}


function estNine(i, j) {
    let B = [];
    const W = ["1","2","3","4","5","6","7","8","0"];
    try { 
        if (W.includes(input[i-1][j])) B.push([i-1, j]);
    } catch (error) {};
    try { 
        if (W.includes(input[i+1][j])) B.push([i+1, j]);
    } catch (error) {};
    try { 
        if (W.includes(input[i][j-1])) B.push([i, j-1]);
    } catch (error) {};
    try { 
        if (W.includes(input[i][j+1])) B.push([i, j+1]);
    } catch (error) {};    
    return B;
}

function clearCopy(L) {
    let N = [];
    for (let i = 0 ; i < L.length ; i++) {
        if (!include(N, L[i])) {
            N.push(L[i]);
        }
        console.log(i, L[i], L)
    }
    return N;
}

let M = [];
console.log(L);

for (k in L) {
    let N = [[...[L[k][0], L[k][1]]]];
    let O = [[...[L[k][0], L[k][1]]]];
    //console.log("N", N);

    //for (a = 0 ; a < 3 ; a++) {
    while (O.length != 0) {
        let P = []
        for (l of O) {
            let nNine = estNine(l[0], l[1]);
            //console.log("9", nNine);
            for (m of nNine) {
                //console.log("m", m);
                if (!include(N,m) && !include(P,m)) P.push(m);
            }            
        }
        O = [...P];
        N = N.concat(P);
        //console.log("N", N, "O", O, "----------------------------------------------------------------");
    }
    
    M.push(N.length);
    //console.log("N", N);
}

console.log("M", M);

let A = [M[0], M[1], M[2]]
for (h = 3 ; h < M.length ; h++) {
    let d = Math.min(A[0], Math.min(A[1],A[2]));
    if (M[h] > d) {
        A[M.indexOf(d)] = M[h];
    }
}

let a = Math.max(...M);
M.splice(M.indexOf(a),1);
let q = Math.max(...M);
M.splice(M.indexOf(q),1);
let c = Math.max(...M);

console.log("a", a);
console.log("b", q);
console.log("c", c);
console.log(a*q*c);