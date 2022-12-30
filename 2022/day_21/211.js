const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', ''))

class Monkey {
    constructor(name, number = undefined, firstMonkey = null, secondMonkey = null, operation = null) {
        this.name = name;
        this.number = number;
        this.firstMonkey = firstMonkey;
        this.secondMonkey = secondMonkey;
        this.operation = operation;
    }

    setNumber() {
        this.setMonkeys();
        if (typeof this.firstMonkey == 'number' && typeof this.secondMonkey == 'number') {
            switch (this.operation) {
                case '+':
                    this.number = this.firstMonkey + this.secondMonkey;
                    break;
                case '*':
                    this.number = this.firstMonkey * this.secondMonkey;
                    break;
                case '-':
                    this.number = this.firstMonkey - this.secondMonkey;
                    break;
                case '/':
                    this.number = this.firstMonkey / this.secondMonkey;
                    break;
                default:
                    throw new Error('Operation not found');
            }
        }
    }

    setMonkeys() {
        if (typeof this.firstMonkey == 'string') {
            const fm = monkeyNumber.get(this.firstMonkey);
            if (fm != undefined) this.firstMonkey = fm;
        }
        if (typeof this.secondMonkey == 'string') {
            const sm = monkeyNumber.get(this.secondMonkey);
            if (sm != undefined) this.secondMonkey = sm;
        }
    }
}

const tab = [];
const monkeyNumber = new Map();

for (let i = 0 ; i < input.length ; i++) {
    const monkey = input[i];
    const name = monkey.slice(0, 4);
    const number = parseInt(monkey.split(' ')[1]);
    if (number.toString() != 'NaN') {
        monkeyNumber.set(name, number);
    } else {
        const firstMonkey = monkey.split(' ')[1];
        const operation = monkey.split(' ')[2];
        const secondMonkey = monkey.split(' ')[3];
        tab.push(new Monkey(name, undefined, firstMonkey, secondMonkey, operation));
    }
}

let notInfiniteLoop = 0;
const maxLoop = 10000;
let result = -1;

while (notInfiniteLoop < maxLoop) {
    notInfiniteLoop++;
    for (let i = 0 ; i < tab.length ; i++) {
        const monkey = tab[i];
        monkey.setNumber();
        if (monkey.number != undefined) {
            if (monkey.name == "root") {
                result = monkey.number;
                break;
            } else {
                monkeyNumber.set(monkey.name, monkey.number);
            }
        }
    }
    if (result != -1) break;
}

if (notInfiniteLoop == maxLoop) console.log("Infinite loop");

console.log(result);