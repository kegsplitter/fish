define(['Water', 'WormBuffer'], function(Water, WormBuffer){
  
  let normalSignal = (function(){
    let worm = new WormBuffer(1);
    worm.wait(1);
    return worm.createPlay();
  })();


  return function(initValue){
    let signal = Water.getAudioContext().createGain();
    signal.gain.maxValue = Water.getAudioContext().sampleRate;
    normalSignal.connect(signal);
    if(initValue) signal.gain.value = initValue;

    return signal;
  }
});