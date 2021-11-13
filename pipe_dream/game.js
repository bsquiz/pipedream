const game = {
	pipes: [],
	gunk: {},
	gameState: 0,
	init() {
		this.gunk = new Gunk();
		this.initPipes();
		GameUtilities.pipes = this.pipes;
		this.display.init(this.pipes);
		this.display.drawGunk(this.gunk);
		this.pipes.forEach(row => {
			row.forEach(pipe => {
				const { row, col, dir } = pipe;
				let rotateCount = dir;
				while (rotateCount > 0) {
					rotateCount--;
					game.display.animatePipe(pipe);
				}
			});
		});
		document.querySelector('#pipes').addEventListener('click', e => {
			const $pipe = e.target;
			const row = parseInt($pipe.getAttribute('row'));
			const col = parseInt($pipe.getAttribute('col'));
			const pipe = this.pipes[row][col];
			pipe.rotate();
			game.display.animatePipe($pipe, pipe, row, col);
			this.checkPipeConnections(pipe, row, col);
		});
	},
	gameLose() {
		console.log('game lose');
		this.gameState = GameUtilities.GameState.LOSE;
	},
	checkPipeConnections(pipe, row, col) {
		let newRow;
		let newCol;
		const { inlets } = pipe;
		this.display.resetPipeHighlight(pipe);

		for (let dir=0; dir<4; dir++) {
			let checkPipe;

			this.display.highlightInlet(dir, pipe);
			newRow = row;
			newCol = col;
			if (dir === GameUtilities.Direction.NORTH) {
				if (row > 0) {
					newRow = row - 1;
					checkPipe = this.pipes[newRow][col];
				}
			} else if (dir === GameUtilities.Direction.EAST) {
				if (col < GameUtilities.COLS - 1) {
					newCol = col + 1;
					checkPipe = this.pipes[row][newCol];
				}
			} else if (dir === GameUtilities.Direction.SOUTH) {
				if (row < GameUtilities.ROWS - 1) {
					newRow = row + 1;
					checkPipe = this.pipes[newRow][col];
				}
			} else {
				if (col > 0) {
					newCol = col - 1;
					checkPipe = this.pipes[row][newCol];
				}
			}

			if (!checkPipe) {
				continue;
			}

			if (
				GameUtilities.pipesAreConnected(pipe, checkPipe, dir)
			) {   
				//this.display.highlightPipes(pipe, checkPipe);
			}
		}
	},
	initPipes() {
		const mapToType = {
			's': GameUtilities.PipeType.STRAIGHT,
			'h': GameUtilities.PipeType.HALF_INTERSECTION,
			'f': GameUtilities.PipeType.FULL_INTERSECTION,
			'c': GameUtilities.PipeType.CORNER
		};
		const mapToDir = {
			'n': GameUtilities.Direction.NORTH,
			'e': GameUtilities.Direction.EAST,
			's': GameUtilities.Direction.SOUTH,
			'w': GameUtilities.Direction.WEST
		};
		const map = [
			['sn', 'ce', 'cs'],
			['cn', 'fw', 'cs'],
			['se', 'se', 'cw']
		];
		for (let i=0; i<GameUtilities.ROWS; i++) {
			this.pipes.push([]);
			for (let j=0; j<GameUtilities.COLS; j++) {
				if (map[i][j] === '*') {
					continue;
				}
				const typeChar = map[i][j][0];
				const dirChar = map[i][j][1];
				const type = mapToType[typeChar];
				const dir = mapToDir[dirChar];
				const className = GameUtilities.typeToObject(type);

				this.pipes[i].push(new className(i, j, dir));
			}
		}
	},
	update() {
		this.gunk.update();
		if (this.gunk.isSpilled) {
			this.gameLose();
			return;
		}
		this.display.drawGunk(this.gunk);
		window.requestAnimationFrame(() => {
			game.update();
		});
	}
}
