define(['app/core/position', 'app/core/wall'], function() {

	var Position = require('app/core/position');
	var Line = require('app/core/line');
	var Wall = require('app/core/wall');
	var settings = require('app/settings/settings');
	
	function Cycle() {
		this.pos = new Position(0,0);
		this.dir = new Position(1,0);
		this.prev = new Position(0,0);
		this.speed = 30;
		this.maxWallLength = 300;
		this.wallLength = 0;
		this.walls = [];
		this.detected = false;
		this.alive = true;
		//this.walls.push(new Wall(this.pos, this.pos));
		this.distFront = 100;
		this.distLeft = 100;
		this.distRight = 100;
		this.color = 'rgb(255, 255, 255)';
		this.wallColor = 'rgb(127, 255, 255)';
		this.lifeTime = 0;
		this.lastTurn = 0;
		this.spawnDelay = 0;
		this.spawning = false;
		this.player;
	};

	
	
	Cycle.prototype.spawn = function() {
		if(this.spawnDelay <= 0){
			this.alive = true;
			this.walls = [];
			this.prev = new Position(this.pos.x, this.pos.y);
			this.walls.push(new Wall(this.pos, this.pos));
			this.wallLength = 0;
			this.spawning = false;
			this.speed = 30;
		}
	};
	
	Cycle.prototype.boundingBox = function() {
	return {
		x: this.pos.x - 25,
		y: this.pos.y - 25,
		w: 50,
		h: 50
		}
	};
	
	Cycle.prototype.move = function(quadTree) {
		this.lifeTime += 1;
		this.prev.set(this.pos);
		this.pos.x += this.dir.x*settings.delta*this.speed;
		this.pos.y += this.dir.y*settings.delta*this.speed;
		this.wallLength += settings.delta*this.speed;
		this.collision(quadTree);
		
		this.speed += (this.distLeft<10) ? 1*(this.prev.dist(this.pos)*Math.exp(-this.distLeft/5)) : 0;
		this.speed += (this.distRight<10) ? 1*(this.prev.dist(this.pos)*Math.exp(-this.distRight/5)) : 0;
		if (this.speed < 30 ){
			this.speed += this.prev.dist(this.pos)*0.4;
		} else {
			this.speed -= Math.exp(-(120-this.speed)/120)*this.prev.dist(this.pos)*0.2;
		}
		
		if(this.wallLength > this.maxWallLength){
			var leftOver = this.walls[0].moveStart(settings.delta*this.speed);
			while(leftOver>0){
				this.walls.shift();
				leftOver = this.walls[0].moveStart(settings.delta*this.speed);
			}
		}
		
		this.walls.slice(-1)[0].setEnd(this.pos).setBoundingBox();
	};

	Cycle.prototype.turn = function(theta) {
		var cycle = this;
		var turnDelay =  Math.max(6-(this.lifeTime-this.lastTurn), 0);
		this.lastTurn = this.lifeTime + turnDelay;
		window.setTimeout(function(){
			cycle.speed *= 0.95;	
			var x = Math.cos(theta)*(cycle.dir.x)+Math.sin(theta)*(cycle.dir.y);
			var y = Math.cos(theta)*(cycle.dir.y)-Math.sin(theta)*(cycle.dir.x);	
			cycle.dir.x = x;
			cycle.dir.y = y;
			cycle.walls.push(new Wall(cycle.pos, cycle.pos));
		}, turnDelay*settings.delta*1000);
	};

	Cycle.prototype.turnLeft = function() {
		this.turn(Math.PI/2);
	};

	Cycle.prototype.turnRight = function() {
		this.turn(-Math.PI/2);
	};

	Cycle.prototype.collision = function(quadTree) {
		var distFront = 100,
			distLeft = 100,
			distRight = 100;
		var intersection ;
		var found = false;
		
		var center 	= new Position(this.pos.x, this.pos.y),
			front 	= new Position(this.pos.x + 10*this.dir.x, this.pos.y + 10*this.dir.y),
			left 	= new Position(this.pos.x - 10*this.dir.y, this.pos.y + 10*this.dir.x),
			right 	= new Position(this.pos.x + 10*this.dir.y, this.pos.y - 10*this.dir.x),
			prev	= new Position(this.prev.x, this.prev.y);
			
		var currentWall = this.walls.slice(-1)[0];

		quadTree.retrieve(this.boundingBox(), function(item) {
			if (item!= currentWall){
				iSect = item.intersects(new Line(center, front));
				if (iSect.p == false && iSect.s >=0&&iSect.s <=1&&iSect.t >=0&&iSect.t <=1){
					distFront = Math.min(distFront, Math.abs(iSect.t*10));
				}
				iSect = item.intersects(new Line(center, right));
				if (iSect.p == false && iSect.s >=0&&iSect.s <=1&&iSect.t >=0&&iSect.t <=1){
					distRight = Math.min(distRight, Math.abs(iSect.t*10));
				}
				iSect = item.intersects(new Line(center, left));
				if (iSect.p == false && iSect.s >=0&&iSect.s <=1&&iSect.t >=0&&iSect.t <=1){
					distLeft = Math.min(distLeft, Math.abs(iSect.t*10));
				}
				iSect = item.intersects(new Line(center, prev));
				if (iSect.p == false && iSect.s >=0&&iSect.s <=1&&iSect.t >0&&iSect.t <1){
					found = true;
				}
			}
			}
		);
		if(found){
			this.alive = false;
			this.player.losePoints(1);
			}
		this.distFront = distFront;
		this.distLeft = distLeft;
		this.distRight = distRight;

	};
	
	return Cycle;

});