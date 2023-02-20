// EntryWindOrgan
const { createBasicButton } = require('../../gui/vanilla/Button');

const WindOrganInstrument = require('../instrument/WindOrganInstrument.js');
const QuertyMidi = require('../midi/browser/QuertyMidi.js');
const {getAudioContext} = require('../util/AudioContext.js');

async function main(){
    await createBasicButton("Setup");
    const ac = getAudioContext();
    const inst = new WindOrganInstrument(ac.destination, QuertyMidi());
}

// window.addEventListener('load', main);
main();