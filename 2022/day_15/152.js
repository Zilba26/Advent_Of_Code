const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.split(" "));

module.exports = {
    input,
};

for (let i = 0; i < input.length; i++) {
    input[i].splice(0, 2);
    input[i][0] = parseInt(input[i][0].slice(2, input[i][0].length - 1));
    input[i][1] = parseInt(input[i][1].slice(2, input[i][1].length - 1));
    input[i].splice(2, 4);
    input[i][2] = parseInt(input[i][2].slice(2, input[i][2].length - 1));
    input[i][3] = parseInt(input[i][3].slice(2, input[i][3].length));
}

//brut force to search Y

// for (let i = 0; i < 4000000; i++) {
//     const result = getResult(i);
//     if (result < 4000000) {
//         console.log(i);
//     }
// }

function getResult(y) {
    let result = [];

    for (let i = 0; i < input.length; i++) {
        const [capteurX, capteurY, baliseX, baliseY] = input[i];
        const manathan = Math.abs(capteurX - baliseX) + Math.abs(capteurY - baliseY);
        const distanceToY = Math.abs(capteurY - y);
        if (manathan > distanceToY) {
            result.push([
                Math.max(capteurX - (manathan - distanceToY), 0),
                Math.min(capteurX + (manathan - distanceToY), 4000000)
            ]);
        }
    }
    
    result.sort((a, b) => a[0] - b[0]);
    
    console.log(result);

    let current = result[0];
    let resultFinal = 0;
    for (let i = 1; i < result.length; i++) {
        if (result[i][0] <= current[1]) {
            current[1] = Math.max(current[1], result[i][1]);
        } else {
            resultFinal += current[1] - current[0];
            current = result[i];
        }
    }
    
    resultFinal += current[1] - current[0];

    return resultFinal;
}

const ySoluce = 2948438; //found with brut force
console.log(getResult(ySoluce));

// 2 843 633 is X
// 2 948 438 is Y

console.log(2843633 * 4000000 + 2948438);

// < 11793754843633