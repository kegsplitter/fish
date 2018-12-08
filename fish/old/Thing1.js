define(['Water', 'WormBuffer', 'EndGain'], function(Water, WormBuffer, EndGain){
  return function(audioOutput){

    let audioContext = Water.getAudioContext();

    let osc = audioContext.createOscillator();
    osc.frequency.value = 0;
    osc.type = 'square';

    let frequChange = WormBuffer.createPlayFromList(`100, 200 0.25, 100 0.01`, true, true)

    frequChange.connect(osc.frequency);

    osc.start();
   
    let destroyEndGain = EndGain(audioOutput, osc);

    return function(){

      destroyEndGain().then(() => {
        osc.stop();
        frequChange.stop();
  
        osc.disconnect();
        frequChange.disconnect();

        // null everything
        audioContext = null;
        osc = null;
        frequChange = null;
        destroyEndGain = null;
      });

    }
  };
});