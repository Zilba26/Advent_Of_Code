const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n')
    .map((line) => line.replace('\r', '').split('\n').map(elt => JSON.parse(elt)));
    
// input = fs
//     .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
//     .toString()
//     .trim()
//     .split('\r\n\r\n')
//     .map((line) => line.replace('\r', '').split('\n').map(elt => JSON.parse(elt)));

module.exports = {
    input,
};

let result = [];

for (let i = 0; i < input.length; i++) {
    const firstList = input[i][0];
    const secondList = input[i][1];
    if (compare(firstList, secondList) != false) {
        result.push(i + 1);
    }
    //console.log("\n");
}

function compare(firstList, secondList) {
    //console.log("Compare", firstList, " and ", secondList);
    for (let i = 0; i < firstList.length; i++) {
        const first = firstList[i];
        const second = secondList[i];
        if (first == undefined) throw new Error("Error", first, " and ", second);
        if (second == undefined) return false;
        if (typeof first === 'number' && typeof second === 'number') {
            //console.log("Compare", first, " and ", second);
            if (first < second) {
                return true;
            } else if (first > second) {
                return false;
            }
        } else if (typeof first === 'object' && typeof second === 'object') {
            const compareResult = compare(first, second);
            if (compareResult == true || compareResult == false) {
                return compareResult;
            }
        } else if (typeof first === 'number' && typeof second === 'object') {
            //console.log("Compare", first, " and ", second);
            const compareResult = compare([first], second);
            if (compareResult == true || compareResult == false) {
                return compareResult;
            }
        } else if (typeof first === 'object' && typeof second === 'number') {
            //console.log("Compare", first, " and ", second);
            const compareResult = compare(first, [second]);
            if (compareResult == true || compareResult == false) {
                return compareResult;
            }
        } else {
            throw new Error("Error", first, " and ", second);
        }
    }
    //console.log("Plus d'item dans liste 1: ", firstList, " and ", secondList);

    //2 cas, 2 listes pareil => return null ou liste 1 plus d'item => return true
    return firstList.length == secondList.length ? null : true;
}

console.log(result);
console.log(result.reduce((acc, cur) => acc + cur, 0));

// > 3500
// < 5000