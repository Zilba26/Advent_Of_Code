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

input = [1163751742,1381373672, 2136511328, 3694931569, 7463417111, 1319128137, 1359912421, 3125421639, 1293138521, 2311944581].map(num => num.toString().split(""));

let M = [];
for (let i = 0 ; i < input[0].length ; i++) M.push(Infinity);
for (let i = 0 ; i < input.length ; i++) L.push([...M]);
L[0][0] = 0;

function chercheMin() {
    let min = Infinity;
    for (let i = 0 ; i < L.length ; i++) {
        for (let j = 0 ; j < L[i].length ; j++) {
            if (min > L[i][j]) min = L[i][j];
        }
    }
}


console.log(input);