document.addEventListener("DOMContentLoaded", function () {
    showStats();
});
// Fuction constructor
var timer;
var playerName = '';
var life = 10;
var attack = 'attack';
var pw = 1;
var counter = 0;
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
        "gold": 1,
        "pw": 2
    },
    skills: {
        melee: {
            "lvl": 1,
            "exp": 0,
        },
        spells: {
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
        }
    }
};


let enemy = {
    stats: {
        "maxHp": 10,
        "currentHp": 10,
        "pw": 1
    }
};

const skillExp = {
    1: 0,
    2: 5,
    3: 11,
    4: 20,
    5: 35,
    6: 55,
    7: 85,
    8: 130,
    9: 190,
    10: 270,
    11: 370,
};
// Because skillExp is an object, not an array, we have to get the keys (as an array), and get the last value.
// Saves performing this lookup (on a static set of values) every time it is needed.
// If you add more levels, this will always return the last one.
const maxSkillLevel = parseInt(Object.keys(skillExp)[Object.keys(skillExp).length - 1]);

// Use a shortcut to get to the common things you wish to access; reduces code and easier to read.
// Could reduce further to gold, currentEnergy, etc. if you think it applicable.
let pStats = player.stats;
let pSkills = player.skills;
let eStats = enemy.stats;
let eSkills = enemy.skills;

// Get the DOM Elements into variables once; not every time you want to access them.
let elemLevel = document.getElementById('level');
let elemTotalExp = document.getElementById('totalExp');
let elemCurrentHp = document.getElementById('currentHp');
let elemMaxHp = document.getElementById('maxHp');
let elemCurrentEnergy = document.getElementById('currentEnergy');
let elemMaxEnergy = document.getElementById('maxEnergy');
let elemGold = document.getElementById('gold');
let elemMelee = document.getElementById('melee');
let elemSpells = document.getElementById('spells');
let elemArchery = document.getElementById('archery');
let elemFishing = document.getElementById('fishing');
let elemMining = document.getElementById('mining');
let elemCrafting = document.getElementById('crafting');
let elemCurrentGold = document.getElementById('current-gold');
let elemInfo = document.getElementById('info');

function begin(){
    document.getElementById("td-player-life").innerHTML ="HP: "+player.stats.currentHp+"/"+player.stats.maxHp;
    document.getElementById("td-enemy-life").innerHTML ="HP: "+enemy.stats.currentHp+"/"+enemy.stats.maxHp;
    document.getElementById("td-player-pw").innerHTML ="Power: " + pw;
    document.getElementById("td-enemy-pw").innerHTML = "Power: " + pw;

}

// REFILL PLAYERS ENERGY
function addEnergy() {
    pStats.currentEnergy = 100;
    pStats.gold -= 100;
    elemInfo.textContent = "";
    showStats();
}
function setPlayerName() {
    var x = document.getElementById("myName").value;
    document.getElementById("playerName").innerHTML = x;
    document.getElementById("myName").style.display = "none";
    document.getElementById('setName').style.display = 'none';
    return playerName;
}
function hit() {
    
    elemGold.textContent = pStats.gold;
    elemCurrentEnergy.textContent = pStats.currentEnergy;
    document.getElementById("td-player-life").innerHTML ="HP: "+player.stats.currentHp+"/"+player.stats.maxHp;
    document.getElementById("td-enemy-life").innerHTML ="HP: "+enemy.stats.currentHp+"/"+enemy.stats.maxHp;
    if (pStats.currentEnergy <= 9){
    document.getElementById("updateText").innerHTML ="You need more energy please wait a few then try again";}
        else{
            pStats.currentEnergy = pStats.currentEnergy -10;
            eStats.currentHp = eStats.currentHp - pStats.pw;
            pStats.currentHp = pStats.currentHp - eStats.pw;
            
        }
    if (pStats.currentHp <= 0) {
        alert("GAME OVER!");
    }
    if (eStats.currentHp <= 0) {
        pStats.experience++;
        pSkills.fighting++;
        pStats.gold++;
        eStats.currentHp = 10;
    }
    pStats.gold= pStats.gold;
    console.log(pStats.gold);

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
    elemLevel.textContent = pStats.level;
    elemTotalExp.textContent = pStats.experience;
    elemCurrentHp.textContent = pStats.currentHp;
    elemMaxHp.textContent = pStats.maxHp;
    elemCurrentEnergy.textContent = pStats.currentEnergy;
    elemMaxEnergy.textContent = pStats.maxEnergy;
    elemGold.textContent = pStats.gold;
    elemMelee.textContent = skills.melee.lvl;
    elemSpells.textContent = skills.spells.lvl;
    elemArchery.textContent = skills.archery.lvl;
    elemFishing.textContent = skills.fishing.lvl;
    elemMining.textContent = skills.mining.lvl;
    elemCrafting.textContent = skills.crafting.lvl;
    document.getElementById("td-player-life").innerHTML ="HP: "+player.stats.currentHp+"/"+player.stats.maxHp;
    document.getElementById("td-enemy-life").innerHTML ="HP: "+enemy.stats.currentHp+"/"+enemy.stats.maxHp;



}

(function(){
    if(pStats.currentEnergy <= 100){
    pStats.currentEnergy++;
    if(pStats.currentEnergy >= 100){
        pStats.currentEnergy= 100;
    }

    setTimeout(arguments.callee, 600);
    }
})();

setInterval(function(){
    showStats();
}, 1000);

console.log(pStats.Energy);








