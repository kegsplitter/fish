define(['Water'], function(Water){
  
  let audioContext = Water.getAudioContext();
  
  class TestWorkletNode extends AudioWorkletNode {
    constructor(context) {
      super(context, 'test-worklet-processor');
    }
  }

  return audioContext.audioWorklet.addModule('audioWorklet/test.js').then(()=>{
    let test = new TestWorkletNode(audioContext);
    console.log(test);

    return TestWorkletNode;
  })
})