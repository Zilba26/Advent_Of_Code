const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((elt) => elt.split(' '));

const wide = 101;
const tall = 103;
const map = Array.from({ length: tall }, () => Array.from({ length: wide }, () => 0));
const seconds = 100;

for (let line of input) {
  const i = parseInt(line[0].split(',')[1]);
  const j = parseInt(line[0].split('=')[1].split(',')[0]);
  const vi = parseInt(line[1].split(',')[1]);
  const vj = parseInt(line[1].split('=')[1].split(',')[0]);

  const x = i + vi * seconds;
  const y = j + vj * seconds;

  const xIndex = x % tall < 0 ? x % tall + tall : x % tall;
  const yIndex = y % wide < 0 ? y % wide + wide : y % wide;

  map[xIndex][yIndex] += 1;
}

console.log(map.map((elt) => elt.join('')).join('\n'));

const quadrants = map.reduce((acc, elt1, i) => {
  elt1.forEach((elt2, j) => {
    if (i < (tall - 1) / 2 && j < (wide - 1) / 2) acc[0] += elt2;
    if (i < (tall - 1) / 2 && j > (wide - 1) / 2) acc[1] += elt2;
    if (i > (tall - 1) / 2 && j < (wide - 1) / 2) acc[2] += elt2;
    if (i > (tall - 1) / 2 && j > (wide - 1) / 2) acc[3] += elt2;
  });
  return acc;
}, [0, 0, 0, 0]);

console.log(quadrants);
console.log(quadrants.reduce((acc, elt) => acc * elt, 1));