define(['Water'], function(Water){
  return function(audioOutputNode){

    let audioContext = Water.getAudioContext();
    let outy = audioContext.createGain();
    outy.gain.value = 1 / 8;
    outy.connect(audioOutputNode);

    let baseHz = 100;
    let oscList = new Array(8)
      .fill(null)
      .map((v,i)=>{
        let osc = audioContext.createOscillator();
        osc.type = 'square';
        osc.frequency.value = baseHz + (baseHz * i * 0.001);
        osc.start();
        osc.connect(outy);
      })

      return ()=>{}
  }
});