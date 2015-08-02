define(function (require) {
   
	var Camera = require('./core/camera');
	var PlayerInfo = require('./view/playerinfo');
	var HelpMenu = require('./view/helpmenu');
	var TouchController = require('./view/touchcontroller');
	var settings = require('./settings/settings');


	var Player = require('./core/player');
	var Round = require('./core/round');
	var Cycle = require('./core/cycle');
	
	var players = [];
	
	helpMenu = new HelpMenu;
	round = new Round;
	_.each(settings.players, function(player) { 
		var newPlayer = new Player(player.name);
		newPlayer.viewPort = document.createElement("div");
		newPlayer.viewPort.className = "viewport cf";
		document.getElementById("viewports").appendChild(newPlayer.viewPort);
		newPlayer.camera = new Camera(newPlayer.viewPort);
		newPlayer.playerInfo = new PlayerInfo(newPlayer, newPlayer.viewPort);
		newPlayer.camera.animate();
		newPlayer.color = 'rgb(' + player.color.r + ',' + player.color.g + ',' + player.color.b + ')';
		newPlayer.wallColor = 'rgb(' + player.wallColor.r + ',' + player.wallColor.g + ',' + player.wallColor.b + ')';
		players.push(newPlayer);
		new TouchController(newPlayer, newPlayer.viewPort);
		newPlayer.viewPort.addEventListener('touchstart', function(e){
			if(newPlayer.playing == false){
				round.addPlayer(newPlayer);
				newPlayer.camera.following = newPlayer.cycle;
			}
		});
		
	});
	
	document.body.onkeypress=function(e) {
		switch (e.key) {
			case "a":
				if(players[0].playing == false){
					round.addPlayer(players[0]);
					players[0].camera.following = players[0].cycle;
				} else {
					players[0].cycle.turnLeft();
				}
				break;
			case "d":
				if(players[0].playing == false){
					round.addPlayer(players[0]);
					players[0].camera.following = players[0].cycle;
				} else {
					players[0].cycle.turnRight();
				}
				break;
			case "ArrowLeft":
				if(players[1].playing == false){
					round.addPlayer(players[1]);
					players[1].camera.following = players[1].cycle;
				} else {
					players[1].cycle.turnLeft();
				}
				break;
			case "ArrowRight":
				if(players[1].playing == false){
					round.addPlayer(players[1]);
					players[1].camera.following = players[1].cycle;
				} else {
					players[1].cycle.turnRight();
				}
				break;
			case "p":
				round.pause();
				break;
			case "Enter":
				round.start();
				helpMenu.hide();
				players[0].camera.showRound(round);
				players[1].camera.showRound(round);
				break;
			case "h":
				helpMenu.toggle();
				break;
		}
	};
	
	document.getElementById("main-header").addEventListener('touchstart', function(e){
				round.start();
				helpMenu.hide();
				players[0].camera.showRound(round);
				players[1].camera.showRound(round);
	});
	

});