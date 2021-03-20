/* VARIABLES ----------------------------------------------------------------------------------------------------------------------------------------------------------- */

var gameData = {
	population: {
		imps: 1,
		humans: 0,
	},
	populationCap: {
		imps: 5,
		humans: 0,
	},
    resources: {
        darkEssence: 0,
    },
    populationBuildings: {
        evil: {
			evilLair: {
				level: 1,
				cost: 10,
				costIncrease: 1.25,
				effect: 5,
			},
        },
    },
};


/* LOG TESTS ---------------------------------------------------------------------------------------------------------------------------------------------------- */


/* EVENT LISTENERS  ----------------------------------------------------------------------------------------------------------------------------------------------------
        Basic
 */
document.getElementById("cheating100").addEventListener("click", function () {cheating(100);});
document.getElementById("cheating10000").addEventListener("click", function () {cheating(10000);});
document.getElementById("cheating10000000").addEventListener("click", function () {cheating(10000000);});
document.getElementById("deleteSave").addEventListener("click", deleteSave);
/*
        Upgrades
 */
document.getElementById("evilLairButton").addEventListener("click", function () {populationBuildingUpgrade('evil', 'evilLair', 'imps', 'darkEssence')});



/* WRITE STORY ---------------------------------------------------------------------------------------------------------------------------------------------------- */


/* Upgrade Functions ------------------------------------------------------------------------------------------------------------------------------------------- */
function populationBuildingUpgrade (type, building, race, resource) {
	if (gameData.resources[resource] >= gameData.populationBuildings[type][building].cost) {
		gameData.populationBuildings[type][building].level += 1;
		gameData.resources[resource] -= gameData.populationBuildings[type][building].cost;
		gameData.populationCap[race] += gameData.populationBuildings[type][building].effect;
		gameData.populationBuildings[type][building].cost = Math.round(gameData.populationBuildings[type][building].cost * gameData.populationBuildings[type][building].costIncrease);
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


/* UNSORTED FUNCTIONS ------------------------------------------------------------------------------------------------------------------------------------------- */


function cheating(amount) {
    gameData.resources.darkEssence += amount;
    updateWebsite();
}


function deleteSave() {
    localStorage.clear();
    location.reload(true);
}

function updateWebsite() {
    document.getElementById("impCap").innerHTML = gameData.populationCap.imps;
	document.getElementById("darkEssence").innerHTML = gameData.resources.darkEssence;
    document.getElementById("evilLairLevel").innerHTML = gameData.populationBuildings.evil.evilLair.level;
    document.getElementById("evilLairCost").innerHTML = gameData.populationBuildings.evil.evilLair.cost;
}


/* GAMELOOPS -------------------------------------------------------------------------------------------------------------------------------------------------------- */


var mainGameLoop = window.setInterval(function () {
    /* checks */
    /* if (gameData.resources.lumen >= 5){
        unlockElement("torch")
    }

    } */

    /* calculation */
    /* update */
    updateWebsite();
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
    updateWebsite();

};
