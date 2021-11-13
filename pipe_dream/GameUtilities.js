const GameUtilities = {
	ROWS: 3,
	COLS: 3,
	PIPE_WIDTH: 192,
	PIPE_HEIGHT: 192,
	Direction: {
		NORTH: 0,
		EAST: 1,
		SOUTH: 2,
		WEST: 3
	},
	PipeType: {
		FULL_INTERSECTION: 0,
		HALF_INTERSECTION: 1,
		CORNER: 2,
		STRAIGHT: 3
	},
	GameState: {
		PLAY: 0,
		LOSE: 1
	},
	pipes: [],
	typeToObject(type) {
		let ob;
		if (type === this.PipeType.FULL_INTERSECTION) {
			ob = FullPipe;
		} else if (type === this.PipeType.HALF_INTERSECTION) {
			ob = HalfPipe;
		} else if (type === this.PipeType.CORNER) {
			ob = CornerPipe;
		} else {
			ob = StraightPipe;
		}

		return ob;	
	},
	typeToClass(type) {
		let cls;
		if (type === this.PipeType.FULL_INTERSECTION) {
			cls = 'full-intersection';
		} else if (type === this.PipeType.HALF_INTERSECTION) {
			cls = 'half-intersection';
		} else if (type === this.PipeType.CORNER) {
			cls = 'corner';
		} else {
			cls = 'straight';
		}

		return cls;
	},
	mirrorDir(dir) {
		let newDir = dir + 2;
		if (newDir >= 4) {
			newDir = 4 - newDir;
		}
		return newDir;
	},
        atPipeCenter(checkX, checkY, pipe) {
		const { row, col } = pipe;
		const { centerX, centerY } = this.pipeCenter();
		const { x, y } = this.pipePosition(pipe);
		const cookedX = checkX - x;
		const cookedY = this.gunkRelativeY(checkY) - y;
		const relX = Math.abs(centerX - cookedX);
		const relY = Math.abs(centerY - cookedY);

		return (
			relX < 10 && relY < 10
		);
        },
	pipePosition(pipe) {
		const { row, col } = pipe;
		const x = col * this.PIPE_WIDTH;
		const y = row * this.PIPE_HEIGHT;

		return { x, y };
	},
	pipeCenter() {
		const centerX = this.PIPE_WIDTH / 2;
		const centerY = this.PIPE_HEIGHT / 2;
		return { centerX, centerY };
	},
	pipeHasTurn(pipe) {
		return pipe.type !== this.PipeType.STRAIGHT;
	},
	pipesAreConnected(pipe1, pipe2, dir) {
		return (pipe1.inlets[dir] && pipe2.inlets[dir]);
	},
	isInPreviewArea(x, y) {
		return y < this.PIPE_HEIGHT;
	},
	isInPreviewTurn(x, y) {
		return y < this.PIPE_HEIGHT && x < this.PIPE_WIDTH / 2;
	},
	gunkRelativeY(y) {
		return y - this.PIPE_HEIGHT;
	},
	getPipeAtPos(x, y) {
		let pipeCol = this.xToCol(x); 
		let pipeRow = this.yToRow(y); 
		return this.pipes[pipeRow][pipeCol];
	},
	xToCol(x) {
		return parseInt(x / this.PIPE_WIDTH);
	},
	yToRow(y) {
		return parseInt(y / this.PIPE_HEIGHT);
	}
};
