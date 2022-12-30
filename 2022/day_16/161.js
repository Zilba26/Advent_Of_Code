const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('\r', '').split(' '));

const valves = [];
let maxPressure = 0;

for (let i = 0; i < input.length; i++) {
    input[i].shift();
    input[i].splice(1, 2);
    input[i] = input[i].map((elt) => elt.replace(',', ''));
    input[i][1] = parseInt(input[i][1].replace('rate=', ''));
    input[i].splice(2, 4);
    valves.push(input[i][0]);
    maxPressure += input[i][1];
}

class Chemin {
    constructor(chemin, pressure = 0, totalPressure = 0, minutesPassed = 0, valvesOpened = new Set()) {
        this.chemin = chemin;
        this.pressure = pressure;
        this.totalPressure = totalPressure;
        this.minutesPassed = minutesPassed;
        this.valvesOpened = valvesOpened;
    }

    copy() {
        return new Chemin([...this.chemin], this.pressure, this.totalPressure, this.minutesPassed, new Set(this.valvesOpened));
    }

    getAllPossiblePaths() {
        this.minutesPassed++;
        this.totalPressure += this.pressure;
        const allPosibilities = [];
        if (this.pressure < maxPressure) {
            const currentValve = this.chemin[this.chemin.length - 1];
            const currentPressure = input[currentValve][1];
            if (currentPressure > 0 && !this.valvesOpened.has(currentValve)) {
                const copy = this.copy();
                copy.pressure += currentPressure;
                copy.valvesOpened.add(currentValve);
                copy.chemin.push(currentValve);
                allPosibilities.push(copy);
            }
            
            const nextValves = input[currentValve].slice(2);
            for (let i = 0; i < nextValves.length; i++) {
                if (this.chemin.filter((elt) => elt === valves.indexOf(nextValves[i])).length < nextValves.length + 1) {
                    const nextValve = valves.indexOf(nextValves[i]);
                    const copy = this.copy();
                    copy.chemin.push(nextValve);
                    allPosibilities.push(copy);
                }
            }
        } else {
            allPosibilities.push(this);
        }
        return allPosibilities;
    }
}

let chemins = [new Chemin([valves.indexOf('AA')])];
let notInfiniteLoop = 0;
const maxInfinite = 1000000;

while (chemins[0].minutesPassed < 30 && notInfiniteLoop < maxInfinite) {
    notInfiniteLoop++;
    const currentChemin = chemins.shift();
    const allPosibilities = currentChemin.getAllPossiblePaths();
    chemins = chemins.concat(allPosibilities);
    if (notInfiniteLoop % (maxInfinite/10) === 0) {
        console.log(notInfiniteLoop/maxInfinite*100 + "%");
        console.log(chemins.length);
        console.log(chemins[0].minutesPassed);
    }
}

if (notInfiniteLoop >= maxInfinite) {
    console.log('Infinite loop');
}

const max = Math.max(...chemins.map((elt) => elt.pressure));
console.log(chemins.length);
console.log(max);
console.log(chemins.find((elt) => elt.pressure === max));

// < 3000
// < 2400
// > 2100