define(['Water'], function(Water){
  return function(outputAudioNode){

    let audioContext = Water.getAudioContext();
    let nPow = Water.nPow;
    let oscList = [];


    function itter(value){
      if(nPow(value) > nPow(10)) return;

      let osc = audioContext.createOscillator();

      osc.frequency.value = nPow(value);

      osc.connect(outputAudioNode);
      osc.start();
      oscList.push(osc);

      itter(value + Math.random());
    }

    itter(5);
    
    return function(){
      oscList.forEach(osc => {osc.stop();osc.disconnect()});

      audioContext = null;
      nPow = null;
      oscList = null;
    }
  }
});