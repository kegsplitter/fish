define(['Water', 'Ryth1', 'Signal', 'Osc', 'Patcher'], function(Water, thing, Signal, Osc, Patcher){
	
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

	let patcher = new Patcher();
	let frequencySignal = new Signal(200);
	let detuneOscSignal = new Signal(0.5);
	
	Osc(patcher.getPatch('LfoOut'), detuneOscSignal, new Signal(1))
	console.log(patcher.getPatch('LfoOut'));
	Osc(audioContext.destination, frequencySignal, patcher.getPatch('LfoOut'));

	setInterval(()=> frequencySignal.gain.linearRampToValueAtTime(Math.random() * 300 + 100, audioContext.currentTime + 1), 1000);
});