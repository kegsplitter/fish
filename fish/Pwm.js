const PI = Math.PI;
const TAU = Math.PI * 2;
const MAXVALUE = 0.9;
const MINVALUE = -0.9;

function squareOsc(radian, pwm) {
	radian = Math.abs(radian % TAU);
		
	if(radian < PI * pwm) {
		return MAXVALUE;
	} else if (radian > PI && radian < PI + (PI * pwm)){
		return -MINVALUE;
	} else {
		return 0;
	}
}


let squareStep = (TAU / sampleRate) * frequency;

let currentValue = 0;

currentValue += squareStep;

squareOsc(currentValue, 0.5)