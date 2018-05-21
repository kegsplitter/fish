define(function(){
	return (inMin, inMax, outMin, outMax, value) => {
		let inRange = inMax - inMin;
		let outRange = outMax - outMin;
		value = (value - inMin) / inRange;
		
		return (value * outRange) + outMin;
	};
});