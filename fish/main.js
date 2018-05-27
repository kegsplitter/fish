define(['Water', 'WhiteNoiseGenerator', 'BasicPlay'], function(Water, WhiteNoiseGenerator, BasicPlay){
	
	let audioContext = Water.getAudioContext();
	
  let buffer = WhiteNoiseGenerator.createWhiteBuffer();

  BasicPlay(audioContext.destination, buffer);
})