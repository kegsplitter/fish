
define(['play/DrumLoader1Play'], function(DrumLoader1Play){

  DrumLoader1Play();
  
  // PIPE TEST
  /*
  const Pipe = Water.Pipe;

  let p = new Pipe().Head();

  p
    .map((v) => v.type === 'number' ? v : null)
    .setName('numberRoute')
    .getHead()
    .map((v) => v.type === 'string' ? v : null)
    .setName('stringRoute')
    .map((v) => console.log('STRING', v.value))
    .name('numberRoute')
    .map(v => console.log('NUMBER', v.value));
    
    p.push({ type : 'string', value: 'BEAST HAWK OWL'})
    p.push({type : 'number', value: 897458745897458975})
  */
/*
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
  */
	/*
  let lfo = audioContext.createOscillator();
  lfo.frequency.value = 0.5;
  lfo.connect(pwm.parameters.get('pulseWidth'));
  lfo.start();
	*/

	// pwm.connect(audioContext.destination);
 // pwm2.connect(audioContext.destination);
})
