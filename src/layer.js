function Layer(config) {

	// Keep a reference to self when this is not the Layer
	var layer = this;
	
	// Reference to the parent scene
	this.scene = config.scene;
	
	// Creating and configuring the canvas
	this.canvas = window.document.createElement('canvas');
	this.canvas.width = this.scene.size.width;
	this.canvas.height = this.scene.size.height;
	this.canvas.style.position = 'absolute';
	
	// Getting the context of the canvas
	this.context = this.canvas.getContext('2d');
	
	// Adding the canvas to the Scene DOM element
	this.scene.element.appendChild(this.canvas);
	
	// Create an array for referencing all child sprites
	this.sprites = [];
	
	// Update all child sprites for a time interval: dt
	this.update = function(dt) {
		for(var i in this.sprites) {
			this.sprites[i].update(dt);
		}
	};
	
	// Draw all child sprites
	this.draw = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for(var i in this.sprites) {
			this.sprites[i].draw(this.context);
		}
	};
	
}