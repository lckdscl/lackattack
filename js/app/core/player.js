define([], function() {

	function Player(name) {
		this.name = name;
		this.cycle;
		this.score = 0;
		this.playing = false;
		this.color;
		this.wallColor;
		this.playerInfo;
		this.viewPort;
		this.camera;
	};
	
	Player.prototype.setCycle = function(cycle) {
		this.cycle = cycle;
	};
	
	Player.prototype.joinRound = function() {
		this.playing = true;
		this.playerInfo.update();
	};
	
	Player.prototype.losePoints = function(points) {
		this.score -= points;
		this.playerInfo.update();
	};

	Player.prototype.setScore = function(points) {
		this.score = points;
		this.playerInfo.update();
	};
	
	return Player;

});