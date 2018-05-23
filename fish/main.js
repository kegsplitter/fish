define(['Water', 'Ryth1'], function(Water, thing){
	
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
  let signal = audioContext.createConstantSource(); //new Signal(100);
  // signal.offset.value = 0;
  console.log(signal);
  // osc.frequency.value = 0;
  signal.connect(osc.frequency);

  osc.start();
  osc.connect(audioContext.destination);

  setInterval(()=> {
	  let v = Math.random() * 300 + 100;
	  console.log('v', v);
	// signal.offset.linearRampToValueAtTime(v, audioContext.currentTime + 0.5);
	signal.offset.linearRampToValueAtTime(Math.random() * 6 - 3, audioContext.currentTime + 0,5);
	console.log(signal);
  }, 1000);
});