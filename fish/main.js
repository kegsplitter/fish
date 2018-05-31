
define(['Water', 'Block5', 'MidiDevice', 'NoteManager', 'PwmOscillator'], function(Water, Block5, MidiDevice, NoteManager, PwmOscillator){

	let audioContext = Water.getAudioContext();

	function organPlayer(){
  	let noteManager = new NoteManager((note)=> Block5(audioContext.destination, note.hz));
  	let keyPipe = new Water.Pipe();
  	MidiDevice.getKeystationStream()(keyPipe.pushOnly());

  	keyPipe.map(noteManager.pushOnly());
	}
  // Block5(audioContext.destination, 440);
	console.log(PwmOscillator);

	let pwm = new PwmOscillator();

	pwm.connect(audioContext.destination);
})
