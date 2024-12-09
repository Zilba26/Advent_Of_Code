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
    const copy = [...order];
    copy.sort((a, b) => {
      const rule = rules.find((rule) => rule === `${a}|${b}` || rule === `${b}|${a}`);
      if (rule) {
        return rule === `${a}|${b}` ? -1 : 1;
      } else {
        console.log("WARNING: No rule found for", a, b);
        return 0;
      }
    });
    if (copy.join(',') != order.join(',')) {
      result.push(copy[(copy.length - 1) / 2]);
    }
}

console.log(result);
console.log(result.reduce((acc, val) => acc + parseInt(val), 0));