 define(['Water'], function(Water){
	
	return function(outputNode){
		
		let osc = Water.getAudioContext().createOscillator();
		
		osc.connect(outputNode);
		
		osc.frequency.value = 440;
		
		osc.start();
		
		return function(){
			osc.stop();
			osc.disconnect();
			
			// null out everything
			osc = null;
			Water = null;
		}
	};
 })