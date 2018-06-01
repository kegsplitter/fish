define(['Water'], function(Water){
  class PwmOscillator extends AudioWorkletNode {
    constructor() {
      super(Water.getAudioContext(), 'pwm');
    }

    get frequency() {
      return this.parameters.get('frequency');
    }

    get pulseWidth() {
      return this.parameters.get('pulseWidth');
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
