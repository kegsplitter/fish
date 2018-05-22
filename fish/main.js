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

  let osc = audioContext.createOscillator();
  let signal = new Signal(100);
  console.log(signal);
  osc.frequency.value = 0;
  signal.connect(osc.frequency);

  osc.start();
  osc.connect(audioContext.destination);

  setInterval(()=> signal.gain.linearRampToValueAtTime(Math.random() * 300 + 100, audioContext.currentTime + 0.5), 1000);
});