game.display = {
	context: {},
	$pipesMap: {},
	$pipes: document.querySelector('#pipes'),
	highlightClasses: ['n', 'e', 's', 'w'],

	init(pipes) {
		this.context = document.querySelector('#canvas').getContext('2d');
		for (let row=0; row<GameUtilities.ROWS; row++) {
			const $row = document.createElement('div');
			$row.className = 'row';

			for (let col=0; col<GameUtilities.COLS; col++) {
				const { type } = pipes[row][col];
				const $pipe = document.createElement('div');

				$pipe.className = `pipe initial ${GameUtilities.typeToClass(type)}`;
				$pipe.setAttribute('row', row);
				$pipe.setAttribute('col', col);
				$row.appendChild($pipe);
				this.$pipesMap[`${row}_${col}`] = $pipe; 
			}

			this.$pipes.appendChild($row);
		}
	},
	drawGunk(gunk) {
		const { flows } = gunk;
		this.context.strokeStyle = 'green';
		this.context.lineWidth = 20;
		this.context.beginPath();
		flows.forEach(flow => {
			const { turns } = flow;
			turns.forEach(turn => {	
				const { startX, startY, x, y } = turn;
				this.context.moveTo(startX, startY);
				this.context.lineTo(x, y);
			});
		});
		this.context.stroke();
	},
	animatePipe(pipe) {
		const { row, col } = pipe;
		const $pipe = this.$pipesMap[`${row}_${col}`];
		const list = $pipe.classList;

		if (list.contains('pipe')) {
			if (list.contains('initial')) {
				list.add('east');
				list.remove('initial');
			} else if (list.contains('east')) {
				list.add('south');
				list.remove('east');
			} else if (list.contains('south')) {
				list.add('west');
				list.remove('south');
			} else if (list.contains('west')) {
				list.add('north');
				list.remove('west');

				window.setTimeout(() => {
					list.remove('north');
					list.add('initial');
				}, 200);
			}
		}
	},
	resetPipeHighlight(pipe) {
		const { row, col } = pipe;
		const $pipe = this.$pipesMap[`${row}_${col}`];

		$pipe.classList.remove(...this.highlightClasses);
	},
	addPipeConnectionHighlight($pipe, inletDir) {
		$pipe.classList.add(this.highlightClasses[inletDir]);
	},
	highlightInlet(inletDir, pipe) {
		const { row, col, inlets } = pipe;
		const $pipe = this.$pipesMap[`${row}_${col}`];
		if (inlets[inletDir]) {
			this.addPipeConnectionHighlight($pipe, inletDir);
		}
	}
};
