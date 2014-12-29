define(function (require) {
   
	var Camera = require('./core/camera');
	var PlayerInfo = require('./view/playerinfo');
	var HelpMenu = require('./view/helpmenu');
	var TouchController = require('./view/touchcontroller');
	var settings = require('./settings/settings');
	require('jquery');
	require('jquery.mobile.custom');


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
		$(newPlayer.viewPort).on("tap",function(){
			if(newPlayer.playing == false){
				round.addPlayer(newPlayer);
				newPlayer.camera.following = newPlayer.cycle;
			}
		});
		
	});
	
	$(document.body).on('keydown', function(e) {
		switch (e.which) {
			case 65:
				if(players[0].playing == false){
					round.addPlayer(players[0]);
					players[0].camera.following = players[0].cycle;
				} else {
					players[0].cycle.turnLeft();
				}
				break;
			case 68:
				if(players[0].playing == false){
					round.addPlayer(players[0]);
					players[0].camera.following = players[0].cycle;
				} else {
					players[0].cycle.turnRight();
				}
				break;
			case 37:
				if(players[1].playing == false){
					round.addPlayer(players[1]);
					players[1].camera.following = players[1].cycle;
				} else {
					players[1].cycle.turnLeft();
				}
				break;
			case 39:
				if(players[1].playing == false){
					round.addPlayer(players[1]);
					players[1].camera.following = players[1].cycle;
				} else {
					players[1].cycle.turnRight();
				}
				break;
			case 80:
				round.pause();
				break;
			case 13:
				round.start();
				helpMenu.hide();
				players[0].camera.showRound(round);
				players[1].camera.showRound(round);
				break;
			case 72:
				helpMenu.toggle();
				break;
		}
	});
	
	$("h1").on("tap",function(){
				round.start();
				helpMenu.hide();
				players[0].camera.showRound(round);
				players[1].camera.showRound(round);
	});
	

});