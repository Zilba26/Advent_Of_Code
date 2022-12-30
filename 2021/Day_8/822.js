const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((num) => num.split("| "));

module.exports = {
    input,
};

//console.log(input);

function searchNumber (L, taille) {
    for (i of L) {
        if (i.length == taille) return i
    }
}

function searchNumber2 (L, taille) {
    let M = [];
    for (i of L) {
        if (i.length == taille) M.push(i);
    }
    return M;
}

function searchNumber3 (L, chaine) {
    for (i of L) {
        for (lettre of chaine) {
            if (!i.includes(lettre)) return i;
        }        
    }
}

function searchNumber4 (L, chaine) {
    for (i of L) {
        let b = true;
        for (lettre of chaine) {
            if (!i.includes(lettre)) b = false;
        }
        if (b) return i;
    }
}

function caMeCasseLesCouilles (a,b) {
    for (i of a) {
        if (!b.includes(i)) return i;
    }
}

function tri (i) {
    return i.split("").sort(function (a, b) {
        return a.localeCompare(b);
      }).join("");
}


input = [["be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb", "fdgacbe cefdb cefbgd gcbe"], ["edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec", "fcgedb cgb dgebacf gc"]];

//input = [["acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab", "cdfeb fcadb cdfeb cdbaf"]];

console.log(input);

let result = 0;

for (j of input) {
    let K = [];
    let L = j[0].split(" ");
    K[8] = tri(searchNumber(L, 7));
    K[7] = tri(searchNumber(L, 3));
    K[1] = tri(searchNumber(L, 2));
    K[4] = tri(searchNumber(L, 4));
    let six = searchNumber2(L, 6);
    let five = searchNumber2(L, 5);

    K[6] = tri(searchNumber3(six, K[1]));

    six.splice(six.indexOf(K[6]),1);

    K[0] = tri(searchNumber3(six, K[4]));

    six.splice(six.indexOf(K[0]),1);

    K[9] = tri(six[0]);

    K[3] = tri(searchNumber4(five, K[1]));

    five.splice(five.indexOf(K[3], 1));

    let a = caMeCasseLesCouilles(K[8], K[6]);

    if (five[0].includes(a)) {
        K[2] = tri(five[0]);
        K[5] = tri(five[1]);
    } else {
        K[2] = tri(five[1]);
        K[5] = tri(five[0]);
    }
    
    console.log("K", K);

    let M = j[1].split(" ");
    let r = "";

    for (t in M) {
        M[t] = tri(M[t]);
    }

    

    console.log("M", M);

    for (h of M) {
        r += K.indexOf(h).toString();
        console.log("r", r);
    }

    result += Number(r);
}

console.log("Result : ", result);

