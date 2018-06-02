
define(['Water', 'DrumLoader1', 'BasicPlay', 'sequencer/Sequencer', 'pulse/Pulse', 'SampleBank'], function(Water, DrumLoader1, BasicPlay, Sequencer, Pulse, SampleBank){

  const { Bone } = Sequencer;
  
  let audioContext = Water.getAudioContext();
  let patcher = new Water.Patcher();

  let handList = [
    [
      'conga_l', 0, 8
    ],
    [
      'conga_l', 3, 8
    ],
    [
      'conga_l', 4, 8
    ]
  ];

  let boneList = Bone.processHandList(handList);

  DrumLoader1().then(sampleList => {
    
    Pulse(patcher.getPipe('pulseOut'), audioContext.currentTime + 1, 0.8);

    Sequencer.Ready(patcher.getPipe('readyOut'), patcher.getPipe('pulseOut'), patcher.getPipe('readyCommand'));
    SampleBank(patcher.getPipe('sampleBankOut'), patcher.getPipe('readyOut'), patcher.getPipe('sampleBankCommand'));

    patcher.getPipe('sampleBankOut')
      .watch(sample => BasicPlay(audioContext.destination, sample.buffer, false, sample.targetTime));
    
    boneList.forEach(bone => patcher.getPipe('readyCommand').push(Water.Command('add', bone)));
    sampleList.forEach(sample => patcher.getPipe('sampleBankCommand').push(Water.Command('add', sample)));

  });
  
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
