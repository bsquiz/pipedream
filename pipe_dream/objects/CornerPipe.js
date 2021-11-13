class CornerPipe extends Pipe {
	constructor(x, y, dir) {
		super(x, y, dir);
		this.type = GameUtilities.PipeType.CORNER;
		this.inletsMap = [
			// north
			[1, 1, 0, 0],
			// east 
			[0, 1, 1, 0],
			// south
			[0, 0, 1, 1],
			// west
			[1, 0, 0, 1]
		];
		this.inlets = this.inletsMap[this.dir];
	}
}
