const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()

module.exports = {
    input,
};

const tab = [];

let index = 0;

function isEmpty(line) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== ".") {
            return false;
        }
    }
    return true;
}

function addIndex() {
    index++;
    if (index >= input.length) {
        index = 0;
    }
}

for (let i = 0; i < 2022; i++) {
    tab.unshift(new Array(7).fill("."));
    tab.unshift(new Array(7).fill("."));
    tab.unshift(new Array(7).fill("."));

    let colonneSize = -1;

    switch (i % 5) {
        case 0:
            tab.unshift([".", ".", "@", "@", "@", "@", "."]);
            colonneSize = 1;
            break;
        case 1:
            tab.unshift([".", ".", ".", "@", ".", ".", "."]);
            tab.unshift([".", ".", "@", "@", "@", ".", "."]);
            tab.unshift([".", ".", ".", "@", ".", ".", "."]);
            colonneSize = 3;
            break;
        case 2:
            tab.unshift([".", ".", "@", "@", "@", ".", "."]);
            tab.unshift([".", ".", ".", ".", "@", ".", "."]);
            tab.unshift([".", ".", ".", ".", "@", ".", "."]);
            colonneSize = 3;
            break;
        case 3:
            tab.unshift([".", ".", "@", ".", ".", ".", "."]);
            tab.unshift([".", ".", "@", ".", ".", ".", "."]);
            tab.unshift([".", ".", "@", ".", ".", ".", "."]);
            tab.unshift([".", ".", "@", ".", ".", ".", "."]);
            colonneSize = 4;
            break;
        case 4:
            tab.unshift([".", ".", "@", "@", ".", ".", "."]);
            tab.unshift([".", ".", "@", "@", ".", ".", "."]);
            colonneSize = 2;
            break;
        default:
            throw new Error("Error");
    }

    logTab("The rock begins falling:", i == 21);

    let canMove = true;
    let notInfiniteLoop = 0;
    let currentIndexTab = 0;

    while (canMove && notInfiniteLoop < 1000) {
        notInfiniteLoop++;
        //Move right or left
        switch (input[index]) {
            case ">":
                if (canMoveRight(currentIndexTab, colonneSize)) {
                    for (let j = currentIndexTab; j < currentIndexTab + colonneSize; j++) {
                        const line = tab[j];
                        for (let k = line.length - 2; k >= 0; k--) {
                            if (line[k] === "@") {
                                line[k] = ".";
                                line[k + 1] = "@";                                
                            }
                        }
                    }
                    //console.log("Jet of gas pushes rock right:");
                } //else console.log("Jet of gas pushes rock right, but nothing happens:");
                break;
            case "<":
                if (canMoveLeft(currentIndexTab, colonneSize)) {
                    for (let j = currentIndexTab; j < currentIndexTab + colonneSize; j++) {
                        const line = tab[j];
                        for (let k = 1; k < line.length; k++) {
                            if (line[k] === "@") {
                                line[k] = ".";
                                line[k - 1] = "@";                                
                            }
                        }
                    }
                    //console.log("Jet of gas pushes rock left:");
                } //else console.log("Jet of gas pushes rock left, but nothing happens:");
                break;
            default:
                throw new Error("Error", input[index]);
        }
        logTab("Jet of gas pushes rock", i == 21);

        //Move down
        if (currentIndexTab + colonneSize < tab.length && canMoveDown(currentIndexTab, colonneSize)) {
            for (let j = currentIndexTab + colonneSize - 1; j >= currentIndexTab; j--) {
                const line = tab[j];
                const lineBelow = tab[j + 1];
                for (let k = 0; k < line.length; k++) {
                    if (line[k] === "@") {
                        line[k] = ".";
                        lineBelow[k] = "@";
                    }
                }            
            }
            //console.log("Rock falls 1 unit:");
        } else {
            //console.log("Rock falls 1 unit, causing it to come to rest:")
            canMove = false;
        }

        //transform @ to #
        if (!canMove) {
            for (let j = currentIndexTab; j < currentIndexTab + colonneSize; j++) {
                const line = tab[j];
                for (let k = 0; k < line.length; k++) {
                    if (line[k] === "@") {
                        line[k] = "#";
                    }
                }
            }
        }
        logTab(canMove ? "Rock falls 1 unit:" : "Rock falls 1 unit, causing it to come to rest:", i == 21);

        addIndex();
        currentIndexTab++;
    }

    while (isEmpty(tab[0])) {
        tab.shift();
    }
    
    if (notInfiniteLoop >= 100) {
        console.log("Infinite loop");
    }
}

function canMoveDown(currentIndexTab, colonneSize) {
    for (let i = currentIndexTab; i < currentIndexTab + colonneSize; i++) {
        const line = tab[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === "@") {
                if (tab[i + 1][j] === "#") {
                    return false;
                }
            }
        }
    }
    return true;
}

function logTab(msg, log) {
    if (false) {
        if (msg != null) console.log(msg);
        tab.slice(0, 20).forEach((line) => {
            console.log(line.join(""));
        });
        console.log("\n");
    }
}

function canMoveRight(currentIndexTab, colonneSize) {
    for (let i = currentIndexTab; i < currentIndexTab + colonneSize; i++) {
        const line = tab[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === "@") {
                if (j === line.length - 1) {
                    return false;
                }
                if (line[j + 1] === "#") {
                    return false;
                }
            }
        }
    }
    return true;
}

function canMoveLeft(currentIndexTab, colonneSize) {
    for (let i = currentIndexTab; i < currentIndexTab + colonneSize; i++) {
        const line = tab[i];
        for (let j = 0; j < line.length; j++) {
            if (line[j] === "@") {
                if (j === 0) {
                    return false;
                }
                if (line[j - 1] === "#") {
                    return false;
                }
            }
        }
    }
    return true;
}

tab.forEach((line) => {
    console.log(line.join(""));
});
console.log(tab.length);