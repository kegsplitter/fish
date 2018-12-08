define(['Water'], function(Water){
  return function(outAudioNode){

    let audioContext = Water.getAudioContext();
    let nPow = Water.nPow;
    let Scale = Water.Scale;
    let oscList = [];

    new Array(6)
      .fill(null)
      .forEach((v, i)=>{
        let startValue = nPow(5.3 + i) + (Math.random() * 0.2) - 0.1;
        
        new Array(12)
          .fill(null)
          .forEach((v, i)=>{
            let osc = audioContext.createOscillator();
            // osc.type = 'square';
            osc.frequency.value = startValue + (12/3) * i;
            
            osc.connect(outAudioNode)
            osc.start();
    
            oscList.push(osc)
          })
      })

    return ()=>{
      audioContext = null;
      nPow = null;
      Scale = null;
      oscList.forEach(osc => {osc.stop(); osc.disconnect();});
      oscList = null;
    }
  }
});