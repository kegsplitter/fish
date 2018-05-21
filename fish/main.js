define(['Water', 'Ryth2'], function(Water, thing){
	
	let audioContext = Water.getAudioContext();

	let outputNode = audioContext.createGain();
	outputNode.connect(audioContext.destination);

	function playThing(){
		let destroy = thing(outputNode);
/*
		setTimeout(()=>{
			destroy();

			setTimeout(playThing, 500);
		}, 1000);
	*/
	}

	playThing();

});