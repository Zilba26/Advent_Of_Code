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
//tab[x][y][z] = Point(x, y, z) || null (outside) || undefined (empty)

class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getEmptySide() {
        let emptySide = 0;
        if (this.x === tabSize - 1 || tab[this.x + 1][this.y][this.z] === null) emptySide++;
        if (this.x === 0 || tab[this.x - 1][this.y][this.z] === null) emptySide++;
        if (this.y === tabSize - 1 || tab[this.x][this.y + 1][this.z] === null) emptySide++;
        if (this.y === 0 || tab[this.x][this.y - 1][this.z] === null) emptySide++;
        if (this.z === tabSize - 1 || tab[this.x][this.y][this.z + 1] === null) emptySide++;
        if (this.z === 0 || tab[this.x][this.y][this.z - 1] === null) emptySide++;
        return emptySide;
    }
}

const tabSize = 25;

for (let i = 0; i < tabSize; i++) {
    const tabTemp1 = [];
    for (let j = 0; j < tabSize; j++) {
        const tabTemp2 = [];
        for (let k = 0; k < tabSize; k++) {
            tabTemp2.push(undefined);
        }
        tabTemp1.push(tabTemp2);
    }
    tab.push(tabTemp1);
}

for (let i = 0; i < input.length; i++) {
    tab[input[i][0]][input[i][1]][input[i][2]] = new Point(
        input[i][0],
        input[i][1],
        input[i][2]
    );
}

function extendsTab(point) {
    const extendsPoints = [];
    tab[point.x][point.y][point.z] = null;
    if (point.x != 0 && tab[point.x - 1][point.y][point.z] === undefined) {
        extendsPoints.push(new Point(point.x - 1, point.y, point.z));
        tab[point.x - 1][point.y][point.z] = null;
    }
    if (point.x != tabSize - 1 && tab[point.x + 1][point.y][point.z] === undefined) {
        extendsPoints.push(new Point(point.x + 1, point.y, point.z));
        tab[point.x + 1][point.y][point.z] = null;
    }
    if (point.y != 0 && tab[point.x][point.y - 1][point.z] === undefined) {
        extendsPoints.push(new Point(point.x, point.y - 1, point.z));
        tab[point.x][point.y - 1][point.z] = null;
    }
    if (point.y != tabSize - 1 && tab[point.x][point.y + 1][point.z] === undefined) {
        extendsPoints.push(new Point(point.x, point.y + 1, point.z));
        tab[point.x][point.y + 1][point.z] = null;
    }
    if (point.z != 0 && tab[point.x][point.y][point.z - 1] === undefined) {
        extendsPoints.push(new Point(point.x, point.y, point.z - 1));
        tab[point.x][point.y][point.z - 1] = null;
    }
    if (point.z != tabSize - 1 && tab[point.x][point.y][point.z + 1] === undefined) {
        extendsPoints.push(new Point(point.x, point.y, point.z + 1));
        tab[point.x][point.y][point.z + 1] = null;
    }
    return extendsPoints;
}

let notInfiniteLoop = 0;
const maxLoop = 100000;

//X sides
for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        if (tab[0][i][j] === undefined) {
            let currentTab = extendsTab(new Point(0, i, j));
            while (currentTab.length > 0 && notInfiniteLoop < maxLoop) {
                notInfiniteLoop++;
                const currentPoint = currentTab.shift();
                const extendTab = extendsTab(currentPoint);
                currentTab = currentTab.concat(extendTab);
            }
        }
    }
}

for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        if (tab[tabSize - 1][i][j] === undefined) {
            let currentTab = extendsTab(new Point(tabSize - 1, i, j));
            while (currentTab.length > 0 && notInfiniteLoop < maxLoop) {
                notInfiniteLoop++;
                const currentPoint = currentTab.shift();
                const extendTab = extendsTab(currentPoint);
                currentTab = currentTab.concat(extendTab);
            }
        }
    }
}

//Y sides
for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        if (tab[i][0][j] === undefined) {
            let currentTab = extendsTab(new Point(i, 0, j));
            while (currentTab.length > 0 && notInfiniteLoop < maxLoop) {
                notInfiniteLoop++;
                const currentPoint = currentTab.shift();
                const extendTab = extendsTab(currentPoint);
                currentTab = currentTab.concat(extendTab);
            }
        }
    }
}

for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        if (tab[i][tabSize - 1][j] === undefined) {
            let currentTab = extendsTab(new Point(i, tabSize - 1, j));
            while (currentTab.length > 0 && notInfiniteLoop < maxLoop) {
                notInfiniteLoop++;
                const currentPoint = currentTab.shift();
                const extendTab = extendsTab(currentPoint);
                currentTab = currentTab.concat(extendTab);
            }
        }
    }
}

//Z sides
for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        if (tab[i][j][0] === undefined) {
            let currentTab = extendsTab(new Point(i, j, 0));
            while (currentTab.length > 0 && notInfiniteLoop < maxLoop) {
                notInfiniteLoop++;
                const currentPoint = currentTab.shift();
                const extendTab = extendsTab(currentPoint);
                currentTab = currentTab.concat(extendTab);
            }
        }
    }
}

for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        if (tab[i][j][tabSize - 1] === undefined) {
            let currentTab = extendsTab(new Point(i, j, tabSize - 1));
            while (currentTab.length > 0 && notInfiniteLoop < maxLoop) {
                notInfiniteLoop++;
                const currentPoint = currentTab.shift();
                const extendTab = extendsTab(currentPoint);
                currentTab = currentTab.concat(extendTab);
            }
        }
    }
}

if (notInfiniteLoop >= maxLoop) {
    console.log("infinite loop");
}

let result = 0;

for (let i = 0; i < tabSize; i++) {
    for (let j = 0; j < tabSize; j++) {
        for (let k = 0; k < tabSize; k++) {
            if (tab[i][j][k] !== undefined && tab[i][j][k] !== null) {
                result += tab[i][j][k].getEmptySide();
            }
        }
    }
}

console.log(result);

// < 4316
// < 4268