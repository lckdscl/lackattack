define([], function() {

	
	function HelpMenu() {
		this.element = document.getElementById("help-menu");
		this.element.setAttribute("style","visibility: visible");
		
		this.element.addEventListener('touchstart', function(e){
			this.setAttribute("style","visibility: hidden");
		});
		
	};
	
	HelpMenu.prototype.toggle = function() {
		if(this.element.getAttribute("style") == "visibility: hidden"){
			this.element.setAttribute("style","visibility: visible");
		} else {
			this.element.setAttribute("style","visibility: hidden");
		}
	};
	
	HelpMenu.prototype.hide = function() {
		this.element.setAttribute("style","visibility: hidden");
	};
	
	return HelpMenu;

});