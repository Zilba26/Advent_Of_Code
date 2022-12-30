const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', ''));

function snafuToDecimal(snafu) {
    let decimal = 0;
    let power = 0;
    for (let i = snafu.length - 1; i >= 0; i--) {
        let digit = snafu[i];
        if (digit === '-') {
            digit = -1;
        } else if (digit === '=') {
            digit = -2;
        } else {
            digit = parseInt(digit);
        }
        decimal += digit * Math.pow(5, power);
        power++;
    }
    return decimal;
}

function decimalToSnafu(decimal) {
    let snafu = '';
    while (decimal !== 0) {
        let digit = decimal % 5;
        if (digit === 4) {
            digit = '-';
            decimal = Math.round(decimal / 5);
        } else if (digit === 3) {
            digit = '=';
            decimal = Math.round(decimal / 5);
        } else {
            decimal = Math.floor(decimal / 5);
        }
        snafu = digit + snafu;
    }
    return snafu;
}

let result = 0;

for (let i = 0; i < input.length; i++) {
    let snafu = input[i];
    let decimal = snafuToDecimal(snafu);
    result += decimal;
}

console.log(result, decimalToSnafu(result));