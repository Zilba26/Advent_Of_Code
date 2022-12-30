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
    "<{([{{}}[<[[[<>{}]]]>[]]]"];*/

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
        console.log("M", M);
        console.log("chaine", chaine[i]);
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
    return false;
}

let result = 0;

for (j of input) {
    console.log("j", j)
    if (badLigne(j)) result += badLigne(j);
}

console.log(result);