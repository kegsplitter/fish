define(['Water'], function(Water){

  function createWhiteBuffer(){
    let audioContext = Water.getAudioContext();

    let buffer = audioContext.createBuffer(1, audioContext.sampleRate * 5, audioContext.sampleRate);
    let data = buffer.getChannelData(0);

    for(let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2) - 1;
    }

    return buffer;
  }

  function createWhitePlay(){
    let play = Water.getAudioContext().createBufferSource();
    play.buffer = createWhiteBuffer();
    play.loop = true;
    play.start();

    return play;
  }

  return {
    createWhiteBuffer: createWhiteBuffer,
    createWhitePlay: createWhitePlay
  }

});