// fm test
const {getAudioContext} = require('../util/AudioContext.js');
const WebMidi = require('../midi/browser/WebMidi.js');
const FmInstrument = require('../instrument/FmInstrument.js');

function main(){
    let stream = WebMidi.getKeystationStream(0)
        .pipe(WebMidi.getLpd8Stream(1));
    
    // stream.watch(d => console.log(d))
    let audioContext = getAudioContext();
    
    let instr = new FmInstrument(audioContext.destination, stream);
}

window.addEventListener('load', main);