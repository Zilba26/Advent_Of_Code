const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim();

module.exports = {
    input,
};

const tab = [];
let id = 0;
let isSpace = false;

for (let char of input) {
    for (let i = 0 ; i < parseInt(char) ; i++) {
        if (isSpace) {
            tab.push(".");
        } else {
            tab.push(id.toString());
        }
    }
    if (!isSpace) id++;
    isSpace = !isSpace;
}

let finalResult = 0;
let index = 0;

do {
    const nb = tab.shift();
    let lastNb;
    if (nb == ".") {
        do {
            lastNb = tab.pop();
        } while (lastNb == ".");
        finalResult += parseInt(lastNb) * index;
    } else {
        finalResult += parseInt(nb) * index;
    }
    index++;
    //console.log(nb, lastNb, index, tab.join(""), finalResult);  
} while (tab.length > 0);

console.log(finalResult, index);

// > 91274982836
// ? 56595031003749
// ? 6346871685398