const path = require('path');
const fs = require('fs');
const { default: test } = require('node:test');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');


function testMatch(testValue, operator, nbsTab) {
  const nbs = [...nbsTab];
  //console.log(testValue, operator, nbs);
  let nb;
  switch(operator) {
    case 'plus':
      nb = nbs[0] + nbs[1];
      break;
    case 'fois':
      nb = nbs[0] * nbs[1];
      break;
    default:
      throw new Error('Unknown operator');
  }
  nbs.shift();
  nbs.shift();
  nbs.unshift(nb);
  if (nbs.length === 1) {
    return nbs[0] === testValue;
  } else {
    return testMatch(testValue, 'plus', nbs) || testMatch(testValue, 'fois', nbs);
  }
}

let result = [];

for (let line of input) {
    let [testValue, nbs] = line.split(': ');
    testValue = parseInt(testValue);
    const nbsTab = nbs.split(' ').map(Number);
    if (testMatch(testValue, 'plus', nbsTab) || testMatch(testValue, 'fois', nbsTab)) {
      result.push(testValue);
    }
}

console.log(result);
console.log(result.reduce((acc, val) => acc + val, 0));


/*
3267 :
  - rec(3267, plus, [81 40 27]) {
    - rec(3267, plus, [121, 27]) => false
    - rec(3267, fois, [121, 27]) => true
  }
  - rec(3267, fois, [81 40 27]) {
    - rec(3267, plus, [121, 27]) => true
    - rec(3267, fois, [121, 27]) => false
  }
*/