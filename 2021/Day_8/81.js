const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split("| "));

module.exports = {
    input,
};

let result = 0;
for (i of input) {
    for (j of i[1].split(" ")) {
        //console.log(j, j.length, result);
        if (j.length == 2 || j.length == 3 || j.length == 4 || j.length == 7) result++;
    }
}

console.log(result);

// > 197