const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', '').split(' '));

module.exports = {
    input,
};

let cycles = 0;
let X = 1;
const tab = [["#"]];
const cyclesToRegister = [0, 40, 80, 120, 160, 200];
let indexOfTab = 0;

for (let i = 0; i < input.length; i++) {
    const instruction = input[i];

    if (instruction[0] == "noop") {
        cycles++;
        checkCycle();
    } else {
        const nb = parseInt(instruction[1]);
        cycles++;
        checkCycle();
        X += nb;
        cycles++;
        checkCycle();
    }
}

function checkCycle() {
    if (cyclesToRegister.includes(cycles)) {
        indexOfTab++;
        tab.push([]);
    }
    if (Math.abs(X - cycles % 40) <= 1) {
        tab[indexOfTab].push("#");
    } else {
        tab[indexOfTab].push(".");
    }
}

tab.forEach((line) => console.log(line.join("")));