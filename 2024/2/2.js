const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((elt) => elt.split(' '));

let result = 0;

function testIncrease(tab) {
  for (let j = 1; j < tab.length; j++) {
    const diff = tab[j-1] - tab[j];
    if (!(diff > 0 && diff <= 3)) {
      return false;
    }
  }
  return true;
}

function testDecrease(tab) {
  for (let j = 1; j < tab.length; j++) {
    const diff = tab[j] - tab[j-1];
    if (!(diff > 0 && diff <= 3)) {
      return false;
    }
  }
  return true;
}

for (let i = 0; i < input.length; i++) {
  const tab = input[i].map((elt) => parseInt(elt));
    let correct = testIncrease(tab);
    if (!correct) {
      for (let j = 0; j < tab.length; j++) {
        correct = testIncrease(tab.slice(0, j).concat(tab.slice(j+1)));
        if (correct) {
          break;
        }
      }
    }
    if (correct) {
      result++;
      continue;
    }
    correct = testDecrease(tab);
    if (!correct) {
      for (let j = 0; j < tab.length; j++) {
        correct = testDecrease(tab.slice(0, j).concat(tab.slice(j+1)));
        if (correct) {
          break;
        }
      }
    }
    if (correct) {
      result++;
    }
  
}

console.log(result);