function Sprite(config) {
	
	// Keep a reference to this when this is not the Sprite
	var sprite = this;
	
	// Position in the world {x: _, y: _}
	this.position = config.position;
	
	// Rotation in the z-axis
	this.rotation = config.rotation;
	
	// Scale to draw {x: _, y: _}
	this.scale = config.scale;
	
	// The sprite sheet image
	this.spriteSheet = new Image();
	this.spriteSheet.src = config.spriteSheet;
	
	// Size of a single frame {width: _, height: _}
	this.size = config.size;
	
	// The current animation frame, determines the x position in sprite sheet
	this.frame = 0;
		
	// The amount of time to stay on each frame
	this.timePerFrame = config.timePerFrame;
	
	// The internal tracker for how long the current frame as been active
	this.frameTime = 0;
	
	// The current animation state, determines the y position in sprite sheet
	this.state = 0;
	
	// The amount of frames in each state [state_0_frames, ...]
	this.stateFrameLengths = config.stateFrameLengths;

	// Target position in the world {x: _, y: _}
	this.target = config.target;
	
	// The speed the sprite moves towards the target
	this.speed = config.speed;
	
	// Extensible update config
	this.onUpdate = config.onUpdate;
	
	// Extensible on reach target config
	this.onReachTarget = config.onReachTarget;
	
	// Update the sprite for a time interval: dt
	this.update = function(dt) {
		this.frameTime += dt;
		if(this.frameTime > this.timePerFrame) {
			this.frame++;
			this.frameTime = 0;
			if(this.frame >= this.stateFrameLengths[this.state])
				this.frame = 0;
		}
		
		if(this.target) {
			var dx = this.target.x - this.position.x;
			var dy = this.target.y - this.position.y;
			var h = Math.sqrt(dx *dx + dy * dy);
			this.position.x += dx / h * this.speed * dt;
			this.position.y += dy / h * this.speed * dt;
			if(h < 5) {
				this.target = undefined;
				this.onReachTarget();
			}
		}
		
		this.onUpdate({
			dt: dt,
			dx: dx,
			dy: dy,
			h: h
		});
	};
	
	// Draw the sprite to a context
	this.draw = function(context) {
		if(!this.spriteSheet.complete)
			return;
		context.save();
		context.translate( this.position.x >> 0, this.position.y >> 0 );
		context.rotate( this.rotation );
		context.scale( this.scale.x, this.scale.y );
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