define(['app/core/position', 'app/core/line'], function() {

	var Position = require(['app/core/position']);
	var Line = require('app/core/line');

	function Wall(start, end) {
		_.extend(this, new Line(start, end));
		this.active = true;
		this.setBoundingBox();
	};
	
	Wall.prototype.setBoundingBox = function() {
		this.x = Math.min(this.start.x, this.end.x);
		this.y = Math.min(this.start.y, this.end.y);
		this.w = Math.abs(this.start.x- this.end.x);
		this.h = Math.abs(this.start.y- this.end.y);
	};
	
	return Wall;

});