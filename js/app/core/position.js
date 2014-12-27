define(function() {
   
   function Position(x, y) {
        this.x = x;
        this.y = y;
    }

	Position.prototype.set = function(newPos){
		this.x = newPos.x;
		this.y = newPos.y;
	};
	
	Position.prototype.dist = function(p2){
		return Math.sqrt(Math.pow(this.x-p2.x,2)+Math.pow(this.y-p2.y,2));
	};
	
	Position.prototype.normalize = function() {
		var length = this.dist(new Position(0, 0));
		this.x /= length;
		this.y /= length;
		return this;
	};
	
	Position.prototype.rotate = function(theta){
		var rotatedX = Math.cos(theta)*(this.x)+Math.sin(theta)*(this.y);
		var rotatedY = Math.cos(theta)*(this.y)-Math.sin(theta)*(this.x);
		this.x = rotatedX;
		this.y = rotatedY;
		return this;
	};
	
	Position.prototype.plus = function(delta){
		this.x += delta.x;
		this.y += delta.y;
		return this;
	};
	
	Position.prototype.minus = function(delta){
		this.x -= delta.x;
		this.y -= delta.y;
		return this;
	};
	
		
	Position.prototype.times = function(factor){
		this.x *= factor;
		this.y *= factor;
		return this;
	};
	
	Position.prototype.rotateAroundPoint = function(point, theta){
		return this.minus(point).rotate(theta).plus(point);
	};
	
    return Position;
});