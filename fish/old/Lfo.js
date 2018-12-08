define(['Water', 'Signal'], function(Water, Signal){
  return function(audioOutputNode, baseHzSignal, frequencySignal, gainSignal) {

    let osc = Water.getAudioContext().createOscillator();
    let gain = Water.getAudioContext().createGain();
    let base = new Signal(0);

    osc.frequency.value = 0;
    frequencySignal.connect(osc.frequency);
    osc.start();
    
    gainSignal.connect(gain.gain);

    baseHzSignal.connect(audioOutputNode);
    base.connect(gain);
    osc.connect(gain);
    gain.connect(audioOutputNode);

    return () => {
      osc.stop();
      osc.disconnect();
      gain.disconnect();
      base.disconnect();

      osc = null;
      gain = null;
      audioOutputNode = null;
      frequencySignal = null;
      gainSignal = null;
    }
  }
})