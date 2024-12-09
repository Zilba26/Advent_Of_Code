const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

const rules = input[0].split('\n');
const updates = input[1].split('\n');
let result = [];

for (let update of updates) {
    const order = update.split(',');
    let correct = true;
    for (let i = 0; i < order.length - 1; i++) {
        const before = order[i];
        for (let j = i + 1; j < order.length; j++) {
            const after = order[j];
            if (rules.find((rule) => rule === `${before}|${after}`)) {
              continue;
            } else if (rules.find((rule) => rule === `${after}|${before}`)) {
              correct = false;
              break;
            } else {
              console.log("WARNING: No rule found for", before, after);
            }
        }
        if (!correct) break;
    }
    if (correct) result.push(order[(order.length - 1) / 2]);
}

console.log(result);
console.log(result.reduce((acc, val) => acc + parseInt(val), 0));