const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.split(",").map((num) => parseInt(num, 10)));

module.exports = {
    input,
};

const tab = [];

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getEmptySide() {
        let emptySide = 0;
        if (!includePoint(new Point(this.x + 1, this.y, this.z))) emptySide++;
        if (!includePoint(new Point(this.x - 1, this.y, this.z))) emptySide++;
        if (!includePoint(new Point(this.x, this.y + 1, this.z))) emptySide++;
        if (!includePoint(new Point(this.x, this.y - 1, this.z))) emptySide++;
        if (!includePoint(new Point(this.x, this.y, this.z + 1))) emptySide++;
        if (!includePoint(new Point(this.x, this.y, this.z - 1))) emptySide++;
        return emptySide;
    }

    equals(point) {
        return this.x === point.x && this.y === point.y && this.z === point.z;
    }
}

for (let i = 0; i < input.length; i++) {
    tab.push(
        new Point(input[i][0], input[i][1], input[i][2])
    );
}

function includePoint(point) {
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].equals(point)) {
            return true;
        }
    }
    return false;
}

let result = 0;

for (let i = 0; i < tab.length; i++) {
    result += tab[i].getEmptySide();
}

console.log(result);