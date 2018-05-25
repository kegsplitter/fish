define(['Water', 'Ryth1', 'Signal'], function(Water, thing, Signal){
	
	let audioContext = Water.getAudioContext();

	let outputNode = audioContext.createGain();
	outputNode.connect(audioContext.destination);

	function playThing(){
		let destroy = thing(outputNode);

		setTimeout(()=>{
			destroy();

			setTimeout(playThing, 500);
		}, 1000);
	
	}

	// playThing();

	let signal = new Signal(200);
	let osc = audioContext.createOscillator();
	osc.frequency.value = 0;
	signal.connect(osc.frequency);
	osc.connect(audioContext.destination);
	osc.start();
	
	setInterval(()=> signal.gain.linearRampToValueAtTime(Math.random() * 300 + 100, audioContext.currentTime + 1), 1000)
});