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

    copy() {
        return new Monkey(this.name, this.number, this.firstMonkey, this.secondMonkey, this.operation);
    }

    setNumber(monkeyNumberCopy) {
        this.setMonkeys(monkeyNumberCopy);
        if (typeof this.firstMonkey == 'number' && typeof this.secondMonkey == 'number') {
            if (this.name == "root") {
                this.number = (this.firstMonkey === this.secondMonkey);
            } else {
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
            };
            
        }
    }

    setMonkeys(monkeyNumberCopy) {
        if (typeof this.firstMonkey == 'string') {
            const fm = monkeyNumberCopy.get(this.firstMonkey);
            if (fm != undefined) this.firstMonkey = fm;
        }
        if (typeof this.secondMonkey == 'string') {
            const sm = monkeyNumberCopy.get(this.secondMonkey);
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
const maxLoop = 10000000;
let result = -1;

for (let i = 0 ; i < 100000 ; i++) {
    const monkeyNumberCopy = new Map(monkeyNumber);
    monkeyNumberCopy.set('humn', i)
    const tabCopy = tab.map((monkey) => monkey.copy());
    let canBreak = false;
    while (notInfiniteLoop < maxLoop) {
        notInfiniteLoop++;
        for (let j = 0 ; j < tabCopy.length ; j++) {
            const monkey = tabCopy[j];
            monkey.setNumber(monkeyNumberCopy);
            if (monkey.number != undefined) {
                if (monkey.name == "root") {
                    if (monkey.number) {
                        if (result != -1) console.log("Result already found", result);
                        result = i;
                        console.log(i);
                    }
                    canBreak = true;
                    break;
                } else {
                    monkeyNumberCopy.set(monkey.name, monkey.number);
                }
            }
        }
        if (canBreak) break;
    }
}

if (notInfiniteLoop == maxLoop) console.log("Infinite loop");

// console.log(tab);
// console.log('\n\n\n')
// console.log(monkeyNumber);
console.log(result);