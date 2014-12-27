define(function(require) {
   
   var Position = require('./position');
   
   function Line(start, end) {
        this.start = new Position(start.x, start.y);
        this.end = new Position(end.x, end.y);
    }

	Line.prototype.setStart = function(newPos){
		this.start.set(newPos);
		return this;
	};
	

	Line.prototype.setEnd = function(newPos){
		this.end.set(newPos);
		return this;
	};	
	
	Line.prototype.set = function(newStart, newEnd){
		this.setStart(newStart).setEnd(newEnd);
		return this;
	};
	
	Line.prototype.rotateAroundPoint = function(point, theta){
		this.start.rotateAroundPoint(point, theta);
		this.end.rotateAroundPoint(point, theta);
		return this;
	};

	Line.prototype.intersects = function (line) {
		var t1 = new Position(this.end.x-this.start.x, this.end.y-this.start.y);
		var t2 = new Position(line.end.x-line.start.x, line.end.y-line.start.y);
		var denom = (-t2.x * t1.y + t1.x * t2.y);
		var s = 0,
			t = 0,
			p = (denom==0) ? true : false;
		
		if (denom != 0){
			s = (-t1.y * (this.start.x - line.start.x ) + t1.x * (this.start.y - line.start.y)) / denom;
			t = ( t2.x * (this.start.y - line.start.y ) - t2.y * (this.start.x - line.start.x)) / denom;
		}
		return {
			s : s,
			t : t,
			p : p
		}
	};
	
	Line.prototype.length = function() {
		return this.start.dist(this.end);
	};
	
	Line.prototype.moveStart = function(length) {
		if(length < this.length()){
			var delta = new Position(this.end.x - this.start.x, this.end.y - this.start.y).normalize().times(length);
			this.start.plus(delta);
			return 0;
		} else {
			return length-this.length();
		}
	};
	
    return Line;
});