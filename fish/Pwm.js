const PI = Math.PI;
const TAU = Math.PI * 2;

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


let squareStep = (TAU / sampleRate) * frequency;

let currentValue = 0;

currentValue += squareStep;

squareOsc(currentValue, 0.5)