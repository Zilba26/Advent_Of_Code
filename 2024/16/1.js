const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(''));

const S = [input.length - 2, 1];
const E = [1, input[1].length - 2];

function findNextPaths(path) {
    const lastPoint = path[path.length - 1];
    let tab = [];
    if ([".", "E"].includes(input[lastPoint[0] - 1][lastPoint[1]])
        && !path.some(p => p[0] === lastPoint[0] - 1 && p[1] === lastPoint[1])) {
            tab.push([...path, [lastPoint[0] - 1, lastPoint[1]]]);
    }
    if ([".", "E"].includes(input[lastPoint[0] + 1][lastPoint[1]])
        && !path.some(p => p[0] === lastPoint[0] + 1 && p[1] === lastPoint[1])) {
            tab.push([...path, [lastPoint[0] + 1, lastPoint[1]]]);
    }
    if ([".", "E"].includes(input[lastPoint[0]][lastPoint[1] - 1])
        && !path.some(p => p[0] === lastPoint[0] && p[1] === lastPoint[1] - 1)) {
            tab.push([...path, [lastPoint[0], lastPoint[1] - 1]]);
    }
    if ([".", "E"].includes(input[lastPoint[0]][lastPoint[1] + 1])
        && !path.some(p => p[0] === lastPoint[0] && p[1] === lastPoint[1] + 1)) {
            tab.push([...path, [lastPoint[0], lastPoint[1] + 1]]);
    }
    return tab;
}

let paths = [[S]];
let resultPaths = [];
let stopConditionIfPathIsTooLong = false;

while (paths.length > 0) {
    const tab = [];
    for (let path of paths) {
        const nextPaths = findNextPaths(path);
        for (let nextPath of nextPaths) {
            const lastPoint = nextPath[nextPath.length - 1];
            if (input[lastPoint[0]][lastPoint[1]] === "E") {
                resultPaths.push(nextPath);
            } else {
                stopConditionIfPathIsTooLong = nextPath.length > 100
                tab.push(nextPath);
            }
        }
    }
    if (stopConditionIfPathIsTooLong) break;
    paths = tab;
}

const pathsValue = resultPaths.map(resultPath => {
    let result = 0;
    let lastDir = 'H';
    let copy = JSON.parse(JSON.stringify(input));

    for (let i = 0 ; i < resultPath.length - 1 ; i++) {
        copy[resultPath[i][0]][resultPath[i][1]] = "O";
        const dir = resultPath[i][0] == resultPath[i+1][0] ? 'H' : 'V';
        result++;
        if (lastDir != dir) {
            result += 1000
        }
        lastDir = dir;
    }

    //console.log(result);
    //console.log(copy.map(elt => elt.join('')).join('\n'));
    return result;
})

//console.log(pathsValue);
console.log(pathsValue.reduce((acc, value) => value < acc ? value : acc, Infinity));
