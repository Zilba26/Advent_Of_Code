const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', '').split(''));

module.exports = {
    input,
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let depart = undefined;
let arrivee = undefined;
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] == 'S') {
            depart = [i, j];
        } else if (input[i][j] == 'E') {
            arrivee = [i, j];
        }
    }
}


//parcours en largeur
let file = [];
let visited = [];
let parent = [];
let found = false;

file.push(depart);
visited.push(depart);
parent[depart] = null;

let notInfinitLoop = 0;

while (file.length > 0 && !found && notInfinitLoop < 10000) {
    notInfinitLoop++;
    let current = file.shift();
    let x = parseInt(current[0]);
    let y = parseInt(current[1]);
    if (equals(current, arrivee)) {
        found = true;
    } else {
        if (x > 0 && canGoTo(input[x][y], input[x - 1][y]) && !includes(visited, [x -1, y])) {
            file.push([x -1, y]);
            visited.push([x -1, y]);
            parent[[x -1, y]] = current;
        }
        if (x < input.length - 1 && canGoTo(input[x][y], input[x + 1][y]) && !includes(visited, [x + 1, y])) {
            file.push([x + 1, y]);
            visited.push([x + 1, y]);
            parent[[x + 1, y]] = current;
        }
        if (y > 0 && canGoTo(input[x][y], input[x][y - 1]) && !includes(visited, [x, y - 1])) {
            file.push([x, y - 1]);
            visited.push([x, y - 1]);
            parent[[x, y - 1]] = current;
        }
        if (y < input[0].length - 1 && canGoTo(input[x][y], input[x][y + 1]) && !includes(visited, [x, y + 1])) {
            file.push([x, y + 1]);
            visited.push([x, y + 1]);
            parent[[x, y + 1]] = current;
        }
    }
    if (notInfinitLoop >= 4625) {
        console.log(file);
    }
}

if (notInfinitLoop >= 10000) {
    console.log("Boucle infinie");
}

let result = [];

if (found) {
    let current = arrivee;
    while (current != depart) {
        result.push(current[0].toString() + current[1].toString());
        current = parent[current];
    }
    result.push(current[0].toString() + current[1].toString());
    result.reverse();
    console.log(result.join(";"));
} else {
    console.log("Pas de chemin");
}

function equals(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

function includes(array, element) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] != element[j]) {
                break;
            }
            if (j == array[i].length - 1) {
                return true;
            }
        }
    }
    return false;
}

function canGoTo(actualCase, caseToGo) {
    if (actualCase == "S") return caseToGo == 'a' || caseToGo == 'b';
    if (caseToGo == "E") return actualCase == 'z' || actualCase == 'y';
    return alphabet.indexOf(caseToGo) - alphabet.indexOf(actualCase) <= 1;
}

console.log(result.length - 1);