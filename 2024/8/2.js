const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((elt) => elt.split(''));


const antinodes = input.map((elt) => elt.map((elt) => '.'));

const antennas = new Map();

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] != '.') {
          antennas.set(input[i][j], antennas.get(input[i][j]) ? antennas.get(input[i][j]): []);
          antennas.get(input[i][j]).push([i, j]);
        }
    }
}

antennas.forEach((value, key) => {
  for (let i = 0; i < value.length; i++) {
    const [x1, y1] = value[i];
    for (let j = i + 1; j < value.length; j++) {
      const [x2, y2] = value[j];
      antinodes[x1][y1] = '#';
      antinodes[x2][y2] = '#';
      let xMin, xMax, yMin, yMax, p1, p2;
      if (x1 < x2 && y1 < y2 || x1 > x2 && y1 > y2) {
        //diag \
        xMin = Math.min(x1, x2);
        xMax = Math.max(x1, x2);
        yMin = Math.min(y1, y2);
        yMax = Math.max(y1, y2);
        p1 = [xMin - Math.abs(xMax - xMin), yMin - Math.abs(yMax - yMin)];
        p2 = [xMax + Math.abs(xMax - xMin), yMax + Math.abs(yMax - yMin)];
        while (true) {
          console.log(p1, p2);
          let canContinue = false;
          if (p1[0] >= 0 && p1[0] < input.length && p1[1] >= 0 && p1[1] < input[0].length) {
            antinodes[p1[0]][p1[1]] = '#';
            canContinue = true;
          }
          if (p2[0] >= 0 && p2[0] < input.length && p2[1] >= 0 && p2[1] < input[0].length) {
            antinodes[p2[0]][p2[1]] = '#';
            canContinue = true;
          }
          if (!canContinue) {
            break;
          }
          p1 = [p1[0] - Math.abs(xMax - xMin), p1[1] - Math.abs(yMax - yMin)];
          p2 = [p2[0] + Math.abs(xMax - xMin), p2[1] + Math.abs(yMax - yMin)];
        }
        
      } else {
        //diag /
        xMin = Math.min(x1, x2);
        xMax = Math.max(x1, x2);
        yMin = Math.max(y1, y2);
        yMax = Math.min(y1, y2);
        p1 = [xMax + (xMax - xMin), yMax + (yMax - yMin)];
        p2 = [xMin - (xMax - xMin), yMin - (yMax - yMin)];
        while (true) {
          let canContinue = false;
          if (p1[0] >= 0 && p1[0] < input.length && p1[1] >= 0 && p1[1] < input[0].length) {
            antinodes[p1[0]][p1[1]] = '#';
            canContinue = true;
          }
          if (p2[0] >= 0 && p2[0] < input.length && p2[1] >= 0 && p2[1] < input[0].length) {
            antinodes[p2[0]][p2[1]] = '#';
            canContinue = true;
          }
          if (!canContinue) {
            break;
          }
          p1 = [p1[0] + (xMax - xMin), p1[1] + (yMax - yMin)];
          p2 = [p2[0] - (xMax - xMin), p2[1] - (yMax - yMin)];
        }
      }
      
      
    }
  }
});

console.log(antinodes.map((elt) => elt.join('')).join('\n'));
console.log(antinodes.reduce((acc, elt) => acc + elt.filter((elt) => elt == '#').length, 0));

// 4 8   - 5 5    -> 6 2      => 5 + (6 - 5)   5 - (8 - 5)