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
let cyclesToRegister = [20, 60, 100, 140, 180, 220];
let result = 0;

for (let i = 0; i < input.length; i++) {
    const instruction = input[i];

    if (instruction[0] == "noop") {
        cycles++;
        registerCycle();
    } else {
        const nb = parseInt(instruction[1]);
        cycles++;
        registerCycle();
        cycles++;
        registerCycle();
        X += nb;
    }
}

function registerCycle() {
    if (cyclesToRegister.includes(cycles)) {
        result += X * cycles;
    }
}

console.log(result);