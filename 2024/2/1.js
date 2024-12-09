const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((elt) => elt.split(' '));

let result = 0;

for (let i = 0; i < input.length; i++) {
  const tab = input[i].map((elt) => parseInt(elt));
  if (tab[0] > tab[1]) {
    let correct = true;
    for (let j = 1; j < tab.length; j++) {
      const diff = tab[j-1] - tab[j];
      if (!(diff > 0 && diff <= 3)) {
        correct = false;
        break;
      }
    }
    if (correct) {
      result++;
    }
  } else {
    let correct = true;
    for (let j = 1; j < tab.length; j++) {
      const diff = tab[j] - tab[j-1];
      if (!(diff > 0 && diff <= 3)) {
        correct = false;
        break;
      }
    }
    if (correct) {
      result++;
    }
  }
}

console.log(result);