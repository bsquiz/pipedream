class Gunk {
	constructor() {
		this.flows = [];
		this.flows.push(new Flow(768, 95, GameUtilities.Direction.WEST));
		this.isSpilled = false;
		this.pipesCleared = [];
	}
	clearPipe(pipe) {
		this.pipesCleared.push(pipe);
	}
	update() {
		this.flows.forEach(flow => {
			flow.update();
			if (flow.isSpilled) {
				this.isSpilled = true;
			}
			if (flow.hasClearedPipe) {
				this.clearPipe(flow.clearedPipe);
			}
		});
	}
}
