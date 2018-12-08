define(['Water'], function(Water){
  return function(outputAudioNode){
    
    let audioContext = Water.getAudioContext();

    let osc = audioContext.createOscillator();

    osc.connect(outputAudioNode);
    osc.start();
    
    osc.frequency.setValueAtTime(200, audioContext.currentTime);
    

    function rampy(param, startTime){

      let slideLength = 1 / 8;
      let waitLength = (1 / 8) * 7

      let currentTime = startTime;

      currentTime += slideLength
      param.linearRampToValueAtTime(200, currentTime);

      currentTime += waitLength
      param.linearRampToValueAtTime(200, currentTime);

      currentTime += slideLength;
      param.linearRampToValueAtTime(300, currentTime);

      currentTime += waitLength;
      param.linearRampToValueAtTime(300, currentTime);

      currentTime += slideLength;
      param.linearRampToValueAtTime(400, currentTime);

      currentTime += waitLength;
      param.linearRampToValueAtTime(400, currentTime);

      currentTime += slideLength
      param.linearRampToValueAtTime(600, currentTime);

      currentTime += waitLength
      param.linearRampToValueAtTime(600, currentTime);

    }

    let t = audioContext.currentTime;
    for(let i = 0; i < 4; i++){
      rampy(osc.frequency, t + (i * 4));
    }

    return ()=>{}
  }
})