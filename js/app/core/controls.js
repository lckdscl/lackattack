define(['jquery'], function() {


	$(document.body).on('keydown', function(e) {
		switch (e.which) {
			case 37:
				aCycle.turnLeft();
				break;
			case 39:
				aCycle.turnRight();
				break;
		}
	});

});