define(function () {

	return {
		"delta"		: 1/60,
		"timeStep"	: 100,
		"view": {
			"type"		: "canvas",
			"width"		: 640,
			"height"	: 480
			},
		"players"	: [
			{
			"name"		: "Player 1",
			"color"		: {"r" : 255, "g" : 255, "b" : 255},
			"wallColor"	: {"r" : 127, "g" : 255, "b" : 255}
			},
			{
			"name"		: "Player 2",
			"color"		: {"r" : 255, "g" : 255, "b" : 127},
			"wallColor"	: {"r" : 255, "g" : 127, "b" : 255}
			}
			],
		"spawnLocations" : [
			{"x" : 100, "y" : 80, "dx" : 1, "dy" : 0},
			{"x" : 200, "y" : 220, "dx" : -1, "dy" : 0},
			{"x" : 220, "y" : 100, "dx" : 0, "dy" : 1},
			{"x" : 80, "y" : 200, "dx" : 0, "dy" : -1}
			],
		"spawnDelay" : 250,
		"walls" : [
			{"x1" : 0, "y1" : 0, "x2" : 0, "y2" : 300},
			{"x1" : 0, "y1" : 300, "x2" : 300, "y2" : 300},
			{"x1" : 300, "y1" : 300, "x2" : 300, "y2" : 0},
			{"x1" : 300, "y1" : 0, "x2" : 0, "y2" : 0}
			],
		"quadTree"	: {
			"x"	: 0,
			"y"	: 0,
			"w"	: 640,
			"h" : 480,
			"maxChildren"	: 10,
			"maxDepth"		: 10
			},
		"preferences"	: {
			"cycle"	: {
				"length"	: 1,
				"width"		: 2
				},
			"wall" :{
				"width"		: 1.5
				}
			},
		"maxWallLength" : 1000,
		"round"	: {
			"type"	: "countDown",
			"lives"	: 10
			}
			
	}

});