define(['Water'], function(Water){
  return function(outputAudioNode, inputAudioNode){
    
    let gain = Water.getAudioContext().createGain();
    gain.gain.value = 0;
    inputAudioNode.connect(gain);
    gain.connect(outputAudioNode);
    gain.gain.linearRampToValueAtTime(1, Water.getAudioContext().currentTime + 0.03)
    return function(){
      return new Promise((resolve, reject)=>{
        gain.gain.linearRampToValueAtTime(0, Water.getAudioContext().currentTime + 0.03);

        setTimeout(()=>{
          gain.disconnect();
          gain = null;
        }, 100);
      })
    }
  }
});