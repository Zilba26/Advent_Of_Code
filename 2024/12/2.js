const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(''))

module.exports = {
    input,
};

function getZone(i, j) {
    const letter = input[i][j];
    let zone = [[i, j]];
    indexTreated.push(i + "-" + j);
    if (i > 0 && !indexTreated.includes((i-1) + "-" + j)) {
        const nextLetter = input[i-1][j];
        if (nextLetter === letter) zone = zone.concat(getZone(i - 1, j));
    }
    if (j > 0 && !indexTreated.includes(i + "-" + (j-1))) {
        const nextLetter = input[i][j-1];
        if (nextLetter === letter) zone = zone.concat(getZone(i, j - 1));
    }
    if (i < input.length - 1 && !indexTreated.includes((i+1) + "-" + j)) {
        const nextLetter = input[i+1][j];
        if (nextLetter === letter) zone = zone.concat(getZone(i + 1, j));
    }
    if (j < input[i].length - 1 && !indexTreated.includes(i + "-" + (j+1))) {
        const nextLetter = input[i][j+1];
        if (nextLetter === letter) zone = zone.concat(getZone(i, j+1));
    }
    return zone
}

const Direction = {
    LEFT: [0,-1],
    UP: [-1,0],
    RIGHT: [0,1],
    DOWN: [1,0]
};

const ALL_DIR = [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN];

function calcSides(zone) {
    if (zone.length === 1) return 4;
    const topLeftPoint = zone.reduce((topLeft, point) => {
        const [x, y] = point;
        const [topLeftX, topLeftY] = topLeft;
    
        if (y < topLeftY || (y === topLeftY && x < topLeftX)) {
            return point;
        }
        return topLeft;
    }, [Infinity, Infinity]);
    let nextPoint = [...topLeftPoint];
    console.log(topLeftPoint);
    let lastDir = undefined;
    let sides = 0;

    if (zone.some(elt => elt[0] == nextPoint[0] && elt[1] == nextPoint[1] + 1)) {
        lastDir = Direction.RIGHT;
        sides += zone.some(elt => elt[0] == nextPoint[0] + 1 && elt[1] == nextPoint[1]) ? 1 : 2;
        nextPoint[1]++;
    } else if (zone.some(elt => elt[0] == nextPoint[0] + 1 && elt[1] == nextPoint[1])) {
        console.log("test")
        lastDir = Direction.DOWN;
        nextPoint[0]++;
        sides += 2;
    } else {
        throw new Error("Impossible");
    }
console.log(nextPoint, sides);
    do {
        const [i, j] = nextPoint;
        const lastDirIndex = ALL_DIR.indexOf(lastDir);
        for (let k = 0 ; k < 4 ; k++) {
            const dir = ALL_DIR[(lastDirIndex - 1 + k + 4) % 4];
            if (i + dir[0] >= 0 && j + dir[1] >= 0 && i + dir[0] < input.length && j + dir[1] < input[i].length) {
                if (zone.some(elt => elt[0] == i + dir[0] && elt[1] == j + dir[1])) {
                    nextPoint = [i + dir[0], j + dir[1]];
                    const diff = Math.abs(lastDirIndex - ALL_DIR.indexOf(dir));
                    sides += diff % 2 == 0 ? diff : 1
                    lastDir = dir;
                    console.log(nextPoint, sides);
                    break;
                }
            }
            if (k === 3) throw new Error("Imposible");
        }
    } while (nextPoint[0] != topLeftPoint[0] || nextPoint[1] != topLeftPoint[1]);
    return sides;
}

const indexTreated = [];
let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        if (!indexTreated.includes(i + "-" + j)) {
            const zone = getZone(i, j);
            console.log(input[i][j], zone);
            const sides = calcSides(zone);
            result += zone.length * sides;
            console.log("A region of " + input[i][j] + " plants with price " + zone.length + " * " + sides);
        }
    }
}

console.log(result);

// > 844430
// < 1402544