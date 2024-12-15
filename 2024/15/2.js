const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n\n');

const baseMap = input[0].split('\n').map((row) => row.split(''));
const instructions = input[1].split('\n').join('').split('');

const map = [];
for (let i = 0; i < baseMap.length; i++) {
  map.push([]);
  for (let j = 0; j < baseMap[0].length; j++) {
    switch (baseMap[i][j]) {
      case '#':
        map[i].push('#');
        map[i].push('#');
        break;
      case '.':
        map[i].push('.');
        map[i].push('.');
        break;
      case 'O':
        map[i].push('[');
        map[i].push(']');
        break;
      case '@':
        map[i].push('@');
        map[i].push('.');
        break;
      default:
        throw new Error('Invalid cell : ' + baseMap[i][j]);
    }
  }
}

//console.log('Initial state :');
//console.log(map.map((row) => row.join('')).join('\n'));

const robot = [];
robot.push(map.findIndex((row) => row.includes('@')));
robot.push(map[robot[0]].indexOf('@'));

function tryToPushUpOrDown(i, j, dir, notNext) {
  const p = map[i][j];
  if (map[i + dir][j] === '#') throw new Error('Cannot push ' + p + ' down');
  let result = [[i, j]];
  if (!notNext) {
    if (p === '[') {
      result = result.concat(tryToPushUpOrDown(i, j + 1, dir, true));
    } else if (p === ']') {
      result = result.concat(tryToPushUpOrDown(i, j - 1, dir, true));
    }
  }
  
  if (['[', ']'].includes(map[i + dir][j])) {
    result = result.concat(tryToPushUpOrDown(i + dir, j, dir));
  }
  return result;
}

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
  } else if (map[robot[0] + xDir][robot[1] + yDir] != '#') {
    if (xDir === 0) {
      let indexX = robot[0];
      let indexY = robot[1] + yDir;
      while (['[', ']'].includes(map[indexX][indexY])) {
        indexY += yDir;
      }
      if (map[indexX][indexY] === '.') {
        while (indexY !== robot[1]) {
          map[indexX][indexY] = map[indexX][indexY - yDir];
          indexY -= yDir;
        }
        robot[1] += yDir;
      }
    } else {
      let indexX = robot[0] + xDir;
      try {
        const result = tryToPushUpOrDown(indexX, robot[1], xDir);
        const uniqueCoordinates = Array.from(
          new Set(result.map(coord => JSON.stringify(coord)))
        ).map(str => JSON.parse(str));
        uniqueCoordinates.sort((a, b) => xDir * (b[0] - a[0]));
        uniqueCoordinates.forEach(coord => {
          map[coord[0] + xDir][coord[1]] = map[coord[0]][coord[1]];
          map[coord[0]][coord[1]] = '.';
        });
        robot[0] += xDir;
      } catch {
        //can't push
      }
    }
  }

  map[robot[0]][robot[1]] = '@';

  //console.log('\nMove ' + dir + ' :');
  //console.log(map.map((row) => row.join('')).join('\n'));
}

console.log(map.map((row) => row.join('')).join('\n'));

const result = map.reduce((acc, row, i) => {
  return acc + row.reduce((acc, cell, j) => acc + (cell === '[' ? 100 * i + j : 0), 0);
}, 0);

console.log(result);