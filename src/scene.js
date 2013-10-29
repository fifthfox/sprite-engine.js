function Scene(config) {

	// Keep a reference to self when this is not the Scene
	var scene = this;
	
	// Size of the scene
	this.size = config.size;
	
	// The DOM element to which all children will be added
	this.element = window.document.getElementById(config.id);
	this.element.style.width = this.size.width + 'px';
	this.element.style.height = this.size.height + 'px';
	this.element.style.position = 'absolute';
	
	// Setup the canvas layers
	this.layers = [];
	for(var i in config.layers) {
		this.layers.push(new Layer({
			scene: this
		}));
	}
	
	// Update all child layers for a time interval: dt
	this.update = function(dt) {
		for(var i in this.layers) {
			this.layers[i].update(dt);
		}
	};
	
	// Draw all child layers
	this.draw = function() {
		for(var i in this.layers) {
			this.layers[i].draw();
		}
	};
	
	// Store last tick time to calculate dt
	this.lastTickTime;
	
	// The main loop
	this.tick = function(tickTime) {
		var dt = tickTime - scene.lastTickTime;
		scene.lastTickTime = tickTime;
		scene.update(dt);
		scene.draw();
		scene.requestID = window.requestAnimationFrame(scene.tick);
	};
	
	// Store the interval ID
	this.requestID;
	
	// Run the main loop at 60 FPS
	this.run = function() {
		if(!this.requestID) {
			this.requestID = window.requestAnimationFrame(this.tick);
		}
	};
	
	// Stop the main loop
	this.stop = function() {
		window.cancelAnimationFrame(this.requestID);
		this.requestID = undefined;
	}
	
}