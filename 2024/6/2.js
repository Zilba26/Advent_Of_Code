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

const baseMap = input.split('\n').map((elt) => elt.split(''));
let result = [];

for (let i = 0 ; i < baseMap.length ; i++) {
    for (let j = 0 ; j < baseMap[i].length ; j++) {
        const map = baseMap.map(elt => [...elt]);
        if (map[i][j] == "#") {
            continue;
        } else {
            map[i][j] = "#";
        }
        
        let guardPosition = [Math.floor(begin / map[0].length), begin % map[0].length];
        let dir = "UP";
        let index = 0;
        let lastDir = "UP";
        while (index < 20000 && guardPosition[0] < map.length && guardPosition[1] < map[0].length && guardPosition[0] >= 0 && guardPosition[1] >= 0) {
            index++;
            map[guardPosition[0]][guardPosition[1]] = "X";
            try {
                switch (dir) {
                    case "UP": 
                        if (map[guardPosition[0] - 1][guardPosition[1]] == "#") {
                            dir = "RIGHT";
                        } else {
                            guardPosition[0] -= 1;
                            lastDir = "UP";
                        }
                        break;
                    case "DOWN":
                        if (map[guardPosition[0] + 1][guardPosition[1]] == "#") {
                            dir = "LEFT";
                        } else {
                            guardPosition[0] += 1;
                            lastDir = "DOWN";
                        }
                        break;
                    case "RIGHT": 
                        if (map[guardPosition[0]][guardPosition[1] + 1] == "#") {
                            dir = "DOWN";
                        } else {
                            guardPosition[1] += 1;
                            lastDir = "RIGHT";
                        }
                        break;
                    case "LEFT": 
                        if (map[guardPosition[0]][guardPosition[1] - 1] == "#") {
                            dir = "UP";
                        } else {
                            guardPosition[1] -= 1;
                            lastDir = "LEFT";
                        }
                        break;
                    default : throw Exception();
                }
            } catch {
                break;
            }
        };
        if (index === 20000) {
            result.push([i,j]);
            //console.log([i,j])
            //console.log(map.map(elt => elt.join("")).join("\n"));
        }

    }
}

//console.log(result);
console.log(result.length);