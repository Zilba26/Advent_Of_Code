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

function concatMap(map1, map2) {
    const result = new Map([...map1, ...map2]);
    for (const [key, value] of map1) {
        if (map2.has(key)) {
            result.set(key, [...value, ...map2.get(key)]);
        }
    }
    return result;
}

function getZone(i, j) {
    const letter = input[i][j];
    let area = 1;
    let map = new Map();
    indexTreated.push(i + "-" + j);
    const leftMap = new Map().set("LEFT", [[i, j]]);
    const rightMap = new Map().set("RIGHT", [[i, j]]);
    const downMap = new Map().set("DOWN", [[i, j]]);
    if (i > 0) {
        if (!indexTreated.includes((i-1) + "-" + j)) {
            const nextLetter = input[i-1][j];
            if (nextLetter === letter) {
                const [subArea, subMap] = getZone(i - 1, j);
                area += subArea;
                map = concatMap(map, subMap);
            } else map.set("UP", [[i, j]]);
        } else {
            if (input[i-1][j] != letter) map.set("UP", [[i, j]]);
        }
    } else map.set("UP", [[i, j]]);
    if (j > 0) {
        if (!indexTreated.includes(i + "-" + (j-1))) {
            const nextLetter = input[i][j-1];
            if (nextLetter === letter) {
                const [subArea, subMap] = getZone(i, j - 1);
                area += subArea;
                map = concatMap(map, subMap);
            } else map = concatMap(map, leftMap);
        } else {
            if (input[i][j-1] != letter) map = concatMap(map, leftMap);
        }
    } else map = concatMap(map, leftMap);
    if (i < input.length - 1) {
        if (!indexTreated.includes((i+1) + "-" + j)) {
            const nextLetter = input[i+1][j];
            if (nextLetter === letter) {
                const [subArea, subMap] = getZone(i + 1, j);
                area += subArea;
                map = concatMap(map, subMap);
            } else map = concatMap(map, downMap);
        } else {
            if (input[i+1][j] != letter) map = concatMap(map, downMap);
        }
    } else map = concatMap(map, downMap);
    if (j < input[i].length - 1) {
        if (!indexTreated.includes(i + "-" + (j+1))) {
            const nextLetter = input[i][j+1];
            if (nextLetter === letter) {
                const [subArea, subMap] = getZone(i, j + 1);
                area += subArea;
                map = concatMap(map, subMap);
            } else map = concatMap(map, rightMap);
        } else {
            if (input[i][j+1] != letter) map = concatMap(map, rightMap);
        }
    } else map = concatMap(map, rightMap);
    return [area, map];
}

function getSides(map) {
    let sides = 0;
    const up = map.get("UP");
    up.sort((p1, p2) => {
        if (p1[0] != p2[0]) return p1[0] - p2[0];
        return p1[1] - p2[1];
    });
    up.forEach(p => {
        if (p[1] === 0) sides++;
        else if (!up.some(elt => elt[0] === p[0] && elt[1] === p[1] - 1)) sides++;
    });
    const left = map.get("LEFT");
    left.sort((p1, p2) => {
        if (p1[1] != p2[1]) return p1[1] - p2[1];
        return p1[0] - p2[0];
    });
    left.forEach(p => {
        if (p[0] === 0) sides++;
        else if (!left.some(elt => elt[0] === p[0] - 1 && elt[1] === p[1])) sides++;
    });
    const down = map.get("DOWN");
    down.sort((p1, p2) => {
        if (p1[0] != p2[0]) return p1[0] - p2[0];
        return p1[1] - p2[1];
    });
    down.forEach(p => {
        if (p[1] === input[p[0]].length - 1) sides++;
        else if (!down.some(elt => elt[0] === p[0] && elt[1] === p[1] + 1)) sides++;
    });
    const right = map.get("RIGHT");
    right.sort((p1, p2) => {
        if (p1[1] != p2[1]) return p1[1] - p2[1];
        return p1[0] - p2[0];
    });
    right.forEach(p => {
        if (p[0] === input.length - 1) sides++;
        else if (!right.some(elt => elt[0] === p[0] + 1 && elt[1] === p[1])) sides++;
    });
    return sides;
}

const indexTreated = [];
let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        if (!indexTreated.includes(i + "-" + j)) {
            const [area, map] = getZone(i, j);
            const sides = getSides(map);
            result += area * sides;
            console.log("A region of " + input[i][j] + " plants with price " + area + " * " + sides + " sides");
        }
    }
}

console.log(result);