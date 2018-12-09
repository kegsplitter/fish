const {getAudioContext, isOffline} = require('../util/AudioContext.js');
const NoteManager = require('../util/NoteManager.js');
const Store = require('../util/Store.js');
const {mapRange} = require('../midi/MidiHelper.js');

const ramp = 0.1;

function fmVoice(audioOutputNode,startTime, hz, store){

    let audioContext = getAudioContext();
    let osc = audioContext.createOscillator();
    let volume = audioContext.createGain();

    volume.gain.value = 0;

    osc.frequency.value = hz;
    osc.start(startTime);
    osc.connect(volume);

    let mod1_osc = audioContext.createOscillator(); mod1_osc.start(startTime);
    let mod1_vol = audioContext.createGain();

    mod1_osc.connect(mod1_vol);
    mod1_vol.connect(osc.detune)

    let mod2_osc = audioContext.createOscillator(); mod2_osc.start(startTime);
    let mod2_vol = audioContext.createGain();

    mod2_osc.connect(mod2_vol);
    mod2_vol.connect(mod1_osc.detune);

    let unSubscribeList = [
        store.watch('mod1_hz', i => mod1_osc.frequency.linearRampToValueAtTime(i * hz, audioContext.currentTime + ramp)),
        store.watch('mod1_vol', v => mod1_vol.gain.linearRampToValueAtTime(v, audioContext.currentTime + ramp)),
        store.watch('mod2_hz', i => mod2_osc.frequency.linearRampToValueAtTime(i * hz, audioContext.currentTime + ramp)), // WILL NEED TO BE VALUE FROM MOD1 RATHER THEN HZ
        store.watch('mod2_vol', v => mod2_vol.gain.linearRampToValueAtTime(v, audioContext.currentTime + ramp))
    ]

    volume.connect(audioOutputNode);
    volume.gain.linearRampToValueAtTime(0, startTime);
    volume.gain.linearRampToValueAtTime(1, startTime + ramp)

    return (endTime) => {
        volume.gain.cancelScheduledValues(endTime);
        volume.gain.linearRampToValueAtTime(0, endTime + ramp);
        osc.stop(endTime + ramp);
        mod1_osc.stop(endTime + ramp);
        mod2_osc.stop(endTime + ramp);

        unSubscribeList.forEach(f => f());
        if(!isOffline()){
            osc.onended = ()=> {
                volume.disconnect();
                mod1_vol.disconnect();
                mod2_vol.disconnect();
            }
        }
    }
}

function filterNote(type, noteNumber){
    return (note)=> note.type = type && note.note === noteNumber ? note : null;
}

class FmInstrument {
    constructor(audioOutputNode, midiInputPipe){
        
        let audioContext = getAudioContext();
        let volume = audioContext.createGain();
        volume.gain.value = 0.1;

        volume.connect(audioOutputNode);

        let store = new Store()
            .add('mod1_hz', 0.5)
            .add('mod1_vol', 50)
            .add('mod2_hz', 0.5)
            .add('mod2_vol', 50);
    
        let paramPipe = midiInputPipe.child((note)=> note.channel === 1 ? note : null);
        
        // 176 / 1 / 0 - 127
        // paramPipe.watch(d => console.log('paramStream', d))

        paramPipe.child([
            filterNote(176, 1),
            note => mapRange(note.velocity, 0, 2),
            value => store.push('mod1_hz', value)
        ]);

        paramPipe.child([
            filterNote(176, 2),
            note => mapRange(note.velocity, 0, 1000),
            value => store.push('mod1_vol', value)
        ]);

        paramPipe.child([
            filterNote(176,3),
            note => mapRange(note.velocity, 0, 2),
            value => store.push('mod2_hz', value)
        ]);

        paramPipe.child([
            filterNote(176, 4),
            note => mapRange(note.velocity, 0, 1000),
            value =>  store.push('mod2_vol', value)
        ])

        // store.watch('mod1_hz', d => console.log(d))
        store.watch('mod1_vol', v => console.log(v))

        let noteManager = new NoteManager(
            (note)=> fmVoice(volume, note.timeStamp, note.hz, store),
            midiInputPipe.child(note => note.channel === 0 && note.type === 144 ? note : null)
        );
    }
}

module.exports = FmInstrument;