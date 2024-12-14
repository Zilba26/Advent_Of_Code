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
let seconds = 0;
let indexTreated = [];

function getZone(i, j, map) {
  const letter = map[i][j];
  let area = 1;
  indexTreated.push(i + "-" + j);
  if (i > 0) {
      if (!indexTreated.includes((i-1) + "-" + j)) {
          const nextLetter = map[i-1][j];
          if (nextLetter === letter) {
              area += getZone(i - 1, j, map);
          }
      }
  }
  if (j > 0) {
      if (!indexTreated.includes(i + "-" + (j-1))) {
          const nextLetter = map[i][j-1];
          if (nextLetter === letter) {
              area += getZone(i, j - 1, map);
          }
      }
  }
  if (i < map.length - 1) {
      if (!indexTreated.includes((i+1) + "-" + j)) {
          const nextLetter = map[i+1][j];
          if (nextLetter === letter) {
              area += getZone(i + 1, j, map);
          }
      }
  }
  if (j < map[i].length - 1) {
      if (!indexTreated.includes(i + "-" + (j+1))) {
          const nextLetter = map[i][j+1];
          if (nextLetter === letter) {
              area += getZone(i, j + 1, map);
          }
      }
  }
  return area;
}

while (seconds < 150000) {
  const map = Array.from({ length: tall }, () => Array.from({ length: wide }, () => "."));

  for (let line of input) {
    const i = parseInt(line[0].split(',')[1]);
    const j = parseInt(line[0].split('=')[1].split(',')[0]);
    const vi = parseInt(line[1].split(',')[1]);
    const vj = parseInt(line[1].split('=')[1].split(',')[0]);
  
    const x = i + vi * seconds;
    const y = j + vj * seconds;
  
    const xIndex = x % tall < 0 ? x % tall + tall : x % tall;
    const yIndex = y % wide < 0 ? y % wide + wide : y % wide;
  
    map[xIndex][yIndex] = "#";

  }

  let maxCount = 0;
  map.forEach((line, i) => {
    line.forEach((elt, j) => {
      if (elt === "#" && !indexTreated.includes(i + "-" + j)) {
        const zone = getZone(i, j, map);
        if (zone > maxCount) maxCount = zone;
      }
    });
  });

  if (maxCount > 100) {
    console.log("Seconds ", seconds, maxCount);
    console.log(map.map((elt) => elt.join('')).join('\n'));
  }
  seconds++;
  indexTreated = [];
}

// > 5000
// < 8000