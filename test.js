document.addEventListener("DOMContentLoaded", function () {
    showStats();
});

let player = {
    stats: {
        "level": 1,
        "experience": 0,
        "maxHp": 100,
        "currentHp": 100,
        "maxEnergy": 100,
        "currentEnergy": 100,
        "maxMana": 100,
        "currentMana": 100,
        "gold": 100,
        "diamonds": 0,
    },
    skills: {
        fighting: {
            "lvl": 1,
            "exp": 0,
        },
        spellcasting: {
            "lvl": 1,
            "exp": 0,
        },
        archery: {
            "lvl": 1,
            "exp": 0,
        },
        fishing: {
            "lvl": 1,
            "exp": 0,
        },
        mining: {
            "lvl": 1,
            "exp": 0,
        },
        crafting: {
            "lvl": 1,
            "exp": 0,
        },
    }
}; // Missing semicolon

const skillExp = {
    1: 0,
    2: 500,
    3: 1100,
    4: 2000,
    5: 3500,
    6: 5500,
    7: 8500,
    8: 13000,
    9: 19000,
    10: 27000,
    11: 37000,
}; // Missing semicolon

// Because skillExp is an object, not an array, we have to get the keys (as an array), and get the last value.
// Saves performing this lookup (on a static set of values) every time it is needed.
// If you add more levels, this will always return the last one.
const maxSkillLevel = parseInt(Object.keys(skillExp)[Object.keys(skillExp).length - 1]);

// Use a shortcut to get to the common things you wish to access; reduces code and easier to read.
// Could reduce further to gold, currentEnergy, etc. if you think it applicable.
let stats = player.stats;
let skills = player.skills;

// Get the DOM Elements into variables once; not every time you want to access them.
let elemLevel = document.getElementById('level');
let elemTotalExp = document.getElementById('totalExp');
let elemCurrentHp = document.getElementById('currentHp');
let elemMaxHp = document.getElementById('maxHp');
let elemCurrentEnergy = document.getElementById('currentEnergy');
let elemMaxEnergy = document.getElementById('maxEnergy');
let elemGold = document.getElementById('gold');
let elemDiamonds = document.getElementById('diamonds');
let elemFighting = document.getElementById('fighting');
let elemSpellcasting = document.getElementById('spellcasting');
let elemArchery = document.getElementById('archery');
let elemFishing = document.getElementById('fishing');
let elemMining = document.getElementById('mining');
let elemCrafting = document.getElementById('crafting');
let elemCurrentGold = document.getElementById('current-gold');
let elemInfo = document.getElementById('info');

// Remove main function - not required. Call mine function directly.

// REFILL PLAYERS ENERGY
function addEnergy() {
    stats.currentEnergy = 100;
    stats.gold -= 100;
    elemInfo.textContent = "";
    showStats();
}

// MINE ACTION
function mine() {
    // Removed minedGold and info variables from global scope, and now using them directly where needed.
    // Pass the minedGold and message values on to any function that requires them..
    var minedGold = 0;
    var message = "";
    if (stats.currentEnergy >= 10) {
        minedGold = Math.floor((Math.random() * 100) + (skills.mining.lvl * 2));
        stats.gold += minedGold;
        stats.currentEnergy -= 10;
        calculateExp(skills.mining, minedGold);
        showStats(); // Update stats when finished mining. No need to call this if mining didn't occur.
    }
    else {
        message = "Not enough energy";
    }
    // Removed call to mineInfo() from first if block;
    // Previously, (without curly braces around second if block), 
    // the second mineInfo() would be called even if it was called in the first block.
    // Only the first line of code after an if/else etc. will be called when matched, 
    // everything after will run as normal code - because not encased in a block.
    mineInfo(message, minedGold);
}

// DISPLAY MINING COMUNICATES
function mineInfo(message, minedGold) {
    // Pass in any message to display, rather than relying on a global variable (that some other action may change).
    // Same for minedGold.
    // This way, this function doesn't have to rely on variables outside of its scope, 
    // that could change or move in the future - Separation Of Concerns.
    elemCurrentGold.textContent = minedGold;
    elemInfo.textContent = message;
}

// ADD EXP AND CHECK FOR LVL UP
function calculateExp(skillName, expGained) {
    skillName.exp += expGained;
    // Update total experience too.
    stats.experience += expGained;
    // Remove loop. No need to iterate over every item in skillExp comparing values.

    // If player has more experience than the next level requires, level up.
    // A while loop allows for the case where the player's experience jumps more than one level from an experience gain.
    // And an additional check that the player's level is not at max.
    while (skillName.lvl < maxSkillLevel && skillName.exp > skillExp[skillName.lvl + 1]) {
        skillName.lvl++;
    }
}

// DISPLAY UPDATED STATS
function showStats() {
    // Use textContent rather than innerHTML.
    // If you need to place style tags etc. in your text (e.g <b>Hello world</b>), then innerHTML is the way to go.
    // But you should try to style the elements themselves rather than the text within.
    elemLevel.textContent = stats.level;
    elemTotalExp.textContent = stats.experience;
    elemCurrentHp.textContent = stats.currentHp;
    elemMaxHp.textContent = stats.maxHp;
    elemCurrentEnergy.textContent = stats.currentEnergy;
    elemMaxEnergy.textContent = stats.maxEnergy;
    elemGold.textContent = stats.gold;
    elemDiamonds.textContent = stats.diamonds;
    elemFighting.textContent = skills.fighting.lvl;
    elemSpellcasting.textContent = skills.spellcasting.lvl;
    elemArchery.textContent = skills.archery.lvl;
    elemFishing.textContent = skills.fishing.lvl;
    elemMining.textContent = skills.mining.lvl;
    elemCrafting.textContent = skills.crafting.lvl;
}