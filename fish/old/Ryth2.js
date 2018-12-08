define(['Water', 'Block2', 'Patcher', 'WormBuffer', 'EndGain'], function(Water, Block2, Patcher, WormBuffer, EndGain){
  return function(outputAudioNode){
    let audioContext = Water.getAudioContext();
    let patcher = new Patcher();

    let filter = audioContext.createBiquadFilter();
    filter.type ='lowpass';
    filter.frequency.value = 0;

    
    let worm = new WormBuffer(0);

    let noteLength = 2 / (8 * 2);

    new Array(8)
      .fill(null)
      .map((n, i)=> {
        if(i === 0) {
          worm.lineTo(Water.nPow(8.3), noteLength / 4);
          worm.lineTo(0, (noteLength/4) * 3);
        } else if( i === 5 || i == 6){
          worm.lineTo(Water.nPow(8), noteLength / 2 );
          worm.lineTo(Water.nPow(0), noteLength / 2);
        } else {
          worm.lineTo(Water.nPow(7), noteLength / 2);
          worm.lineTo(0, noteLength / 2);
        }
      });
    
    let play = worm.createPlay(true, true);
    play.connect(filter.frequency);

    let destroyBlock = Block2(filter);
    filter.connect(patcher.getPatch(0));
    let destroyEnd = EndGain(outputAudioNode, patcher.getPatch(0));

    return ()=> destroyEnd().then(()=>{
      patcher.destroy();
      destroyBlock();
      filter.disconnect();
      play.stop();
      play.disconnect();


      patcher = null;
      audioContext = null;
      filter = null;
      play = null;
    })
  }
});