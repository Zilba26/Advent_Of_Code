const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', '').split(' '));

const valves = [];

for (let i = 0; i < input.length; i++) {
    input[i].shift();
    input[i].splice(1, 2);
    input[i] = input[i].map((elt) => elt.replace(',', ''));
    input[i][1] = parseInt(input[i][1].replace('rate=', ''));
    input[i].splice(2, 4);
    valves.push(input[i][0]);
}

class Valve {
    constructor(name, pressure, open = false) {
        if (typeof name == 'string') {
            this.name = name;
            this.index = valves.indexOf(name);
        } else {
            this.index = name;
            this.name = valves[name];
        }
        this.pressure = pressure;
        this.open = open;
    }

    copy() {
        return new Valve(this.name, this.pressure, this.open);
    }
}

class Chemin {
    constructor(chemin, pressure = 0, minutesPassed = 0, lastValveOpened = false, valvesOpened = new Set()) {
        this.chemin = chemin;
        this.pressure = pressure;
        this.minutesPassed = minutesPassed;
        this.lastValveOpened = lastValveOpened;
        this.valvesOpened = valvesOpened;
    }

    toString() {
        return this.chemin.map((elt) => input[elt]);
    }

    getPressure() {
        let pressure = 0;
        const iterator = this.valvesOpened.values();
        for (let i = 0; i < this.valvesOpened.size; i++) {
            pressure += input[iterator.next().value][1];
        }
        return pressure;
    }

    copy() {
        return new Chemin(this.chemin.slice(0), this.pressure, this.minutesPassed, this.lastValveOpened, new Set(this.valvesOpened));
    }

    getNumberOfElement(valve) {
        const allValues = this.chemin.filter((elt) => elt === valve);
        return allValues.length;
    }

    cheminEquals(chemin) {
        if (this.chemin.length !== chemin.length) {
            return false;
        }
        for (let i = 0; i < this.chemin.length; i++) {
            if (this.chemin[i] !== chemin.chemin[i]) {
                return false;
            }
        }
        return true;
    }
}

const chemins = [new Chemin([valves.indexOf('AA')])];
let notInfinite = 0;
const maxInfinite = 1000000;

while (chemins[0].minutesPassed < 30 && notInfinite < maxInfinite) {
    notInfinite++;
    const chemin = chemins.shift();

    chemin.minutesPassed++;
    chemin.pressure += chemin.getPressure();
    const currentStation = chemin.chemin[chemin.chemin.length - 1];

    if (!chemin.lastValveOpened && input[currentStation][1] > 0) {
        chemin.lastValveOpened = true;
        chemin.valvesOpened.add(currentStation);
        chemins.push(chemin.copy());
    } else {
        chemin.lastValveOpened = false;
        const nextStations = input[currentStation].slice(2);
        let findNextStation = false;
        for (let i = 0; i < nextStations.length; i++) {
            const nextStationIndex = valves.indexOf(nextStations[i]);
            if (chemin.getNumberOfElement(nextStationIndex) < nextStations.length + 1) {
                chemin.chemin.push(nextStationIndex);
                chemins.push(chemin.copy());
                chemin.chemin.pop();
                findNextStation = true;
            }
        }
        if (!findNextStation) {
            chemins.push(chemin);
        }
    }

    if (notInfinite % (maxInfinite / 10) === 0) {
        console.log((notInfinite / maxInfinite) * 100 + '%');
        console.log(chemins[0].minutesPassed);
    }
}

if (notInfinite >= maxInfinite) {
    console.log('Infinite loop');
}

const max = Math.max(...chemins.map((elt) => elt.pressure));
console.log(chemins.length);
console.log(max);
console.log(chemins.find((elt) => elt.pressure === max));
console.log(chemins.find((elt) => elt.cheminEquals([
    0
])));