function dart(){
	const colorMaping = {
		firstLayer: 0,
		secondLayer: 1,
		thirdLayer: 2,
		fourthLayer: 3,
		fifthLayer: 4,
		sixthLayer: 5
	};

	const maxScore = 100;
	$('#playBoard').on('click', 'div', playDarts);

	let isHome = true;

	function playDarts(event){
		event.stopPropagation();

		let id = event.target.id;
		let points = getPoints(id);

		applyScore(points);
	}

	function getPoints(id){
		return +$('#scoreBoard')
		.find('tbody tr')
		.eq(colorMaping[id])
		.children()
		.eq(1)
		.text()
		.split(' ')[0];
	}

	function applyScore(points){
		let selector = '';
		isHome 
		? selector = "#Home" 
		: selector = "#Away";

		let $pointsElement = $(selector).children().eq(0);
		$pointsElement.text((i, t) => Number(t) + points);
		//Switch turns
		$('#turns').children().eq(0).insertAfter($('#turns').children().eq(1));
		
		let currentPoints = Number($pointsElement.text());
		if(currentPoints >= maxScore){
			//Set coloring
			if(isHome){
				$('#Home').children().eq(1).css({
					background: 'green'
				});

				$('#Away').children().eq(1).css({
					background: 'red'
				});
			}else{
				$('#Away').children().eq(1).css({
					background: 'green'
				});

				$('#Home').children().eq(1).css({
					background: 'red'
				});
			}
			
			//Remove events
			$('#playBoard').off('click');
		}

		isHome = !isHome;
	}
}