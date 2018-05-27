define(['Water', 'SigPlay', 'BasicPlay', 'SampleLoader'], function(Water, SigPlay, BasicPlay, SampleLoader){
	
  let audioContext = Water.getAudioContext();
  
  SampleLoader.loadSample('/samples/rats.wav', 'rats')
    .then(sampleObject => {
      console.log(sampleObject);
      // BasicPlay(audioContext.destination, sampleObject.buffer)

      SigPlay.then(Test => {

        let test = new Test(audioContext);

        BasicPlay(test, sampleObject.buffer, true);
        // BasicPlay(audioContext.destination, sampleObject.buffer);
        test.connect(audioContext.destination);

      });
    });
	
})