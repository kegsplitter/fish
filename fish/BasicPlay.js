define(['Water', 'EndGain'], function(Water, EndPlay){
  return function(audioOutputNode, sample){

    let play = Water.getAudioContext().createBufferSource();
    play.buffer = sample;
    
    play.start();
   
    let destroyEnd = EndPlay(audioOutputNode, play);

    let destroy = () => destroyEnd.then(function(){
      play.stop();
      play.disconnect();
      play = null;
      audioOutputNode = null;
      sample = null;
    });

    play.onended = destroy;

    return destroy;
  }
});