const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')

module.exports = {
    input,
};

/*input = ["[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]"];*/

//input = ["[({(<(())[]>[[{[]{<()<>>"];

function points (elt) {
    if (elt == ")") return 3;
    if (elt == "]") return 57;
    if (elt == "}") return 1197;
    if (elt == ">") return 25137;
}

function badLigne(chaine) {
    let M = [];
    for (i = 0 ; i <  chaine.length ; i++) {
        if (chaine[i] == "<" || chaine[i] == "{" || chaine[i] == "[" || chaine[i] == "(") {
            M.push(chaine[i]);
        } else {
            switch (chaine[i]) {
                case ">" :
                    if (M[M.length - 1] == "<") M.splice(M.length - 1, 1);
                    else return points(chaine[i]);
                    break;
                case "}" :
                    if (M[M.length - 1] == "{") M.splice(M.length - 1, 1);
                    else return points(chaine[i]);
                    break;
                case "]" :
                    if (M[M.length - 1] == "[") M.splice(M.length - 1, 1);
                    else return points(chaine[i]);
                    break;
                case ")" :
                    if (M[M.length - 1] == "(") M.splice(M.length - 1, 1);
                    else return points(chaine[i]);
                    break;
                default: console.log("error");
            }
        }
    }

    let r = "";
    //console.log("M", M)

    for (j = M.length - 1 ; j >= 0 ; j--) {
        //console.log("j", M[j]);
        switch (M[j]) {
            case "(": 
                r += ")";
                break;
            case "{": 
                r += "}";
                break;
            case "[": 
                r += "]";
                break;
            case "<": 
                r += ">";
                break;
            default: console.log("error");
        }
    }
    //console.log("---", r, chaine);
    return r;
}

let N = [];
let O = [];
let w = "";

for (k of input) {
    w = badLigne(k);
    //console.log("-----------------", k, /*typeof w,*/ w)
    if (typeof w == "string") {
        N.push(w);
        let result = 0;

        for (t = 0 ; t < w.length ; t++) {
            result *= 5;
            result += point(w[t]);
        }
        O.push(result);
    }
    //console.log("N", N);
}

console.log("N", N, "O", O);

while (O.length != 1) {
    let max = Math.max(...O);
    let min = Math.min(...O);
    let a = O.indexOf(max);
    let b = O.indexOf(min);
    let c = Math.max(a,b);
    let d = Math.min(a,b);
    O.splice(c,1);
    O.splice(d,1);
    N.splice(c,1);
    N.splice(d,1);
}

console.log("N", N, "O", O);

function point(elt) {
    if (elt == ")") return 1;
    if (elt == "]") return 2;
    if (elt == "}") return 3;
    if (elt == ">") return 4;
}


console.log(O);

// < 4579491488
