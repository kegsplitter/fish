define(['Water'], function(Water){

  class TestWorkletNode extends AudioWorkletNode {
    constructor() {
      super(Water.getAudioContext(), 'test-worklet-processor');
    }

    static setup(){
      return Water.getAudioContext()
        .audioWorklet
        .addModule('audioWorklet/test.js')
        .then(()=> TestWorkletNode);
    }
  }

  return TestWorkletNode;
})
