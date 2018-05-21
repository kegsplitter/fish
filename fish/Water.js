define(['util/Pipe', 'util/nPow', 'util/Scale'], function(Pipe, nPow, Scale){
	
	const audioContext = new AudioContext();
	
	return {
		Pipe            : Pipe,
		getAudioContext : ()=> audioContext,
		nPow            : nPow,
		Scale           : Scale
	};
});