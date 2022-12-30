const path = require('path');
const fs = require('fs');

let input = fs
    .readFileSync(path.join(__dirname, 'inputTest.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.replace('/r', '').replace(":", "").split(" ").map((x) => parseInt(x)).filter((x) => !isNaN(x)));

module.exports = {
    input,
};

class Blueprint {
    constructor(id, oreCost, clayCost, obsidianCost, geodeCost) {
        this.id = id;
        this.oreCost = oreCost;
        this.clayCost = clayCost;
        this.obsidianCost = obsidianCost;
        this.geodeCost = geodeCost;
    }
}

class BlueprintPosibility {
    constructor(blueprint, minutesPassed = 0, ore = 0, clay = 0, obsidian = 0, geode = 0, oreRobot = 1, clayRobot = 0, obsidianRobot = 0, geodeRobot = 0) {
        this.blueprint = blueprint;
        this.minutesPassed = minutesPassed;
        this.ore = ore;
        this.clay = clay;
        this.obsidian = obsidian;
        this.geode = geode;
        this.oreRobot = oreRobot;
        this.clayRobot = clayRobot;
        this.obsidianRobot = obsidianRobot;
        this.geodeRobot = geodeRobot;
    }

    canBuyOreRobot() {
        return this.ore >= this.blueprint.oreCost;
    }

    canBuyClayRobot() {
        return this.ore >= this.blueprint.clayCost;
    }

    canBuyObsidianRobot() {
        return this.ore >= this.blueprint.obsidianCost[0] && this.clay >= this.blueprint.obsidianCost[1];
    }

    canBuyGeodeRobot() {
        return this.ore >= this.blueprint.geodeCost[0] && this.obsidian >= this.blueprint.geodeCost[1];
    }

    canBuyAll() {
        return this.canBuyOreRobot() && this.canBuyClayRobot() && this.canBuyObsidianRobot() && this.canBuyGeodeRobot();
    }

    buyOreRobot() {
        if (this.canBuyOreRobot()) {
            this.ore -= this.blueprint.oreCost;
            this.oreRobot++;
        } else throw new Error("Not enough ore");
    }

    buyClayRobot() {
        if (this.canBuyClayRobot()) {
            this.ore -= this.blueprint.clayCost;
            this.clayRobot++;
        } else throw new Error("Not enough ore");
    }

    buyObsidianRobot() {
        if (this.canBuyObsidianRobot()) {
            this.ore -= this.blueprint.obsidianCost[0];
            this.clay -= this.blueprint.obsidianCost[1];
            this.obsidianRobot++;
        } else throw new Error("Not enough ore or clay");
    }

    buyGeodeRobot() {
        if (this.canBuyGeodeRobot()) {
            this.ore -= this.blueprint.geodeCost[0];
            this.obsidian -= this.blueprint.geodeCost[1];
            this.geodeRobot++;
        } else throw new Error("Not enough ore or obsidian");
    }

    getAllPossibilities() {
        this.minutesPassed++;
        const currentOre = this.oreRobot;
        const currentClay = this.clayRobot;
        const currentObsidian = this.obsidianRobot;
        const currentGeode = this.geodeRobot;
        
        const allPosibilities = [];

        if (!this.canBuyAll()) allPosibilities.push(this.copy());

        //buy only ore robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            allPosibilities.push(copy);
        }

        //buy only clay robot
        if (this.canBuyClayRobot()) {
            const copy = this.copy();
            copy.buyClayRobot();
            allPosibilities.push(copy);
        }

        //buy only obsidian robot
        if (this.canBuyObsidianRobot()) {
            const copy = this.copy();
            copy.buyObsidianRobot();
            allPosibilities.push(copy);
        }

        //buy only geode robot
        if (this.canBuyGeodeRobot()) {
            const copy = this.copy();
            copy.buyGeodeRobot();
            allPosibilities.push(copy);
        }

        //buy ore and clay robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyClayRobot()) {
                copy.buyClayRobot();
                allPosibilities.push(copy);
            }
        }

        //buy ore and obsidian robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyObsidianRobot()) {
                copy.buyObsidianRobot();
                allPosibilities.push(copy);
            }
        }

        //buy ore and geode robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyGeodeRobot()) {
                copy.buyGeodeRobot();
                allPosibilities.push(copy);
            }
        }

        //buy clay and obsidian robot
        if (this.canBuyClayRobot()) {
            const copy = this.copy();
            copy.buyClayRobot();
            if (copy.canBuyObsidianRobot()) {
                copy.buyObsidianRobot();
                allPosibilities.push(copy);
            }
        }

        //buy clay and geode robot
        if (this.canBuyClayRobot()) {
            const copy = this.copy();
            copy.buyClayRobot();
            if (copy.canBuyGeodeRobot()) {
                copy.buyGeodeRobot();
                allPosibilities.push(copy);
            }
        }

        //buy obsidian and geode robot
        if (this.canBuyObsidianRobot()) {
            const copy = this.copy();
            copy.buyObsidianRobot();
            if (copy.canBuyGeodeRobot()) {
                copy.buyGeodeRobot();
                allPosibilities.push(copy);
            }
        }

        //buy ore, clay and obsidian robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyClayRobot()) {
                copy.buyClayRobot();
                if (copy.canBuyObsidianRobot()) {
                    copy.buyObsidianRobot();
                    allPosibilities.push(copy);
                }
            }
        }

        //buy ore, clay and geode robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyClayRobot()) {
                copy.buyClayRobot();
                if (copy.canBuyGeodeRobot()) {
                    copy.buyGeodeRobot();
                    allPosibilities.push(copy);
                }
            }
        }

        //buy ore, obsidian and geode robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyObsidianRobot()) {
                copy.buyObsidianRobot();
                if (copy.canBuyGeodeRobot()) {
                    copy.buyGeodeRobot();
                    allPosibilities.push(copy);
                }
            }
        }

        //buy clay, obsidian and geode robot
        if (this.canBuyClayRobot()) {
            const copy = this.copy();
            copy.buyClayRobot();
            if (copy.canBuyObsidianRobot()) {
                copy.buyObsidianRobot();
                if (copy.canBuyGeodeRobot()) {
                    copy.buyGeodeRobot();
                    allPosibilities.push(copy);
                }
            }
        }

        //buy ore, clay, obsidian and geode robot
        if (this.canBuyOreRobot()) {
            const copy = this.copy();
            copy.buyOreRobot();
            if (copy.canBuyClayRobot()) {
                copy.buyClayRobot();
                if (copy.canBuyObsidianRobot()) {
                    copy.buyObsidianRobot();
                    if (copy.canBuyGeodeRobot()) {
                        copy.buyGeodeRobot();
                        allPosibilities.push(copy);
                    }
                }
            }
        }

        allPosibilities.forEach((posibility) => {
            posibility.ore += currentOre;
            posibility.clay += currentClay;
            posibility.obsidian += currentObsidian;
            posibility.geode += currentGeode;
        });
        return allPosibilities;
    }

    copy() {
        return new BlueprintPosibility(this.blueprint, this.minutesPassed, this.ore, this.clay, this.obsidian, this.geode, this.oreRobot, this.clayRobot, this.obsidianRobot, this.geodeRobot);
    }
}

