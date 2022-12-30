const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .filter((line) => line != '')
    .map(elt => JSON.parse(elt));
    
// input = fs
//     .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
//     .toString()
//     .trim()
//     .split('\r\n')
//     .filter((line) => line != '')
//     .map(elt => JSON.parse(elt));

module.exports = {
    input,
};

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

function sortCompareFunction(firstList, secondList) {
    const compareResult = compare(firstList, secondList);
    if (compareResult == true) {
        return -1;
    } else if (compareResult == false) {
        return 1;
    } else {
        return 0;
    }
}

let result1 = -1;
let result2 = -1;

input.push([[2]]);
input.push([[6]]);

input.sort((a, b) => sortCompareFunction(a, b));

for (let i = 0; i < input.length; i++) {
    const element = input[i];
    if (element[0] != undefined) {
        if (element[0][0] == 6 && element.length == 1 && element[0].length == 1) {
            result1 = i + 1;
        }
        if (element[0][0] == 2 && element.length == 1 && element[0].length == 1) {
            result2 = i + 1;
        } 
    }
    
}

console.log(result1 * result2);
// < 90902