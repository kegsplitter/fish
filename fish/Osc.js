define(['Water'], function(Water){
	return function(audioOutputNode, frequencySignal, detuneSignal, type){
		
		let osc = Water.getAudioContext().createOscillator();
		if(type) osc.type = type;
		
		frequencySignal.connect(osc.frequency);
		detuneSignal.connect(osc.detune);
    osc.frequency.value = 0;
    osc.detune.value = 0;
		osc.start();
		osc.connect(audioOutputNode);
		
		
		return ()=> {
			osc.stop();
			osc.disconnect();
			
			osc = null;
			audioOutputNode = null;
			frequencySignal = null;
			detuneSignal = null;
			type = null;
		}
	}
})