const blueprints = [];

for (let i = 0; i < input.length; i++) {
    blueprints.push(new Blueprint(input[i][0], input[i][1], input[i][2], input[i].slice(3, 5), input[i].slice(5, 7)));
}

let blueprintPosibilities = [];
let notInfiniteLoop = 0;
const maxLoop = 100000;
const result = [];

for (let i = 0; i < blueprints.length; i++) {
    const blueprintPosibility = new BlueprintPosibility(blueprints[i]);
    blueprintPosibilities.push(blueprintPosibility);
    while (blueprintPosibilities[0].minutesPassed < 24 && notInfiniteLoop < maxLoop) {
        notInfiniteLoop++;
        const currentBlueprintPosibility = blueprintPosibilities.shift();
        const allPosibilities = currentBlueprintPosibility.getAllPossibilities();
        blueprintPosibilities = blueprintPosibilities.concat(...allPosibilities);
        if (notInfiniteLoop % 10000 === 0) {
            console.log(notInfiniteLoop/maxLoop*100 + "%");
            console.log(blueprintPosibilities.length);
            console.log(blueprintPosibilities[0].minutesPassed);
        }
    }
    result.push(Math.max(...blueprintPosibilities.map((blueprintPosibility) => blueprintPosibility.geode)));
}

if (notInfiniteLoop >= maxLoop) console.log("Infinite loop detected");

console.log(result);