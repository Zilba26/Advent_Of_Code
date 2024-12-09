const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((row) => row.split(''));

module.exports = {
    input,
};

class SearchBuilder {
    iIncrement;
    jIncrement;

    static UP = new SearchBuilder(0,-1);
    static UP_RIGHT = new SearchBuilder(1,-1);
    static RIGHT = new SearchBuilder(1,0);
    static DOWN_RIGHT = new SearchBuilder(1,1);
    static DOWN = new SearchBuilder(0,1);
    static DOWN_LEFT = new SearchBuilder(-1,1);
    static LEFT = new SearchBuilder(-1,0);
    static UP_LEFT = new SearchBuilder(-1,-1);

    constructor(i, j) {
        this.iIncrement = i;
        this.jIncrement = j;
    }

    search(tab, i, j) {
        function _increAndSearchLetter(letter, iIncrement, jIncrement) {
            i += iIncrement;
            j += jIncrement;
            if (i < 0 || j < 0 || i >= tab.length || j >= tab[i].length) return false;
            return tab[i][j] === letter;
        }
        if (tab[i][j] != "X") return false;
        if (!_increAndSearchLetter("M", this.iIncrement, this.jIncrement)) return false;
        if (!_increAndSearchLetter("A", this.iIncrement, this.jIncrement)) return false;
        return _increAndSearchLetter("S", this.iIncrement, this.jIncrement);
    }
}

let result = 0;

for (let i = 0 ; i < input.length ; i++) {
    for (let j = 0 ; j < input[i].length ; j++) {
        result += SearchBuilder.DOWN.search(input, i, j);
        result += SearchBuilder.DOWN_LEFT.search(input, i, j);
        result += SearchBuilder.DOWN_RIGHT.search(input, i, j);
        result += SearchBuilder.UP.search(input, i, j);
        result += SearchBuilder.UP_LEFT.search(input, i, j);
        result += SearchBuilder.UP_RIGHT.search(input, i, j);
        result += SearchBuilder.RIGHT.search(input, i, j);
        result += SearchBuilder.LEFT.search(input, i, j);
    }
}

console.log(result);