define(['Water', 'Ryth3', 'MidiDevice'], function(Water, thing, MidiDevice){
	
	MidiDevice.getKeystationStream()(v => console.log(v));

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