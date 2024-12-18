const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(',').map(elt => parseInt(elt)));

const mapLength = 7;
const map = Array.from({ length: mapLength }, () => Array.from({ length: mapLength }, () => "."));

for (let i = 0 ; i < 12 ; i++) {
    const coord = input[i];
    map[coord[1]][coord[0]] = "#";
}

function findNextPaths(path) {
    const lastPoint = path[path.length - 1];
    let tab = [];
    if (lastPoint[0] > 0 && map[lastPoint[0] - 1][lastPoint[1]] === "."
        && !path.some(p => p[0] === lastPoint[0] - 1 && p[1] === lastPoint[1])) {
            tab.push([...path, [lastPoint[0] - 1, lastPoint[1]]]);
    }
    if (lastPoint[0] < map.length - 1 && map[lastPoint[0] + 1][lastPoint[1]] === "."
        && !path.some(p => p[0] === lastPoint[0] + 1 && p[1] === lastPoint[1])) {
            tab.push([...path, [lastPoint[0] + 1, lastPoint[1]]]);
    }
    if (lastPoint[1] > 0 && map[lastPoint[0]][lastPoint[1] - 1] === "."
        && !path.some(p => p[0] === lastPoint[0] && p[1] === lastPoint[1] - 1)) {
            tab.push([...path, [lastPoint[0], lastPoint[1] - 1]]);
    }
    if (lastPoint[1] < map[0].length - 1 && map[lastPoint[0]][lastPoint[1] + 1] === "."
        && !path.some(p => p[0] === lastPoint[0] && p[1] === lastPoint[1] + 1)) {
            tab.push([...path, [lastPoint[0], lastPoint[1] + 1]]);
    }
    return tab;
}

let paths = [[[0,0]]];
let resultPaths = undefined;

while (resultPaths == undefined && paths.length > 0) {
    const tab = [];
    for (let path of paths) {
        const nextPaths = findNextPaths(path);
        for (let nextPath of nextPaths) {
            const lastPoint = nextPath[nextPath.length - 1];
            if (lastPoint[0] === input.length - 1 && lastPoint[1] === input[input.length-1].length - 1) {
                resultPaths = nextPath;
                break;
            } else {
                tab.push(nextPath);
            }
        }
        if (resultPaths != undefined) break;
    }
    paths = tab;
    console.log(JSON.stringify(paths), '\n')
}

console.log(map.map(elt => elt.join('')).join('\n'));
console.log(resultPaths);