const Pipe = require('../../util/Pipe.js');
const {getAudioContext} = require('../../util/AudioContext.js');

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

function availableMidiDevices(){
    return getMidiAccess()
        .then(access => {

            let list = [];
            access.inputs.forEach(input => list.push(input.name));

            return list;
        })
}

function createInstrumentStream(name, channel){
    let output = new Pipe();

    getMidiDevice(name)
        .then(device => {
            device.onmidimessage = (message)=>{
                output.push({
                    type: message.data[0],
                    note: message.data[1],
                    velocity: message.data[2],
                    timeStamp: getAudioContext().currentTime,
                    channel: channel
                })
            }
        })

    return output;
}

function getKeystationStream(channel){
    return createInstrumentStream('Keystation Mini 32', channel)
}

function getLpd8Stream(channel){
    return createInstrumentStream('LPD8', channel);
}

module.exports = {
    getKeystationStream: getKeystationStream,
    availableMidiDevices: availableMidiDevices,
    getLpd8Stream: getLpd8Stream
}