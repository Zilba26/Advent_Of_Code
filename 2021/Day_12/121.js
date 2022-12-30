const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split("-"));

module.exports = {
    input,
};

input = [/*"start-A",*/ "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"].map(elt => elt.split("-"));
console.log(input);

function rechercheMinuscules(L) {
    let M = [];
    for (y = 0 ; y < L.length ; y++) {
        if (L[y] == L[y].toLowerCase()) M.push(L[y]);
    }
    return M;
}

function allCheminFind() {
    for (i of L) {
        if (i.chemin[i.chemin.length - 1] != "end") return false;
    }
    return true;
}

function rechercheEtape(L) {
    const lastEtape = L.chemin[L.chemin.length - 1];
    let M = [];
    for (w of input) {
        if (w.includes(lastEtape)) {
            let nextEtape = (w[0] == lastEtape) ? w[1] : w[0];
            if (!L.minuscules.includes(nextEtape)) M.push(nextEtape);
        }
    }
    return M;
}

class Chemin {
    constructor(chemin) {
        this.chemin = chemin;
        this.minuscules = rechercheMinuscules(chemin);
        this.end = this.setEnd();
    }

    setEnd() {
        if (this.chemin[this.chemin.length - 1] == "end") return true;
        else return false;
    }
}

let L = [];

for (i of input) {
    if (i[0] == "start") L.push(new Chemin(["start", i[1]]))
    if (i[1] == "start") L.push(new Chemin(["start", i[0]]))
}

while (!allCheminFind()) {
    console.log("-------------------------------------------------------------------------------", "L", L);
    let b = L.length;
    let copie = [...L];
    for (i = 0 ; i < b ; i++) {
        console.log("-----------------", "copie[]", i, copie[i], copie[i].chemin);
        if (!L[i].end) {
            for (j of rechercheEtape(L[i])) {
                let a = [...L[i].chemin];
                a.push(j);
                console.log("i", i, "j", j, "a", a)
                L.push(new Chemin(a));
            }
            L.splice(L.indexOf(L[i]),1);
        }
    }
    L = copie;
}



console.log("----------------------------------------------------------------------------", L);

