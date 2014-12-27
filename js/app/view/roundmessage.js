define([], function() {

	
	function RoundMessage() {
		this.element = document.getElementById("round-message");
		this.title = document.createElement("h2");
		this.text = document.createElement("p");
		this.element.appendChild(this.title);
		this.element.appendChild(this.text);
		this.element.setAttribute("style","visibility: hidden");
	};
	
	RoundMessage.prototype.gameOver = function(winner){
		this.title.textContent = winner.name + " wins!";
		this.text.textContent = "Press Enter to start a new game";
		this.element.setAttribute("style","visibility: visible");
	};
	
	RoundMessage.prototype.hide = function() {
		this.element.setAttribute("style","visibility: hidden");
	};
	
	return RoundMessage;

});