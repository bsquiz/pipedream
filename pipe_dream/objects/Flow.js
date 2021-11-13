class Flow {
	constructor(startX, startY, dir) {
		this.speed = 5;
		this.turn(dir);
		this.hasClearedPipe = false;
		this.clearedPipe = null;
		this.turns = [
			{
				startX, startY,
				x: startX, y: startY 
			} 
		];
		this.dir = dir;
		this.isSpilled = false;
		this.currentPipe = null; 
	}
	turn(dir) {
		if (dir === GameUtilities.Direction.NORTH) {
			this.xSpeed = 0;
			this.ySpeed = -1 * this.speed;
		} else if (dir === GameUtilities.Direction.EAST) {
			this.xSpeed = 1 * this.speed;
			this.ySpeed = 0;
		} else if (dir === GameUtilities.Direction.SOUTH) {
			this.xSpeed = 0;
			this.ySpeed = 1 * this.speed;
		} else {
			this.xSpeed = -1 * this.speed;
			this.ySpeed = 0;
		}
		this.dir = dir;
	}
	branch() {

	}
	currentX() {
		return this.turns[this.turns.length - 1].x;
	}
	currentY() {
		return this.turns[this.turns.length - 1].y;
	}
	move() {
		this.turns[this.turns.length - 1].x += this.xSpeed;
		this.turns[this.turns.length - 1].y += this.ySpeed;
	}
	addTurn(startX, startY, x, y, pipe) {
		this.turns.push({
			startX, startY,
			x, y
		});
	}
	shouldTurn(currentPipe) {
		if (currentPipe) {
			if (GameUtilities.pipeHasTurn(currentPipe)) {
				const currentTurn = this.turns[this.turns.length - 1];
				if (GameUtilities.atPipeCenter(currentTurn.x,
					currentTurn.y, currentPipe)) {
					return !this.currentPipe.hasTurned;
				}
			}
		}

		return false;
	}
	update() {
		const currentTurn = this.turns[this.turns.length - 1];
		const { x, y } = currentTurn;
		const currentPipe = GameUtilities.getPipeAtPos(currentTurn.x,
			GameUtilities.gunkRelativeY(currentTurn.y));
		const isAtBranch = false;
		let isAtTurn = false;
		let inlets;

		this.hasClearedPipe = false;

		if (currentPipe && this.currentPipe.id !== currentPipe.id) {
			if (this.currentPipe) {
				this.clearedPipe = this.currentPipe;
			} else {
				this.clearedPipe = currentPipe;
			}
			this.hasClearedPipe = true;
			this.currentPipe = currentPipe;
		}
		if (currentPipe) {
			inlets = currentPipe.inlets;
		}

		if (this.shouldTurn(currentPipe)) {
			isAtTurn = true;
			this.currentPipe.hasTurned = true;
		}	

		if (GameUtilities.isInPreviewArea(currentTurn.x, currentTurn.y)) {
			if (GameUtilities.isInPreviewTurn(currentTurn.x, currentTurn.y)) {
				if (this.turns.length === 1) {
					const { x, y } = currentTurn;
					this.addTurn(x, y, x, y);	
					this.dir = GameUtilities.Direction.SOUTH;
					this.turn(this.dir);
				}
			}
			this.move();
			return;
		}
		if (isAtBranch) {

		} else if(isAtTurn) {
			if (currentPipe.type === GameUtilities.PipeType.CORNER) {
				this.addTurn(x, y, x, y);
				for (let i=0; i<inlets.length; i++) {
					if (i === this.dir || i === GameUtilities.mirrorDir(this.dir)) {
						continue;
					}
					if (inlets[i]) {
						this.turn(i);
						break;
					}
				}
			}
		} else {
			this.move();
			if (GameUtilities.atPipeCenter(x, y, currentPipe)) {
				if (!inlets[this.dir]) {
				console.log(inlets);
				console.log(this.dir);
				this.isSpilled = true;
				console.log('spill');
				}
			}
		}
	}
}
