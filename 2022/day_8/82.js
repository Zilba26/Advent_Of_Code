const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map(elt => elt.replace("\r", "").split(""));

module.exports = {
    input,
};

let result = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        let tree = input[i][j];
        let right = 0;
        let down = 0;
        let left = 0;
        let up = 0;

        //looking at the right
        for (let k = j + 1 ; k < input[0].length ; k++) {
            right++;
            if (input[i][k] >= tree) {
                break;
            }
        }

        //looking at the left
        for (let k = j - 1 ; k >= 0 ; k--) {
            left++;
            if (input[i][k] >= tree) {
                break;
            }
        }

        //looking at the down
        for (let k = i + 1 ; k < input.length ; k++) {
            down++;
            if (input[k][j] >= tree) {
                break;
            }
        }

        //looking at the up
        for (let k = i - 1 ; k >= 0 ; k--) {
            up++;
            if (input[k][j] >= tree) {
                break;
            }
        }

        result = Math.max(result, right * down * left * up);
    }
}

console.log(result);