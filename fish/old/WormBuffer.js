
define(["Water"], function(Water){
	
	function applyWait(data, startIndex, length, value){
		for(let i = startIndex; i < (startIndex + length); i++ ){
			data[i] = value;
		}
	}
	
	function applyLineTo(data, startIndex, length, startValue, endValue) {
		
		let step = (endValue - startValue) / length;
		let value = startValue;
		
		for(let i = startIndex; i< (startIndex + length);i++){
			data[i] = value;
			value += step;
		}
	}

	function processStringList(stringList){
		return stringList.split(',')
		.map(s => s.trim().replace(/\s+/g, " ").split(" "))
		.map(l => l.map(Number));
	}
	
	class WormBuffer{
		constructor(startValue){
			this.list = [];
			
			this.audioContext = Water.getAudioContext();
			
			if(startValue !== undefined) this.moveTo(startValue);
		}
		
		createAudioBuffer(){
			// count how many seconds are involved
			let secondsLength = 0;
			
			this.list.forEach(o => {
				if(!o.hasOwnProperty('seconds')) return;
				secondsLength += o.seconds;
			});
			
			// create a buffer this length
			let buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * secondsLength, this.audioContext.sampleRate);
			let data = buffer.getChannelData(0);
			let currentDataIndex = 0;
			let currentValue = 0;
			
			this.list.forEach(o => {
				if(o.type === 'moveTo') return currentValue = o.value;
				if(o.type === "wait") {
					applyWait(data, currentDataIndex, this.audioContext.sampleRate * o.seconds, currentValue);
				
					currentDataIndex += this.audioContext.sampleRate * o.seconds
					
					return;
				};
				if(o.type === 'lineTo'){
					applyLineTo(data, currentDataIndex, this.audioContext.sampleRate * o.seconds, currentValue, o.value);
					
					currentDataIndex += this.audioContext.sampleRate * o.seconds;
					currentValue = o.value;
				}
			})
			
			return buffer;
		}

		createPlay(loopBool, autoPlayBool){
			let play = this.audioContext.createBufferSource();
			play.loop = loopBool ? true : false;
			play.buffer = this.createAudioBuffer();
			if(autoPlayBool) play.start();

			return play;
		}

		processStringList(stringList){
			processStringList(stringList).forEach((l, i) => {
				if(i === 0 && l.length === 1) {
					this.moveTo(l[0])
				} else if(i !== 0 && l.length === 1){
					this.wait(l[0]);
				} else {
					this.lineTo(l[0], l[1]);
				}
			});
		}

		rampParam(param, startTime){
			// TODO: CARRY ON HERE
		}
		
		lineTo(value, seconds){
			this.list.push({
				type: 'lineTo',
				value: value,
				seconds: seconds
			});
		}
		
		wait(seconds){
			this.list.push({
				type: 'wait',
				seconds: seconds
			});
		}
		
		moveTo(value){
			this.list.push({
				type: 'moveTo',
				value: value
			});
		}
	}
	
	WormBuffer.createBufferFromList = function(stringList){
		// this can be "10,150 1, 0 2, 0.5 1" ETC
		// if there is a single number in first places then this will init (be a moveTo)
		
		let wormBuffer = new WormBuffer();
		wormBuffer.processStringList(stringList);

		return wormBuffer.createAudioBuffer();
	}

	WormBuffer.createPlayFromList = function(stringList, loopBool, autoPlay){

		let audioContext = Water.getAudioContext();
		let play = audioContext.createBufferSource();
		play.buffer = WormBuffer.createBufferFromList(stringList);

		play.loop = loopBool ? true : false;

		if(autoPlay) play.start();

		return play;
	};

	WormBuffer.rampParamWithList = function(parama, stringList) {

	}
	
	return WormBuffer;
});