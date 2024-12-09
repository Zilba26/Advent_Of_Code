const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim();

module.exports = {
    input,
};

const regex = /mul\((\d+),(\d+)\)/g;

const searchRegex = /do\(\)|don't\(\)/g;
const commands = Array.from(input.matchAll(searchRegex)).map(match => ({
    command: match[0],
    index: match.index
  }));

let result = 0;
while ((match = regex.exec(input)) !== null) {
    const number1 = match[1]; // Premier nombre
    const number2 = match[2]; // Deuxième nombre
    const matchIndex = match.index;

    const lastCommand = commands.filter(cmd => cmd.index < matchIndex).at(-1);

    if (lastCommand == undefined || lastCommand == null || lastCommand.command === "do()") {
        result += number1 * number2;
    }
}

console.log(result);
