define([], function() {

	
	function PlayerInfo(player, parent) {
		this.parent = parent;
		this.player = player;
		this.playerInfo = document.createElement('p');
		this.playerInfo.className = "player-info";
		this.playerInfo.textContent = this.player.name + ": " + this.player.score + " lives left";
		this.parent.appendChild(this.playerInfo);
	};
	
	PlayerInfo.prototype.update = function() {
		this.playerInfo.textContent = this.player.name + ": " + this.player.score + " lives left";
	};
	
	return PlayerInfo;

});