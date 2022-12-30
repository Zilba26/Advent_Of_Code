const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(" "))

module.exports = {
    input,
};

const tailPositions = new Set();

const knotsPosition = [];
for (let i = 0 ; i < 10 ; i++) {
    knotsPosition.push({line: 10000, column: 10000});
}

function moveKnots(knotToMovePosition, knotInFrontPosition) {
    const lineDifference = knotInFrontPosition.line - knotToMovePosition.line;
    const columnDifference = knotInFrontPosition.column - knotToMovePosition.column;
    if (lineDifference == 0 && columnDifference == 2) {
        return {line: 0, column:  + 1};
    } else if ((lineDifference == 1 && columnDifference == 2) || (lineDifference == 2 && columnDifference == 1) || (lineDifference == 2 && columnDifference == 2)) {
        return {line:  + 1, column:  + 1};
    } else if (lineDifference == 2 && columnDifference == 0) {
        return {line:  + 1, column: 0};
    } else if ((lineDifference == 2 && columnDifference == -1) || (lineDifference == 1 && columnDifference == -2) || (lineDifference == 2 && columnDifference == -2)) {
        return {line:  + 1, column:  - 1};
    } else if (lineDifference == 0 && columnDifference == -2) {
        return {line: 0, column:  - 1};
    } else if ((lineDifference == -1 && columnDifference == -2) || (lineDifference == -2 && columnDifference == -1) || (lineDifference == -2 && columnDifference == -2)) {
        return {line:  - 1, column:  - 1};
    } else if (lineDifference == -2 && columnDifference == 0) {
        return {line:  - 1, column: 0};
    } else if ((lineDifference == -2 && columnDifference == 1) || (lineDifference == -1 && columnDifference == 2) || (lineDifference == -2 && columnDifference == 2)) {
        return {line:  - 1, column:  + 1};
    } else if (Math.abs(lineDifference) < 2 && Math.abs(columnDifference) < 2) {
        return {line: 0, column: 0};
    } else {
        console.log("ERROR lineDifference = " + lineDifference + " columnDifference = " + columnDifference);
    }
}


for (let i = 0 ; i < input.length ; i++) {
    const direction = input[i][0];
    const nbPas = input[i][1];

    let line = 0;
    let column = 0;
    switch (direction) {
        case "L":
            column = -1;
            break;
        case "R":
            column = 1;
            break;
        case "U":
            line = -1;
            break;
        case "D":
            line = 1;
            break;
        default:
            console.log("ERROR direction = " + direction);
    }

    for (let j = 0 ; j < nbPas ; j++) {
        for (let k = 0 ; k < knotsPosition.length ; k++) {
            if (k == 0) {
                knotsPosition[k].line += line;
                knotsPosition[k].column += column;
            } else {
                const newPosition = moveKnots(knotsPosition[k], knotsPosition[k-1]);
                knotsPosition[k].line += newPosition.line;
                knotsPosition[k].column += newPosition.column;
            }
        }
        tailPositions.add(knotsPosition[knotsPosition.length - 1].line.toString() + "-" + knotsPosition[knotsPosition.length - 1].column.toString());
    }
}

console.log(tailPositions.size);