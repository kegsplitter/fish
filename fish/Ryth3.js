define(['Water', 'Block3', 'EndGain', 'Patcher', 'WormBuffer'], function(Water, Block3, EndGain, Patcher, WormBuffer){
  return function(outputAudioNode){
    let patcher = new Patcher();

    let destroyBlock = Block3(patcher.getPatch('block'))

    let filter = Water.getAudioContext().createBiquadFilter();
    filter.frequency.value = 0;
    patcher.getPatch('block').connect(filter);

    let worm = new WormBuffer(Water.nPow(4));

    let step = 0.5 / 8;
    new Array(8)
      .fill(null)
      .forEach((v, i)=>{
        worm.lineTo(Water.nPow(10), step);
        worm.lineTo(Water.nPow(4), step * 2);
      })
    
    let wormPlay = worm.createPlay(true, true);
    wormPlay.connect(filter.frequency);
    
    let endGain = EndGain(outputAudioNode, filter);
    
    return () => endGain.then(()=>{
      destroyBlock();
      patcher.destroy();
    })
  }
})