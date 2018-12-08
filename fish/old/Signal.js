define(['Water', 'WormBuffer'], function(Water, WormBuffer){
	
	let normalSignal = WormBuffer.createPlayFromList('1, 1 1', true, true);
	
	return function(hz){
		
		let gain = Water.getAudioContext().createGain();
		
		gain.gain.value = hz ? hz : 1;
		normalSignal.connect(gain);
				
		return gain;
	}
});