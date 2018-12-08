define(['Water', 'EndGain', 'WhiteNoiseGenerator', 'Patcher'], function(Water, EndGain, WhiteNoiseGenerator, Patcher){
  return function(audioOutputNode, baseHz){

    let audioContext = Water.getAudioContext();
    let patcher = new Patcher();
    let play = WhiteNoiseGenerator.createWhitePlay();

    let filterList = new Array(8)
      .fill(null)
      .map((v, i)=> {
        let filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = baseHz * Math.pow(2, i);
        filter.Q.value = 100;
        play.connect(filter);
        filter.connect(patcher.getPatch('filterListOut'));
        return filter;
      })

    filterList = filterList.concat(
      new Array(8)
        .fill(null)
        .map((v,i)=>{
          let filter = audioContext.createBiquadFilter();
          filter.type = 'bandpass';
          filter.Q.value = 100;
          let offsetHz = baseHz * Math.pow(2, i);
          filter.frequency.value = offsetHz * 1.5;
          play.connect(filter);
          filter.connect(patcher.getPatch('filterListOut'));

          return filter;
        })
    )
    let destroyEnd = EndGain(audioOutputNode, patcher.getPatch('filterListOut'));

    return ()=> destroyEnd().then(()=>{
      play.stop();
      play.disconnect();
      filterList.forEach(filter => filter.disconnect());
      patcher.destroy();
      audioContext = null;
      patcher = null;
      filterList = null;
    })
  }
});