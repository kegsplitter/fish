
define(['Water', 'Block5', 'MidiDevice', 'NoteManager', 'PwmOscillator', 'BarStart', 'Patcher'], function(Water, Block5, MidiDevice, NoteManager, PwmOscillator, BarStart, Patcher){

	let audioContext = Water.getAudioContext();
	let patcher = new Patcher();
	function organPlayer(){
  	let noteManager = new NoteManager((note)=> Block5(audioContext.destination, note.hz));
  	let keyPipe = new Water.Pipe();
  	MidiDevice.getKeystationStream()(keyPipe.pushOnly());

  	keyPipe.map(noteManager.pushOnly());
	}
  // Block5(audioContext.destination, 440);
	// console.log(PwmOscillator);
	let outputNode = audioContext.createGain();
	outputNode.gain.value = 0.5;

	outputNode.connect(audioContext.destination);


	let pwm = new PwmOscillator();
	let pwm2 = new PwmOscillator();
	let pwmLow = new PwmOscillator();
	pwm.frequency.value = 200;
	pwm2.frequency.value = 200;
	pwm2.pulseWidth.value = 0.5;
	pwmLow.frequency.value = 100;


	pwm.connect(outputNode);
	pwm2.connect(outputNode);
	pwmLow.connect(outputNode);
	/*
  let lfo = audioContext.createOscillator();
  lfo.frequency.value = 0.5;
  lfo.connect(pwm.parameters.get('pulseWidth'));
  lfo.start();
	*/

	// pwm.connect(audioContext.destination);
 // pwm2.connect(audioContext.destination);
})
