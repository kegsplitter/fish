define(['util/Pipe', 'util/nPow', 'util/Scale', 'util/Mtof'], function(Pipe, nPow, Scale, Mtof){
	
	const audioContext = new AudioContext();
	
	return {
		Pipe            : Pipe,
		getAudioContext : ()=> audioContext,
		nPow            : nPow,
		Scale           : Scale,
		Mtof            : Mtof,
		Clone           : (o) => JSON.parse(JSON.stringify(o))
	};
});