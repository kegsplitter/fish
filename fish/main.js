
define(['Water', 'Block5', 'MidiDevice', 'NoteManager', 'PwmOscillator'], function(Water, Block5, MidiDevice, NoteManager, PwmOscillator){

	let audioContext = Water.getAudioContext();

	function organPlayer(){
  	let noteManager = new NoteManager((note)=> Block5(audioContext.destination, note.hz));
  	let keyPipe = new Water.Pipe();
  	MidiDevice.getKeystationStream()(keyPipe.pushOnly());

  	keyPipe.map(noteManager.pushOnly());
	}
  // Block5(audioContext.destination, 440);
	// console.log(PwmOscillator);

	let pwm = new PwmOscillator();
  console.log('pwm.pulseWidth', pwm.parameters.get('pulseWidth'));
  console.log('pwm', pwm);
  console.log('f', pwm.frequency);
  console.log('width', pwm.pulseWidth);

  pwm.parameters.get('frequency').value = 200;
  let lfo = audioContext.createOscillator();
  lfo.frequency.value = 0.5;
  lfo.connect(pwm.parameters.get('pulseWidth'));
  lfo.start();
  
	pwm.connect(audioContext.destination);
})
