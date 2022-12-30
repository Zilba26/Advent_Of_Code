let M = [2,5,4,8,3,9];

let A = [M[0], M[1], M[2]]
for (h = 3 ; h < M.length ; h++) {
    let d = Math.min(A[0], Math.min(A[1],A[2]));
    console.log("d", d, "h", h);
    if (M[h] > d) {
        A[M.indexOf(d)] = M[h];
    }
    console.log("A", A);
}

console.log(A);