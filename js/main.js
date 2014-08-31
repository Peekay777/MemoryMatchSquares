/*jslint plusplus: true */
function getRandomInt(min, max) {
	'use strict';
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var MEMEMORYMATCHGAME = (function () {
	'use strict';
	var turnCounter = 0,
		sequence = 0,
		tiles = [],
		score = 0,
		matches,
		firstChoice,
		secondChoice;
	
	function matchChoices() {
		return tiles[firstChoice] === tiles[secondChoice];
	}
	
	return {
		getTiles : function () {
			return tiles;
		},
		setupTiles : function (tilesLength) {
			var i,
				x,
				first,
				second,
				temp;
			
			turnCounter = 0;
			sequence = 0;
			tiles = [];
			score = 0;
			matches = undefined;
			firstChoice = undefined;
			secondChoice = undefined;

			//new pack
			for (i = 0; i < tilesLength; i++) {
				tiles[i] = Math.floor(i / 2);
			}

			//shuffle
			for (i = 0, x = tilesLength * 10; i < x; i++) {
				first = getRandomInt(0, tilesLength - 1);
				second = getRandomInt(0, tilesLength - 1);

				temp = tiles[first];
				tiles[first] = tiles[second];
				tiles[second] = temp;
			}

			matches = tilesLength / 2;
		},
		selection : function (choice) {
			if (firstChoice === undefined) {
				firstChoice = choice;
				return "FirstPick";
			} else {
				secondChoice = choice;
				turnCounter++;

				if (tiles[firstChoice] === tiles[secondChoice]) {
					matches--;
					sequence++;
					score += 500 * sequence;
					tiles[firstChoice] =  undefined;
					firstChoice = undefined;
					tiles[secondChoice] = undefined;
					secondChoice = undefined;
					return "SuccessfulMatch";
				} else {
					sequence = 0;
					score -= 1000;
					firstChoice = undefined;
					secondChoice = undefined;
					return "FailedMatch";
				}
			}
		}
	};
}());
