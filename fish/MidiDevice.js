define(['Water'], function(Water){
	const Pipe = Water.Pipe;
	
	function getMidiAccess(){
		return navigator['requestMIDIAccess']();
	}
	
	function getMidiDevice(deviceName){
		function innerGet(){
			return getMidiAccess()
				.then(access => {
					let findInput;
					access.inputs.forEach(input => {
						if(input.name === deviceName){
							findInput = input;
						}
					})
				
					if (findInput) return findInput;
					throw `Device ${deviceName} not found`;
				});
		}
	
	
		return new Promise((resolve, reject) =>{
			function request(){
				innerGet().then(device => resolve(device)).catch(error => {
					console.error(error);
					setTimeout(request, 1000)
				})
			}
			request();
		})
	}
	
	function getKeystationStream(){
		let p = new Pipe();
		
		getMidiDevice('Keystation Mini 32')
			.then(device => {
				device.onmidimessage = (message) => {
					p.push({
						type     : message.data[0],
						note     : message.data[1],
						velocity : message.data[2]
					});
				}
			})
		
		return p.watchOnly();
	}
	
	return {
		getKeystationStream : getKeystationStream,
		getMidiDevice       : getMidiDevice
	};
})