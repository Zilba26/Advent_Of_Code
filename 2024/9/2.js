const path = require('path');
const fs = require('fs');
const { table } = require('console');

let input = fs
    .readFileSync(path.join(__dirname, 'message.txt'), 'utf8')
    .toString()
    .trim();

module.exports = {
    input,
};

const tab = [];
let id = 0;
let isSpace = false;

for (let char of input) {
    if (isSpace) {
        tab.push([".", parseInt(char)]);
    } else {
        tab.push([id.toString(), parseInt(char)]);
        id++;
    }
    isSpace = !isSpace;
}

let lastIndex = tab.length - 1;
do {
    const bloc = tab[lastIndex];
    if (bloc[0] != ".") {
        const spaceAvailable = tab.find((elt) => elt[0] === "." && elt[1] >= bloc[1]);
        const indexFind = tab.indexOf(spaceAvailable);
        if (indexFind != -1 && indexFind < lastIndex) {
            if (spaceAvailable[1] == bloc[1]) {
                tab[indexFind] = bloc;
                tab[lastIndex] = spaceAvailable;
            } else {
                tab[lastIndex] = [".", bloc[1]];
                tab.splice(indexFind, 1, bloc, [".", spaceAvailable[1] - bloc[1]]);
                lastIndex++;
            }
        }
    }
    lastIndex--;
} while (lastIndex != 0);

let index = 0;

console.log(tab.reduce((acc, value) => {
    if (value[0] == ".") {
        index += value[1];
        return acc;
    } else {
        for (let i = 0 ; i < value[1] ; i++) {
            acc += parseInt(value[0]) * index;
            index++;
        }
        return acc;
    }

}, 0));