const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

const map = input[0].split('\n').map((row) => row.split(''));
const instructions = input[1].split('\n').join('').split('');

//console.log('Initial state :');
//console.log(map.map((row) => row.join('')).join('\n'));

const robot = [];
robot.push(map.findIndex((row) => row.includes('@')));
robot.push(map[robot[0]].indexOf('@'));

for (let dir of instructions) {
  let xDir;
  let yDir;
  switch (dir) {
    case '<':
      xDir = 0;
      yDir = -1;
      break;
    case '>':
      xDir = 0;
      yDir = 1;
      break;
    case '^':
      xDir = -1;
      yDir = 0;
      break;
    case 'v':
      xDir = 1;
      yDir = 0;
      break;
    default:
      throw new Error('Invalid direction : ' + dir);
  }
  map[robot[0]][robot[1]] = '.';

  if (map[robot[0] + xDir][robot[1] + yDir] === '.') {
    robot[0] += xDir;
    robot[1] += yDir;
  } else if (map[robot[0] + xDir][robot[1] + yDir] === 'O') {
    let indexX = robot[0] + xDir;
    let indexY = robot[1] + yDir;
    while (map[indexX][indexY] === 'O') {
      indexX += xDir;
      indexY += yDir;
    }
    if (map[indexX][indexY] === '.') {
      robot[0] += xDir;
      robot[1] += yDir;
      map[indexX][indexY] = 'O';
    }
  }

  map[robot[0]][robot[1]] = '@';

  //console.log('\nMove ' + dir + ' :');
  //console.log(map.map((row) => row.join('')).join('\n'));
}

console.log(map.map((row) => row.join('')).join('\n'));

const result = map.reduce((acc, row, i) => {
  return acc + row.reduce((acc, cell, j) => acc + (cell === 'O' ? 100 * i + j : 0), 0);
}, 0);

console.log(result);