define(['Water', 'Block2', 'EndGain', 'WormBuffer', 'Patcher'], function(Water, Block2, EndGain, WormBuffer, Patcher){
  return function(audioOutput){
    let audioContext = Water.getAudioContext();
    let patcher = new Patcher();

    let filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 0;

    let play = WormBuffer.createPlayFromList('0, 500 3', true, true);

    play.connect(filter.frequency);

    filter.connect(patcher.getPatch(1));

    let destoryBlock2 = Block2(filter);
    let destroyEndGain = EndGain(audioOutput, patcher.getPatch(1));

    return () => destroyEndGain().then(()=>{
      destoryBlock2();
      patcher.destroy();
      connector1.disconnect();
      filter.disconnect();
      player.stop();
      play.disconnect();

      audioContext = null;
      connector1 = null;
      patcher = null;
      filter = null;
      play = null;
    });
  }
})