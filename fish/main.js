define(['Water', 'Ryth1', 'Signal', 'Osc', 'Patcher', 'Lfo'], function(Water, thing, Signal, Osc, Patcher, Lfo){
	
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
  Lfo(patcher.getPatch('lOut'), new Signal(200), new Signal(5), new Signal(1));
  Osc(audioContext.destination, patcher.getPatch('lOut'), new Signal(0));
  //let frequencySignal = new Signal(500);

  // Lfo(patcher.getPatch('1'), new Signal(0), new Signal(5.5), new Signal(200));
  // Osc(audioContext.destination, frequencySignal, patcher.getPatch('1'));

  /*
	let patcher = new Patcher();
	let frequencySignal = new Signal(500);
	let detuneOscSignal = new Signal(5);
	
	Osc(patcher.getPatch('LfoOut'), detuneOscSignal, new Signal(5))
	console.log(patcher.getPatch('LfoOut'));
	Osc(audioContext.destination, frequencySignal, patcher.getPatch('LfoOut'));
*/
  // setInterval(()=> frequencySignal.gain.linearRampToValueAtTime(Math.random() * 300 + 100, audioContext.currentTime + 1), 1000);
  
});