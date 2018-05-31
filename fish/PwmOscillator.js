define(['Water'], function(Water){
  class PwmOscillator extends AudioWorkletNode {
    constructor() {
      super(Water.getAudioContext(), 'pwm');
    }

    static setup(){
      return Water.getAudioContext()
        .audioWorklet
        .addModule('audioWorklet/PwmProcessor.js')
        .then(()=> PwmOscillator)
    }
  }

  return PwmOscillator;
})
