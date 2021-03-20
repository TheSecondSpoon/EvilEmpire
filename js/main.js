/* MODULE IMPORTS ------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import log, {stories, writeStory} from "./js/story.js";


/* VARIABLES ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

var gameData = {
    resources: {
        lumen: 0,
        research: 0,
    },
    buildings: {
        lumen: {
            upgrades: {
                torch: 0,
                campfire: 0,
                bonfire: 0,
            },
            costs: {
                torch: 10,
                campfire: 100,
                bonfire: 500,

                costincrease: {
                    torch: 1.15,
                    campfire: 1.15,
                    bonfire: 1.15,
                },
            },
            income: {
                torch: 1,
                campfire: 5,
                bonfire: 10,
            },
        },
        research: {
            upgrades:{
                workbench: false,

            },
            costs:{
                workbench: 5000,

                costincrease:{
                },
            },
            income:{

            }

        },
    },

    research: {
        upgrades: {
            blueflames: false,
        },
        costs: {
            blueflames: 500,

            costincrease: {

                blueflames: 1.25,
            },
        },
    },
};


/* LOG TESTS ---------------------------------------------------------------------------------------------------------------------------------------------------- */


/* EVENT LISTENERS  ----------------------------------------------------------------------------------------------------------------------------------------------------
        Basic
 */
document.getElementById("hitFlint").addEventListener("click", hitFlint);
document.getElementById("hitResearch").addEventListener('click', hitResearch);
document.getElementById("cheating100").addEventListener("click", function () {cheating(100);});
document.getElementById("cheating10000").addEventListener("click", function () {cheating(10000);});
document.getElementById("cheating10000000").addEventListener("click", function () {cheating(10000000);});
document.getElementById("deleteSave").addEventListener("click", deleteSave);
/*
        Upgrades
 */
document.getElementById("torchButton").addEventListener("click", function () {buildingUpgrade('lumen', 'torch', 'lumen')});
document.getElementById("campfireButton").addEventListener("click", function () {buildingUpgrade('lumen','campfire', 'lumen');});
document.getElementById("bonfireButton").addEventListener("click", function () {buildingUpgrade('lumen','bonfire', 'lumen');});
document.getElementById("researchWorkbench").addEventListener("click", function () {if (gameData.resources.lumen >= 5000){
    gameData.buildings.research.upgrades.workbench = true;
    gameData.resources.lumen -= 5000;
    disableElement("researchWorkbench");
    updateWebsite();
}});


/*
        Research
 */



/* WRITE STORY ---------------------------------------------------------------------------------------------------------------------------------------------------- */


/* Upgrade Functions ------------------------------------------------------------------------------------------------------------------------------------------- */
function buildingUpgrade(type, upgrade, resource){
    switch(type){
        case "lumen":
           standard_upgrade(type, upgrade, resource);
            break;

        case "research":
            standard_upgrade(type,upgrade,resource);
            break;
    }
}

function standard_upgrade(affects, upgrade, resource) {
    if (gameData.resources[resource] >= gameData.buildings[affects].costs[upgrade]) {
        gameData.buildings[affects].upgrades[upgrade] += 1;
        gameData.resources[resource] -= gameData.buildings[affects].costs[upgrade];
        gameData.buildings[affects].costs[upgrade] = Math.round(gameData.buildings[affects].costs[upgrade] * gameData.buildings[affects].costs.costincrease[upgrade]);
        updateWebsite();
    }
}
function research_upgrade(research, upgrade, resource){
    if (gameData.resources[resource] >= gameData.research.costs[upgrade]) {
        gameData.research.upgrades[upgrade] = true;
        gameData.resources[resource] -= gameData.research.costs[upgrade];
        updateWebsite();
    }
}

/* Unlock Functions ------------------------------------------------------------------------------------------------------------------------------------------- */

function unlockElement(id){
    var element = document.getElementById(id);
    element.classList.remove("nodisplay")
}

function disableElement(id){
    var element = document.getElementById(id);
    element.classList.add("disabled")
}
function buttonUnlock(){

}

function tabUnlock(){

}


/* UNSORTED FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------------------- */
function lumenPerSecond() {
    var upgrade = Object.values(gameData.buildings.lumen.upgrades);
    var income = Object.values(gameData.buildings.lumen.income);
    var lumenPerSecond = 0;

    for (var i = 0; i < upgrade.length; i++) {
        lumenPerSecond += upgrade[i] * income[i]
    }

    return lumenPerSecond

}

function cheating(amount) {
    gameData.resources.lumen += amount;
    updateWebsite();
}

function hitFlint() {
    gameData.resources.lumen += 1;
    updateWebsite();
}
function hitResearch() {
    gameData.resources.research += 1;
    updateWebsite();
}


function deleteSave() {
    localStorage.clear();
    location.reload(true);
}

function updateWebsite() {
    document.getElementById("lumen").innerHTML = "Lumen: " + gameData.resources.lumen + " (+" + lumenPerSecond() + " p/s)";
    document.getElementById("torchButton").innerHTML = "Create Torch (" + gameData.buildings.lumen.upgrades.torch + ")";
    document.getElementById("torchTool").innerHTML = "Generate 1 lumen per second<hr>Cost: " + gameData.buildings.lumen.costs.torch + " lumen";
    document.getElementById("campfireButton").innerHTML = "Create campfire (" + gameData.buildings.lumen.upgrades.campfire + ")";
    document.getElementById("campfireTool").innerHTML = "Generate 5 lumen per second<hr>Cost: " + gameData.buildings.lumen.costs.campfire + " lumen";
    document.getElementById("bonfireButton").innerHTML = "Create bonfire (" + gameData.buildings.lumen.upgrades.bonfire + ")";
    document.getElementById("bonfireTool").innerHTML = "Generate 10 lumen per second<hr>Cost: " + gameData.buildings.lumen.costs.bonfire + " lumen";
}


/* GAMELOOPS -------------------------------------------------------------------------------------------------------------------------------------------------------- */


var mainGameLoop = window.setInterval(function () {
    /* checks */
    if (gameData.resources.lumen >= 5){
        unlockElement("torch")
    }
    if (gameData.resources.lumen >= 50){
        unlockElement("campfire")
    }
    if (gameData.resources.lumen >= 250){
        unlockElement("bonfire")
    }


    if (gameData.buildings.lumen.upgrades.bonfire >= 1){
        unlockElement("nav")
    }
    if (gameData.buildings.lumen.upgrades.bonfire >= 1){
        unlockElement("navBuildings")
    }

    /* calculation */
    gameData.resources.lumen += lumenPerSecond();
    /* update */
    updateWebsite();
}, 1000);

var storyGameLoop = window.setInterval(function () {

    log(0);
    if (gameData.buildings.upgrades.torch >= 1) {
        log(1);
    }
    if (gameData.buildings.upgrades.campfire >= 1) {
        log(2);
    }
    if (gameData.buildings.upgrades.bonfire >= 1) {
        log(3);
    }

}, 1000);

var saveGameLoop = window.setInterval(function () {
    localStorage.setItem('lumenSave', JSON.stringify(gameData))

}, 10000);

/* ONLOAD -------------------------------------------------------------------------------------------------------------------------------------------------------- */

window.onload = function () {
    var savegame = JSON.parse(localStorage.getItem('lumenSave'));
    if (savegame !== null) {
        gameData = savegame
    }
    writeStory();
    updateWebsite();

};
