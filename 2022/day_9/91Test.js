const path = require('path');
const fs = require('fs');
const { dir } = require('console');

let input = fs
    .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

module.exports = {
    input,
};

const tabSize = 6;

const tailPositions = new Set();
const tab = [];
for (let i = 0 ; i < tabSize ; i++) {
    const tabTemp = [];
    for (let j = 0 ; j < tabSize ; j++) {
        tabTemp.push(undefined);
    }
    tab.push(tabTemp);
}

let headPosition = {line: tabSize/2, column: tabSize/2};
headPosition = {line: tabSize - 1, column: 0};
let tailPosition = {line: undefined, column: undefined};
tab[headPosition.line][headPosition.column] = "H"; //start head position


for (let i = 0 ; i < input.length ; i++) {
    const direction = input[i][0];
    const nbPas = input[i][2];
    console.log(input[i]);

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
        headPosition.line += line;
        headPosition.column += column;
        //console.log("headPosition = " + headPosition.line + " " + headPosition.column)
        tab[headPosition.line][headPosition.column] = "H";
        if (i == 0 && j == 0) {
            tab[headPosition.line - line][headPosition.column - column] = "T";
            tailPositions.add((headPosition.line - line).toString() + "-" + (headPosition.column - column).toString());
            tailPosition.line = headPosition.line - line;
            tailPosition.column = headPosition.column - column;
        } else {
            if (Math.abs(headPosition.line - tailPosition.line) == 2 || Math.abs(headPosition.column - tailPosition.column) == 2) {
                tab[headPosition.line - line][headPosition.column - column] = "T";
                tailPositions.add((headPosition.line - line).toString() + "-" + (headPosition.column - column).toString());
                tailPosition.line = headPosition.line - line;
                tailPosition.column = headPosition.column - column;
            }
        }
        printVisu();
    }
}



function printVisu() {
    const tabVisu = [];
    for (let i = 0 ; i < tabSize ; i++) {
        const tabTemp = [];
        for (let j = 0 ; j < tabSize ; j++) {
            tabTemp.push("_");
        }
        tabVisu.push(tabTemp);
    }

    tailPositions.forEach((tailPosition) => {
        tabVisu[tailPosition[0]][tailPosition[2]] = "#";
    });
    tabVisu[headPosition.line][headPosition.column] = "H";
    if (tailPosition.line != undefined) tabVisu[tailPosition.line][tailPosition.column] = "T";
    console.log(tabVisu);
}

printVisu();
console.log(tailPositions);
console.log(tailPositions.size);