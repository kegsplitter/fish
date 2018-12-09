const {getAudioContext, isOffline} = require('../util/AudioContext.js');
const NoteManager = require('../util/NoteManager.js');
const ramp = 0.1;

function fmVoice(audioOutputNode,startTime, hz){

    let audioContext = getAudioContext();
    let osc = audioContext.createOscillator();
    let volume = audioContext.createGain();

    volume.gain.value = 0;

    osc.frequency.value = hz;
    osc.start(startTime);
    osc.connect(volume);

    volume.connect(audioOutputNode);
    volume.gain.linearRampToValueAtTime(0, startTime);
    volume.gain.linearRampToValueAtTime(1, startTime + ramp)

    return (endTime) => {
        volume.gain.cancelScheduledValues(endTime);
        volume.gain.linearRampToValueAtTime(0, endTime + ramp);
        osc.stop(endTime + ramp);

        if(!isOffline()){
            osc.onended = ()=> {
                volume.disconnect();
            }
        }
    }
}


class FmInstrument {
    constructor(audioOutputNode, midiInputPipe){
        
        let audioContext = getAudioContext();
        let volume = audioContext.createGain();
        volume.gain.value = 0.1;

        volume.connect(audioOutputNode);
        
        let noteManager = new NoteManager(
            (note)=> fmVoice(volume, note.timeStamp, note.hz),
            midiInputPipe.child(note => note.channel === 0 && note.type === 144 ? note : null)
        );
    }
}

module.exports = FmInstrument;