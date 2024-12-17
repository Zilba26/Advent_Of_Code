const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

const registres = input[0].split('\n').map(elt => parseInt(elt.split(':')[1]));
const program = input[1].split(':')[1].trim().split(',').map(elt => parseInt(elt));
let output = "";

for (let i = 0 ; i < program.length ; i+=2) {
    const instruction = program[i];
    const operand = program[i+1];
    let operandCombo;
    if (operand < 0 || operand > 6) throw new Error('Invalid operand');
    if (operand <= 3) operandCombo = operand
    else operandCombo = registres[operand - 4];

    switch (instruction) {
        case 0: {
            registres[0] = registres[0] / Math.pow(2, operand);
            break;
        }
        case 1: {
            registres[1] = registres[1] ^ operand;
            break;
        }
        case 2: {
            registres[1] = operandCombo % 8;
            break;
        }
        case 3: {
            if (registres[0] != 0) {

            }
            break;
        }
        case 4: {
            registres[1] = registres[1] ^ registres[1];
            break;
        }
        case 5: {
            if (output != '') output += ",";
            output += operandCombo % 8;
            break;
        }
        case 6: {
            registres[1] = registres[0] / Math.pow(2, operand);
            break;
        }
        case 7: {
            registres[2] = registres[0] / Math.pow(2, operand);
            break;
        }
        default: throw new Error('Invalid instruction');
    }

    console.log(registres.map((elt, index) => "Registre " + (index+1) + ": " + elt).join('\n'), '\n');
}

console.log(output);