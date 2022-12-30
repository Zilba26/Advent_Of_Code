const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n')

module.exports = {
    input,
};

class Monkey {
    constructor(items, operation, test, ifTrue, ifFalse) {
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }
}

let monkeys = [
    new Monkey(
        [71, 56, 50, 73],
        (x) => x * 11,
        (x) => x % 13 == 0,
        1, 7
    ),
    new Monkey(
        [70, 89, 82],
        (x) => x + 1,
        (x) => x % 7 == 0,
        3, 6
    ),
    new Monkey(
        [52, 95],
        (x) => x * x,
        (x) => x % 3 == 0,
        5, 4
    ),
    new Monkey(
        [94, 64, 69, 87, 70],
        (x) => x + 2,
        (x) => x % 19 == 0,
        2, 6
    ),
    new Monkey(
        [98, 72, 98, 53, 97, 51],
        (x) => x + 6,
        (x) => x % 5 == 0,
        0, 5
    ),
    new Monkey(
        [79],
        (x) => x + 7,
        (x) => x % 2 == 0,
        7, 0
    ),
    new Monkey(
        [77, 55, 63, 93, 66, 90, 88, 71],
        (x) => x * 7,
        (x) => x % 11 == 0,
        2, 4
    ),
    new Monkey(
        [54, 97, 87, 70, 59, 82, 59],
        (x) => x + 8,
        (x) => x % 17 == 0,
        1, 3
    ),
];

const itemsPasses = [];

monkeys.forEach((monkey) => {
    itemsPasses.push(0);
});

for (let i = 0; i < 10000 ; i++) {
    for (let j = 0; j < monkeys.length; j++) {
        const monkey = monkeys[j];
        const itemsSize = monkey.items.length;
        for (let k = 0; k < itemsSize ; k++) {
            let item = monkey.items.shift();
            itemsPasses[j]++;
            item = monkey.operation(item);
            if (monkey.test(item)) {
                monkeys[monkey.ifTrue].items.push(item);
            } else {
                monkeys[monkey.ifFalse].items.push(item);
            }
        }
    }
    const multiplyDiviseur = 13 * 7 * 3 * 19 * 5 * 2 * 11 * 17;
    for (let j = 0; j < monkeys.length; j++) {
        const monkey = monkeys[j];
        for (let k = 0; k < monkey.items.length; k++) {
            monkey.items[k] = monkey.items[k] % multiplyDiviseur;
        }
    }
}

console.log(itemsPasses);