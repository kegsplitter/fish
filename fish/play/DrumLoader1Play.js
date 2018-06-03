define(['Water', 'DrumLoader1', 'BasicPlay', 'sequencer/Sequencer', 'pulse/Pulse', 'SampleBank'], function(Water, DrumLoader1, BasicPlay, Sequencer, Pulse, SampleBank){
  return function(){
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
  }
});