$( document ).ready(function() {
	const cellSize = 80;
	const empty = {
		value: 16,
		top: 3,
		left: 3
	}

	const cells = [];
	cells.push(empty);

	function move(index) {
		const cell = cells[index];
		const leftDiff = Math.abs(empty.left - cell.left);
		const topDiff = Math.abs(empty.top - cell.top);
		if (leftDiff + topDiff > 1) {
			return;
		}

		$(cell.element).css('left', empty.left*cellSize).css('top', empty.top*cellSize);
		const emptyLeft = empty.left;
		const emptyTop = empty.top;
		empty.left = cell.left;
		empty.top = cell.top;
		cell.left = emptyLeft;
		cell.top = emptyTop;

		const isFinished = cells.every(cell => {
			return cell.value === cell.top * 4 + cell.left+1;
		});
		if (isFinished) {
			$('#modal-puzzle').modal({show: true});
		}
	}

	function runPuzzle() {
		const numbers = [...Array(15).keys()].sort(()=>Math.random()-0.5);
		for (let i = 0; i <= 14; i++) {
			const value = numbers[i]+1;
			const left = (i % 4);
			const top = ((i - left) / 4);
			const cell = $(document.createElement('div')).addClass("cell jumbotron p-2 border border-primary rounded position-absolute text-center");
			$(cell).append(value);
			
			cells.push({
				value: value,
				left: left,
				top: top,
				element: cell
			});

			$(cell).css("left", left*cellSize).css("top", top*cellSize);

			$('#field').append(cell);

			$(cell).bind('click', function(){
				move(i+1);
			});
		}
	}

	function refreshPuzzle() {
		$('#field').html('');
    	empty.value = 16;
		empty.top = 3;
		empty.left = 3;

		cells.length=0;
		cells.push(empty);
    	runPuzzle();
	}

	$('#refresh').click(function() {
    	refreshPuzzle();
	});

	$('#refresh-m').click(function() {
    	refreshPuzzle();
	});

	runPuzzle();
});