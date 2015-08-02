define(function() {

	
	function TouchController(player, parent) {
		this.parent = parent;
		this.player = player;
		
		this.touchController = document.createElement('div');
		this.touchController.className = "touch-controller";
		this.parent.appendChild(this.touchController);
		
		var prevX;
		var pl = this.player;
		
		var i = 0;
		var boundaries = [];
		
		
		var width = this.touchController.clientWidth;
		var left = this.touchController.getBoundingClientRect().left;
		for(var i=0; i<4; i=i+1){
			boundaries.push(left + width/8 + (width/4)*i);
		}
		
		this.touchController.addEventListener('touchstart', function(e){
			prevX = e.targetTouches[0].clientX;
		});
		
		this.touchController.addEventListener('touchmove', function(e){

			for(var i=0; i<4; i=i+1){
				if(e.targetTouches[0].clientX > boundaries[i] && prevX < boundaries[i]){
					pl.cycle.turnRight();
				} else if (e.targetTouches[0].clientX < boundaries[i] && prevX > boundaries[i]){
					pl.cycle.turnLeft();
				}
			}
			prevX = e.targetTouches[0].clientX;

		});

	};
	
	
	
	return TouchController;

});