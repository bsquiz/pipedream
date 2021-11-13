class FullPipe extends Pipe {
	constructor(x, y, dir) {
		super(x, y, dir);
		this.type = GameUtilities.PipeType.FULL_INTERSECTION;
		this.inletsMap = [
			// north
			[1, 1, 1, 1],
			// east 
			[1, 1, 1, 1],
			// south
			[1, 1, 1, 1],
			// west
			[1, 1, 1, 1]
		];
		this.inlets = this.inletsMap[this.dir];
	}
}
