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

function getZone(i, j, tab) {
    const letter = tab[i][j];
    let zone = [[i, j]];
    indexTreated.push(i + "-" + j);
    if (i > 0 && !indexTreated.includes((i-1) + "-" + j)) {
        const nextLetter = tab[i-1][j];
        if (nextLetter === letter) zone = zone.concat(getZone(i - 1, j, tab));
    }
    if (j > 0 && !indexTreated.includes(i + "-" + (j-1))) {
        const nextLetter = tab[i][j-1];
        if (nextLetter === letter) zone = zone.concat(getZone(i, j - 1, tab));
    }
    if (i < tab.length - 1 && !indexTreated.includes((i+1) + "-" + j)) {
        const nextLetter = tab[i+1][j];
        if (nextLetter === letter) zone = zone.concat(getZone(i + 1, j, tab));
    }
    if (j < tab[i].length - 1 && !indexTreated.includes(i + "-" + (j+1))) {
        const nextLetter = tab[i][j+1];
        if (nextLetter === letter) zone = zone.concat(getZone(i, j+1, tab));
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

function calcSides(zone, withInner) {
    if (zone.length === 1) return 4;
    const parcelles = [];
    const topLeftPoint = zone.reduce((topLeft, point) => {
        const [x, y] = point;
        const [topLeftX, topLeftY] = topLeft;
    
        if (y < topLeftY || (y === topLeftY && x < topLeftX)) {
            return point;
        }
        return topLeft;
    }, [Infinity, Infinity]);
    let nextPoint = [...topLeftPoint];
    //console.log(topLeftPoint);
    let lastDir = undefined;
    let sides = 0;

    if (zone.some(elt => elt[0] == nextPoint[0] && elt[1] == nextPoint[1] + 1)) {
        lastDir = Direction.RIGHT;
        sides += zone.some(elt => elt[0] == nextPoint[0] + 1 && elt[1] == nextPoint[1]) ? 1 : 2;
        nextPoint[1]++;
    } else if (zone.some(elt => elt[0] == nextPoint[0] + 1 && elt[1] == nextPoint[1])) {
        lastDir = Direction.DOWN;
        nextPoint[0]++;
        sides += 2;
    } else {
        throw new Error("Impossible");
    }
    parcelles.push(topLeftPoint);
    parcelles.push(nextPoint);
    //console.log(nextPoint, sides);
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
                    //console.log(nextPoint, sides);
                    break;
                }
            }
            if (k === 3) throw new Error("Imposible");
        }
        parcelles.push(nextPoint);
    } while (nextPoint[0] != topLeftPoint[0] || nextPoint[1] != topLeftPoint[1]);

    if (withInner) {
        const [minI, maxI] = parcelles.reduce((tab, point) => {
            const [x, y] = point;
            if (x < tab[0]) tab[0] = x;
            if (x > tab[1]) tab[1] = x;
            return tab;
        }, [Infinity, 0]);
        const letter = input[zone[0][0]][zone[0][1]];
        //console.log(letter, minI, maxI);
        const copy = JSON.parse(JSON.stringify(input));
        let innerCase = [];
        for (let i = minI ; i <= maxI ; i++) {
            const filterParcelles = parcelles.filter(elt => elt[0] === i);
            const [minJ, maxJ] = filterParcelles.reduce((tab, point) => {
                const [x, y] = point;
                if (y < tab[0]) tab[0] = y;
                if (y > tab[1]) tab[1] = y;
                return tab;
            }, [Infinity, 0]);
            //console.log(minJ, maxJ);
            for (let j = minJ ; j <= maxJ ; j++) {
               if (input[i][j] != letter) {
                copy[i][j] = 0;
                innerCase.push([i,j]);
               }
            }
        }
        while (innerCase.length > 0) {
            const [x, y] = innerCase[0];
            const tempCopy = [...indexTreated];
            indexTreated = [];
            const zone2 = getZone(x, y, copy);
            innerCase = innerCase.filter(elt => !zone2.some(elt2 => elt[0] === elt2[0] && elt[1] === elt2[1]));
            //console.log(zone2, innerCase);
            const plusSide = calcSides(zone2, true);
            //console.log("Inner cotés en plus : " + plusSide);
            sides += plusSide;
            indexTreated = tempCopy;
        }
    }
    
    return sides;
}

let indexTreated = [];
let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        if (!indexTreated.includes(i + "-" + j)) {
            const zone = getZone(i, j, input);
            //console.log(input[i][j], zone);
            const sides = calcSides(zone, true);
            result += zone.length * sides;
            console.log("A region of " + input[i][j] + " plants with price " + zone.length + " * " + sides);
        }
    }
}

console.log(result);

// > 844430
// < 1402544
//!= 1177322