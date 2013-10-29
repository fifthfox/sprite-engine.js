function Sprite(config) {
	
	// Keep a reference to self when this is not the Sprite
	var sprite = this;
	
	// Position in the world {x: _, y: _}
	this.position = config.position;
	
	// Rotation in the z-axis
	this.rotation = config.rotation;
	
	// The sprite sheet image
	this.spriteSheet = new Image();
	this.spriteSheet.onload = config.onload;
	this.spriteSheet.src = config.spriteSheet;
	
	// Size of a single frame {width: _, height: _}
	this.size = config.size;
	
	// The current animation frame, determines the x position in sprite sheet
	this.frame = 0;
	
	// The current animation state, determines the y position in sprite sheet
	this.state = 0;
	
	// Target position in the world {x: _, y: _}
	this.target = config.target;
	
	// Set the target, also controls direction sprite faces
	this.setTarget = function(target) {
		this.target = target;
		if(target.x > this.position.x)
			this.state = 0;
		else
			this.state = 1;
	};
	
	// The speed the sprite moves towards the target
	this.speed = config.speed;
	
	// Update the sprite for a time interval: dt
	this.update = function(dt) {
		if(this.target) {
			var dx = this.target.x - this.position.x;
			var dy = this.target.y - this.position.y;
			var h = Math.sqrt(dx *dx + dy * dy);
			this.position.x += dx / h * this.speed * dt;
			this.position.y += dy / h * this.speed * dt;
			if(h < 5)
				this.target = undefined;
		}
	};
	
	// Draw the sprite to a context
	this.draw = function(context) {
		context.save();
		context.translate( this.position.x >> 0, this.position.y >> 0 );
		context.rotate( this.rotation );
		context.drawImage(
			this.spriteSheet,
			this.frame * this.size.width,
			this.state * this.size.height,
			this.size.width,
			this.size.height,
			-this.size.width / 2,
			-this.size.height / 2,
			this.size.width,
			this.size.height
		);
		context.restore();
	};
	
}