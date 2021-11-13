class StraightPipe extends Pipe {
	constructor(x, y, dir) {
		super(x, y, dir);
		this.type = GameUtilities.PipeType.STRAIGHT;
		this.inletsMap = [
			// north
			[1, 0, 1, 0],
			// east 
			[0, 1, 0, 1],
			// south
			[1, 0, 1, 0],
			// west
			[0, 1, 0, 1]
		];
		this.inlets = this.inletsMap[this.dir];
	}
}
