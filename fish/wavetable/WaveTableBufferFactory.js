// wave table buffer factory
const {getAudioContext} = require('../util/AudioContext.js');

const downMult = 0.75;

function getStep(sampleRate){
	return (Math.PI * 2) / sampleRate
}

function genericBufferSetup(audioContext){
	const sampleRate = audioContext.sampleRate;
	const buffer = audioContext.createBuffer(1, sampleRate, sampleRate);
	
	return {
		sampleRate,
		buffer,
		channelData: buffer.getChannelData(0),
		step: getStep(sampleRate)
	}
}

function createWhiteNoiseBuffer(duration = 1){
    let audioContext = getAudioContext();
    let buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    let data = buffer.getChannelData(0);

    for(let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2) - 1;
    }

    return buffer;
}

function createSineBuffer(audioContext){
	const {sampleRate, buffer, channelData, step} = genericBufferSetup(audioContext);
	
	let current = 0;
	
	for(let i = 0; i < channelData.length; i++){
		channelData[i] = Math.sin(current) * downMult;
		current += step;
	}
	
	return buffer;
}

function createSawtoothBuffer(audioContext){
	const {sampleRate, buffer, channelData, step} = genericBufferSetup(audioContext);
	const halfSampleRate = sampleRate / 2;

	for(let i = 0; i < sampleRate;i++){
		let value = i / halfSampleRate;
		if(i > halfSampleRate) value -= 2;
		channelData[i] = value
	}

	return buffer;
}

function createSquareBuffer(audioContext){
	const {sampleRate, buffer, channelData, step} = genericBufferSetup(audioContext);
	
	let current = 0;
	for(let i = 0; i < sampleRate;i++){
		channelData[i] = (Math.sin(current) > 0 ? 1 : -1) * downMult;
		
		current += step;
	}
	
	return buffer;
}

function createTriangleBuffer(audioContext){
	const {sampleRate, buffer, channelData} = genericBufferSetup(audioContext);

  let quarter = sampleRate / 4;

  let step = 1 / quarter;

  let current = 0;
  for(let i = 0; i < sampleRate;i++){

    channelData[i] = current;
    let change = step;

    if(i > quarter&& i < quarter * 3){
      change = change * -1;
    }

    current += change;
  }
	return buffer;
}

function createBrokenTriangleBuffer(audioContext){
	const {sampleRate, buffer, channelData, step} = genericBufferSetup(audioContext);

	let quarterSampleRate = sampleRate / 4;
	let threeQuarter = quarterSampleRate * 3;

	for(let i = 0; i < sampleRate; i++){
		
		let value = i / quarterSampleRate;
		
		if(i > quarterSampleRate && i < threeQuarter) {
			value = 1 - 1 - value;
		} else if(i > threeQuarter){
			value = value - 4;
		} 
		channelData[i] = value;		
	}

	return buffer;
}


module.exports = {
    createWhiteNoiseBuffer: createWhiteNoiseBuffer,
    createSineBuffer: createSineBuffer,
    createBrokenTriangleBuffer: createBrokenTriangleBuffer,
    createTriangleBuffer: createTriangleBuffer,
    createSquareBuffer: createSquareBuffer,
    createSawtoothBuffer: createSawtoothBuffer
};