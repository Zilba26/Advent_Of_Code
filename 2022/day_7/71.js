const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(line => line.replace('\r', '').split(' '));

module.exports = {
    input,
};

//console.log(input);

const map = new Map();
let currentDirectory = "";
const allDirectories = [""];

for (const line of input) {
    if (line[0] === '$') {
        if (line[1] === 'cd') {
            if (line[2] === '..') {
                currentDirectory = currentDirectory.split('/').slice(0, -1).join('/');
            } else if (line[2] === '/') {
                currentDirectory = "";
            } else {
                currentDirectory += "/dir" + line[2];
            }
        }
    } else {
        let name = line[1];
        let size = undefined;
        if (line[0] != 'dir') {
            size = parseInt(line[0]);
            name = "file" + name;
        } else {
            name = "dir" + name;
            allDirectories.push(currentDirectory + "/" + name);
        }
        getSubDirectory(currentDirectory).set(name, size == undefined ? new Map() : size);
    }
}

function getSubDirectory(d) {
    const tab = d.split("/");
    tab.shift();
    let copy = map;
    for (const directory of tab) {
        copy = copy.get(directory);
    }
    return copy;
}

function getSize(map) {
    let size = 0;
    for (const [key, value] of map) {
        if (value instanceof Map) {
            size += getSize(value);
        } else {
            size += value;
        }
    }
    return size;
}

let result = 0;

for (const directory of allDirectories) {
    const size = getSize(getSubDirectory(directory));
    if (size < 100000) {
        result += size;
    }
}

console.log(result);