define(['Water', 'Patcher'], function(Water, Patcher){
  
  function createSquareBoi(powNote, detune){
    let osc = Water.getAudioContext().createOscillator();
    osc.type = 'square';
    osc.frequency.value = Water.nPow(powNote);
    osc.detune.value = detune ? detune : 0;
    osc.start();

    return osc;
  }

  function createSinBoi(powNote, detune){
    let osc = Water.getAudioContext().createOscillator();
    osc.frequency.value = Water.nPow(powNote);
    osc.detune.value = detune ? detune : 0;
    osc.start();

    return osc;
  }
  
  
  return function(outputAudioNode){
    let patcher = new Patcher();
    let audioContext = Water.getAudioContext();
    let powNote = 6;
    let detune = 0;
    
    let oscList = [
      createSinBoi(powNote, -detune),
      createSinBoi(powNote, detune),
      createSinBoi(powNote - 1)
    ];

    oscList.map(osc => osc.connect(patcher.getPatch('osc')));

    patcher.getPatch('osc').connect(outputAudioNode)
    
    return ()=> {
        patcher.destroy();;
        oscList.forEach(osc => {osc.stop();osc.disconnect()});

        patcher = null;
        oscList = null;
        audioContext = null;
    }
  }
});