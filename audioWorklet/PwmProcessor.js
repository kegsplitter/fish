const TAU = Math.PI * 2;
const PI = Math.PI;
const MAXVALUE = 0.9;
const MINVALUE = -0.9;

function squareOsc(radian, pwm) {
	radian = Math.abs(radian % TAU);
  pwm = Math.abs(pwm);
  
	if(radian < PI * pwm) {
		return MAXVALUE;
	} else if (radian > PI && radian < PI + (PI * pwm)){
		return MINVALUE;
	} else {
		return 0;
	}
}

function getRadianStep(frequency){
  return (TAU / sampleRate) * frequency;
}

class Pwm extends AudioWorkletProcessor {
  constructor(){
    super();

    this.radian = 0;
    this.lastFrequency = null;
    this.radianStep = null;
  }

  static get parameterDescriptors(){
    return [
      {
        name: 'frequency',
        defaultValue: 440
      },
      {
        name: 'pulseWidth',
        defaultValue: 1,
        minValue: -1,
        maxValue: 1
      }
    ];
  }

  process(inputs, outputs, parameters){

		let channelArray = outputs[0];
    let outputArray = channelArray[0];
    let frequencyArray = parameters.frequency;
    let pulseWidthArray = parameters.pulseWidth;

		for(let i = 0; i < outputArray.length;i++) {
      
      if(frequencyArray[i] !== this.lastFrequency){
        this.lastFrequency = frequencyArray[i];
        this.radianStep = getRadianStep(frequencyArray[i]);
      }
      
      this.radian += this.radianStep;
			outputArray[i] = squareOsc(this.radian, pulseWidthArray[i]);
		}

		return true;
  }
}

registerProcessor('pwm', Pwm);
