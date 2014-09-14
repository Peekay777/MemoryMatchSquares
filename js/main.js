/*jslint plusplus: true */
/*global alert, console, $ */
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
		getTurn : function () {
			return turnCounter;
		},
		getBonus : function () {
			return sequence;
		},
		getScore : function () {
			return score;
		},
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
				return 'FirstPick';
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
					return 'SuccessfulMatch';
				} else {
					sequence = 0;
					score -= 1000;
					firstChoice = undefined;
					secondChoice = undefined;
					return 'FailedMatch';
				}
			}
		}
	};
}());


$(document).ready(function () {
	'use strict';
	
	var size = $('.selected').data('size');
	
	function updateInfo() {
		$('#score').text(MEMEMORYMATCHGAME.getScore());
		$('#turn').text(MEMEMORYMATCHGAME.getTurn());
		$('#bonus').text(MEMEMORYMATCHGAME.getBonus());
	}
	
	updateInfo();
	
	MEMEMORYMATCHGAME.setupTiles(Math.pow(size, 2));
	
	$('article').on('click', 'img', function () {
		var selectedTile = $(this).closest('.tile'),
			res = MEMEMORYMATCHGAME.selection(selectedTile.data('tile'));
		
		if (res === 'FirstPick') {
			selectedTile.addClass('firstPick');
			$(this).addClass('hidden');
		} else {
			selectedTile.addClass('secondPick');
			$(this).addClass('hidden');
			
			if (res === 'FailedMatch') {
				console.log('FailedMatch');
				
				setTimeout(function () {
					$('.firstPick').find('img').removeClass('hidden');
					$('.firstPick').removeClass('firstPick');
					$('.secondPick').find('img').removeClass('hidden');
					$('.secondPick').removeClass('secondPick');
				}, 1000);
			} else if (res === 'SuccessfulMatch') {
				console.log('SuccessfulMatch');
				
				$('.firstPick').removeClass('firstPick');
				$('.secondPick').removeClass('secondPick');
			}
			
			updateInfo();
		}
	});
	
	$('nav').on('click', 'div', function () {
		$('.selected').removeClass('selected');
		$(this).closest('li').addClass('selected');
		
		console.log($('.selected').data('size'));
		//run new game
	});
})();


