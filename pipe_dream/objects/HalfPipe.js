class HalfPipe extends Pipe {
	constructor(x, y, dir) {
		super(x, y, dir);
		this.type = GameUtilities.PipeType.HALF_INTERSECTION;
		this.inletsMap = [
			// north
			[1, 1, 0, 1],
			// east 
			[1, 1, 1, 0],
			// south
			[0, 1, 1, 1],
			// west
			[1, 0, 1, 1]
		];
		this.inlets = this.inletsMap[this.dir];
	}
}
