define(function(require) {
   
	var Position = require('./position');
	var Line = require('./line');
	var settings = require('./../settings/settings');
	var _ = require('underscore');

	window.requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       || 
			  window.webkitRequestAnimationFrame || 
			  window.mozRequestAnimationFrame    || 
			  window.oRequestAnimationFrame      || 
			  window.msRequestAnimationFrame     || 
			  function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000/60);
			  };
	})();
	
	function Camera(parent) {
		this.pos = new Position(0,0);
		this.zoom = 1;
		this.theta = Math.PI/4;
		this.cycles = [];
		this.walls = [];
		this.following = void 0;
		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = settings.view.width;
		this.canvas.height = settings.view.height;
		this.canvas.position = "relative";
		this.canvas.style.display = "inline";
		parent.appendChild( this.canvas );	
		
	};
	
	Camera.prototype.showCycle = function(cycle){
		this.cycles.push(cycle);
	};
	
	Camera.prototype.showWall = function(wall){
		this.walls.push(wall);
	};
	
	Camera.prototype.showRound = function(round){
		this.cycles = round.cycles;
		this.walls = round.walls;
	};
	
	Camera.prototype.transformPos = function(pos) {
		return new Position(
			(Math.cos(this.theta)*(pos.x-this.pos.x)+Math.sin(this.theta)*(pos.y-this.pos.y))*this.zoom+settings.view.width/2,
			(Math.cos(this.theta)*(pos.y-this.pos.y)-Math.sin(this.theta)*(pos.x-this.pos.x))*this.zoom+settings.view.height/2
			)
	}
	
	Camera.prototype.follow = function(){
		this.pos.x += (this.following.pos.x-this.pos.x)*0.01;
		this.pos.y += (this.following.pos.y-this.pos.y)*0.01;
		this.zoom += (1/Math.sqrt(this.following.speed/90) -this.zoom)*0.1;
		var newTheta = (this.following.dir.x>0) ? Math.acos(-1*this.following.dir.y + 0*this.following.dir.x) : -Math.acos(-1*this.following.dir.y+0*this.following.dir.x) + 2*Math.PI; 
		var difTheta = (this.theta-newTheta) % (2*Math.PI);
		this.theta += Math.sin(-difTheta)*0.1;
	};
	
	Camera.prototype.animate = function () {
		requestAnimFrame( this.animate.bind(this) );
		
		if(this.following !== void 0){
			this.follow();
			}
		
		var ctx = this.canvas.getContext( '2d' );
		var camera = this;
		
		ctx.clearRect(0,0,settings.view.width, settings.view.height);
		
		_.each(this.cycles, function(cycle){
				
				ctx.beginPath();
				ctx.lineWidth = settings.preferences.wall.width;
				ctx.strokeStyle= cycle.wallColor;
				_.each(cycle.walls, function(wall){
					ctx.moveTo(camera.transformPos(wall.start).x, camera.transformPos(wall.start).y);
					ctx.lineTo(camera.transformPos(wall.end).x, camera.transformPos(wall.end).y);
				});
				ctx.stroke();
				
				ctx.lineWidth= settings.preferences.cycle.width;
				ctx.lineCap="square";
				ctx.strokeStyle = cycle.color;
				ctx.beginPath();
				var cycleLength = settings.preferences.cycle.length;
				var cycleFront = camera.transformPos(new Position(cycle.pos.x + cycle.dir.x*cycleLength, cycle.pos.y + cycle.dir.y*cycleLength));
				var cycleBack = camera.transformPos(new Position(cycle.pos.x - cycle.dir.x*cycleLength, cycle.pos.y - cycle.dir.y*cycleLength));
				ctx.moveTo(cycleFront.x, cycleFront.y);
				ctx.lineTo(cycleBack.x, cycleBack.y);
				ctx.stroke();
			});
		ctx.strokeStyle = 'rgb(255, 255, 255)';
		ctx.lineWidth = settings.preferences.wall.width;
		ctx.beginPath();
		_.each(this.walls, function(wall){
				ctx.moveTo(camera.transformPos(wall.start).x, camera.transformPos(wall.start).y);
				ctx.lineTo(camera.transformPos(wall.end).x, camera.transformPos(wall.end).y);
			});
		ctx.stroke();
	};
	
    return Camera;
});