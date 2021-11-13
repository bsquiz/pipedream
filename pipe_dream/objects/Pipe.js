class Pipe {
	constructor(row, col, dir) {
		this.row = row;
		this.col = col;
		this.dir = dir;
		this.inletsMap = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		this.inlets = this.inletsMap[this.dir];
		this.id = row + col;
	}
	rotate() {
		this.dir++;
		if (this.dir > GameUtilities.Direction.WEST) {
			this.dir = GameUtilities.Direction.NORTH;
		}

		this.inlets = this.inletsMap[this.dir];
	}
}
