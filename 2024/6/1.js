const path = require('path');
const fs = require('fs');
const { table } = require('console');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim();

module.exports = {
    input,
};

const begin = input.split('').filter((elt) => [".", "#", "^"].includes(elt)).indexOf("^");

const map = input.split('\n').map((elt) => elt.split(''));

let guardPosition = [Math.floor(begin / map[0].length), begin % map[0].length];
let dir = "UP";
while (true) {
    map[guardPosition[0]][guardPosition[1]] = "X";
    try {
        switch (dir) {
            case "UP": 
                if (map[guardPosition[0] - 1][guardPosition[1]] == "#") {
                    dir = "RIGHT";
                } else {
                    guardPosition[0] -= 1;
                }
                break;
            case "DOWN":
                if (map[guardPosition[0] + 1][guardPosition[1]] == "#") {
                    dir = "LEFT";
                } else {
                    guardPosition[0] += 1;
                }
                break;
            case "RIGHT": 
                if (map[guardPosition[0]][guardPosition[1] + 1] == "#") {
                    dir = "DOWN";
                } else {
                    guardPosition[1] += 1;
                }
                break;
            case "LEFT": 
                if (map[guardPosition[0]][guardPosition[1] - 1] == "#") {
                    dir = "UP";
                } else {
                    guardPosition[1] -= 1;
                }
                break;
            default : throw Exception();
        }
    } catch {
        break;
    }
};

console.log(map.map(elt => elt.join("")).join("\n"));

const result = map.reduce(
    (accumulator, currentValue) => accumulator + currentValue.reduce (
        (accumulator2, currentValue2) => {
            if (currentValue2 === "X") accumulator2++;
            return accumulator2;
        },
        0
    ), 0,
  );

  console.log(result);