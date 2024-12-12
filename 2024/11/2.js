const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split(' ')

module.exports = {
    input,
};

let result = [...input];
const blinks = 75;

for (let i = 0 ; i < blinks ; i++) {
    console.log(i);
    const tab = [];
    for (let j = 0 ; j < result.length ; j++) {
        const nb = result[j];
        if (nb === "0") {
            tab.push("1")
        } else if (nb.length % 2 === 0) {
            tab.push(nb.substring(0, nb.length / 2));
            tab.push(parseInt(nb.substring(nb.length / 2)).toString());
        } else {
            tab.push((parseInt(nb) * 2024).toString());
        }
    }
    result = tab;
}

console.log(result.length);