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

// monkeys = [
//     new Monkey(
//         [79, 98],
//         (x) => x * 19,
//         (x) => x % 23 == 0,
//         2, 3
//     ),
//     new Monkey(
//         [54, 65, 75, 74],
//         (x) => x + 6,
//         (x) => x % 19 == 0,
//         2, 0
//     ),
//     new Monkey(
//         [79, 60, 97],
//         (x) => x * x,
//         (x) => x % 13 == 0,
//         1, 3
//     ),
//     new Monkey(
//         [74],
//         (x) => x + 3,
//         (x) => x % 17 == 0,
//         0, 1
//     ),
// ]

const itemsPasses = [];

monkeys.forEach((monkey) => {
    itemsPasses.push(0);
});
let canLog = true;
function printMonkeys(toPrint) {
    if (canLog) {
        console.log(toPrint);
    }
}

for (let i = 0; i < 20 ; i++) {
    for (let j = 0; j < monkeys.length; j++) {
        const monkey = monkeys[j];
        printMonkeys("Monkey " + j);
        const itemsSize = monkey.items.length;
        for (let k = 0; k < itemsSize ; k++) {
            let item = monkey.items.shift();
            printMonkeys("  Monkey inspects an item with a worry level of " + item + ".");
            itemsPasses[j]++;
            item = monkey.operation(item);
            printMonkeys("    Monkey performs operation. New worry level is " + item + ".");
            item = Math.floor(item / 3);
            printMonkeys("    Monkey gets bored with item. Worry level is divided by 3 to " + item + ".");
            if (monkey.test(item)) {
                printMonkeys("    Current worry level is divisible by X.")
                monkeys[monkey.ifTrue].items.push(item);
                printMonkeys("    Item with worry level " + item + " is thrown to monkey " + monkey.ifTrue + ".")
            } else {
                printMonkeys("    Current worry level is not divisible by X.")
                monkeys[monkey.ifFalse].items.push(item);
                printMonkeys("    Item with worry level " + item + " is thrown to monkey " + monkey.ifFalse + ".")
            }
        }
    }
    console.log("After round " + (i+1) + ", the monkeys are holding items with these worry levels:    ");
    monkeys.forEach((monkey, index) => {
        console.log("Monkey " + index + " : " + monkey.items);
    });
    canLog = false;
}

console.log(itemsPasses);

// > 11024
// < 96091
// < 70484