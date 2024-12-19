const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.split(',').map(elt => parseInt(elt)));

const mapLength = 71;

let bytes = 2970;

while (true) {
    bytes++;
    console.log(bytes);

    const tab = Array.from({ length: mapLength }, () => Array.from({ length: mapLength }, () => "."));
    for (let i = 0 ; i < bytes ; i++) {
        const coord = input[i];
        tab[coord[1]][coord[0]] = "#";
    }

    const map = new Map().set("0,0", 0);
    const Q = Array.from({ length: mapLength * mapLength }, (_, index) => tab[Math.floor(index / mapLength)][index % mapLength] === "#" ? null : Math.floor(index / mapLength) + "," + (index % mapLength)).filter(elt => elt !== null);

    while(Q.length > 0) {
        let s1;
        for (let s of Q) {
            if (map.has(s)) {
                if (s1 === undefined || map.get(s) < map.get(s1)) {
                    s1 = s;
                }
            }
        }
        if (s1 === undefined) break;
        Q.splice(Q.indexOf(s1), 1);
        const s1Coord = s1.split(',').map(elt => parseInt(elt));
        if (s1Coord[0] > 0 && tab[s1Coord[0] - 1][s1Coord[1]] == ".") {
            const s2 = (s1Coord[0] - 1) + "," + s1Coord[1];
            const s2Value = map.get(s2) ?? Infinity;
            if (s2Value > map.get(s1) + 1) {
                map.set(s2, map.get(s1) + 1);
            }
        }
        if (s1Coord[0] < mapLength - 1 && tab[s1Coord[0] + 1][s1Coord[1]] == ".") {
            const s2 = (s1Coord[0] + 1) + "," + s1Coord[1];
            const s2Value = map.get(s2) ?? Infinity;
            if (s2Value > map.get(s1) + 1) {
                map.set(s2, map.get(s1) + 1);
            }
        }
        if (s1Coord[1] > 0 && tab[s1Coord[0]][s1Coord[1] - 1] == ".") {
            const s2 = s1Coord[0] + "," + (s1Coord[1] - 1);
            const s2Value = map.get(s2) ?? Infinity;
            if (s2Value > map.get(s1) + 1) {
                map.set(s2, map.get(s1) + 1);
            }
        }
        if (s1Coord[1] < mapLength - 1 && tab[s1Coord[0]][s1Coord[1] + 1] == ".") {
            const s2 = s1Coord[0] + "," + (s1Coord[1] + 1);
            const s2Value = map.get(s2) ?? Infinity;
            if (s2Value > map.get(s1) + 1) {
                map.set(s2, map.get(s1) + 1);
            }
        }
    }

    if(!map.has(mapLength - 1 + "," + (mapLength - 1))) break;
}

console.log(input[bytes - 1]);