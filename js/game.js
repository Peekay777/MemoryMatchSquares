/*jslint plusplus: true */
/*global prompt, console, alert */

function MemoryMatchGame() {
	'use strict';
	this.turnCounter = 0;
	this.sequence = 0;
	this.tiles = [];
	this.score = 0;
	this.matches = undefined;
	this.firstChoice = undefined;
	this.secondChoice = undefined;
}

// setups the tiles array for tilesLength size
MemoryMatchGame.prototype.setupTiles = function (tilesLength) {
	'use strict';
	var i,
		x,
		first,
		second,
		temp;
	
	this.turnCounter = 0;
	this.sequence = 0;
	this.tiles = [];
	this.score = 0;
	this.matches = undefined;
	this.firstChoice = undefined;
	this.secondChoice = undefined;
	
	//new pack
	for (i = 0; i < tilesLength; i++) {
		this.tiles[i] = Math.floor(i / 2);
	}
	
	//shuffle
	for (i = 0, x = tilesLength * 10; i < x; i++) {
		first = getRandomInt(0, tilesLength - 1);
		second = getRandomInt(0, tilesLength - 1);
		
		temp = this.tiles[first];
		this.tiles[first] = this.tiles[second];
		this.tiles[second] = temp;
	}
	
	this.matches = tilesLength / 2;
};

//checks the value of index at firstChoice compares to the value of index at secondChoice
MemoryMatchGame.prototype.matchChoices = function () {
	'use strict';
	return this.tiles[this.firstChoice] === this.tiles[this.secondChoice];
};

// takes selection and determines game logic
MemoryMatchGame.prototype.selection = function (choice) {
	'use strict';
	if (this.firstChoice === undefined) {
		this.firstChoice = choice;
		return "FirstPick";
	} else {
		this.secondChoice = choice;
		this.turnCounter++;
		
		if (this.tiles[this.firstChoice] === this.tiles[this.secondChoice]) {
			this.matches--;
			this.sequence++;
			this.score += 500 * this.sequence;
			this.tiles[this.firstChoice] =  undefined;
			this.firstChoice = undefined;
			this.tiles[this.secondChoice] = undefined;
			this.secondChoice = undefined;
			return "SuccessfulMatch";
		} else {
			this.sequence = 0;
			this.score -= 1000;
			this.firstChoice = undefined;
			this.secondChoice = undefined;
			return "FailedMatch";
		}
	}
};

var game = new MemoryMatchGame();
game.setupTiles(16);

var sel;
console.log(game.tiles);
while (game.matches > 0) {
	sel = prompt("Tile?");
	if (sel === "q") {
		break;
	}
	console.log(game.selection(sel));
	console.log(game);
}
alert(game.score);