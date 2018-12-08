// EntryWindOrgan
const WindOrganInstrument = require('../instrument/WindOrganInstrument.js');
const QuertyMidi = require('../midi/browser/QuertyMidi.js');
const {getAudioContext} = require('../util/AudioContext.js');

function main(){
    let ac = getAudioContext();
    let inst = new WindOrganInstrument(ac.destination, QuertyMidi());
}

window.addEventListener('load', main);