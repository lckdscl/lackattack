define(['underscore', 'quadtree', 'app/core/wall', 'app/core/cycle', 'app/core/player', 'app/settings/settings', 'app/view/roundmessage'], function() {
	var settings = require('app/settings/settings');
	var Wall = require('app/core/wall');
	var Position = require('app/core/position');
	var Cycle = require('app/core/cycle');
	var Player = require('app/core/player');
	var RoundMessage = require('app/view/roundmessage');
	
	function Round() {
		this.cycles = [];
		this.players = [];
		this.walls = [];
		this.paused = false;
		this.quadTree = QUAD.init(settings.quadTree);
		this.currentSpawnId = 0;
		this.roundMessage = new RoundMessage;
	};
	
	Round.prototype.addCycle = function(newCycles) {
		this.cycles.push(newCycles);
	};
	
	Round.prototype.addWalls = function(newWalls) {
		var round = this;
		if(newWalls instanceof Array){
			_.each(newWalls, function(newWall) { round.walls.push(newWall)});
		} else {
			this.walls.push(newWalls);
		}
	};
	
	Round.prototype.addPlayer = function(newPlayer) {
		this.players.push(newPlayer);
		newPlayer.setScore(settings.round.lives);
		newPlayer.joinRound();
		cycle = new Cycle;
		newPlayer.setCycle(cycle);
		cycle.player = newPlayer;
		
		cycle.color = newPlayer.color;
		cycle.wallColor = newPlayer.wallColor;
		cycle.pos = new Position(settings.spawnLocations[this.currentSpawnId].x,settings.spawnLocations[this.currentSpawnId].y);
		cycle.dir = new Position(settings.spawnLocations[this.currentSpawnId].dx,settings.spawnLocations[this.currentSpawnId].dy);
		cycle.maxWallLength = settings.maxWallLength;
		cycle.spawn();
		this.currentSpawnId = (this.currentSpawnId + 1) % settings.spawnLocations.length;
		this.cycles.push(cycle) ;
	}
	
	Round.prototype.start = function() {
		this.roundMessage.hide();
		_.each(this.cycles, function(cycle) { 
			cycle.alive = false;
			cycle.walls = [];
			cycle.spawnDelay = settings.spawnDelay;
			}, this);
		this.paused = true;
		this.walls = [];
		_.each(settings.walls, function(wall) { this.walls.push(new Wall(new Position(wall.x1, wall.y1), new Position(wall.x2,wall.y2))) }, this);
		_.each(this.players, function(player) { player.setScore(settings.round.lives) });
		
		setTimeout( _.bind(this.pause, this), settings.delta*5000 );
	};

	Round.prototype.pause = function() {
		this.paused = this.paused ? false : true;
		this.gameStep();
	};
	
	Round.prototype.gameStep = function() {
		if(!this.paused) {
			this.evaluateWinningConditions();
			_.each(this.cycles, function(cycle) {this.quadTree.insert(cycle.walls)}, this);
			this.quadTree.insert(this.walls);
			_.each(this.cycles, function(cycle) {
					if(cycle.alive==true){
						cycle.move(this.quadTree)
					} else {
						if(cycle.spawning==true){
							cycle.spawnDelay -= 1;
							cycle.spawn();
						} else {
							cycle.spawning = true;
							cycle.pos = new Position(settings.spawnLocations[this.currentSpawnId].x,settings.spawnLocations[this.currentSpawnId].y);
							cycle.dir = new Position(settings.spawnLocations[this.currentSpawnId].dx,settings.spawnLocations[this.currentSpawnId].dy);
							this.currentSpawnId = (this.currentSpawnId + 1) % settings.spawnLocations.length;
							cycle.spawnDelay = settings.spawnDelay;
						}
					}
				}, this);
			this.quadTree.clear();
			
			setTimeout( _.bind(this.gameStep, this), settings.delta*1000 );
		}
	};
	
	Round.prototype.evaluateWinningConditions = function() {
		switch(settings.round.type) {
			case "lastManStanding" : {
				if(_.size(_.where(this.cycles, {alive: true})) < 2) {
					//this.
				}
			}
			case "countDown" : {
				if(_.size(_.where(this.players, {score: 0})) >= 1) {
					this.pause();
					this.roundMessage.gameOver(_.find(this.players, function(player){return player.score>0}));
				}
			}
		
		};
	
	};
	
	return Round;

});