const TAU = Math.PI * 2;
const PI = Math.PI;
function squareOsc(radian, pwm) {
	radian = Math.abs(radian % TAU);

	if(pwm === undefined){
		pwm = 1;
	} else {
		pwm = Math.abs(pwm);
		if(pwm > 1) pwm = 1;
	}

	if(radian < PI * pwm) {
		return 1;
	} else if (radian > PI && radian < PI + (PI * pwm)){
		return -1;
	} else {
		return 0;
	}
}

class Pwm extends AudioWorkletProcessor {
  constructor(){
    super();

    this.radian = 0;
  }

  process(inputs, outputs, parameters){
		let step = (TAU / sampleRate) * 440;

		let output = outputs[0];
		let channel = output[0];

		for(let i = 0; i < channel.length;i++) {
			this.radian += step;
			channel[i] = squareOsc(this.radian, Math.random());
		}

		return true;
  }
}

registerProcessor('pwm', Pwm);
