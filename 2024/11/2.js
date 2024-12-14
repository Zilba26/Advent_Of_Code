const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split(' ')

module.exports = {
    input,
};

let result = new Map();
for (let stone of input) {
    result.set(stone, (result.get(stone) || 0) + 1);
}
const blinks = 75;

for (let i = 0 ; i < blinks ; i++) {
    const map = new Map();
    result.forEach((value, key) => {
        if (key == "0") {
            map.set("1", (map.get("1") || 0) + value);
        } else if (key.length % 2 === 0) {
            const [first, second] = [key.substring(0, key.length / 2), key.substring(key.length / 2)];
            const [firstToInt, secondToInt] = [parseInt(first).toString(), parseInt(second).toString()];
            map.set(firstToInt, (map.get(firstToInt) || 0) + value);
            map.set(secondToInt, (map.get(secondToInt) || 0) + value);
        } else {
            const nb = parseInt(key) * 2024;
            map.set(nb.toString(), (map.get(nb.toString()) || 0) + value);
        }
    });
    result = map;
}

let sum = 0;
result.forEach((value, key) => {
    sum += value;
});
console.log(sum);