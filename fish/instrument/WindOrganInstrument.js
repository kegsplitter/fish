// wind Organ
const NoteManager = require('../util/NoteManager.js');
const audioContext = require('../util/AudioContext.js').getAudioContext();
const WindOrganVoice = require('./windOrgan/WindOrganVoice.js');
// const {createPla} = require('../wavetable/WaveTablePlayers.js');
const {createWhiteNoiseBuffer} = require('../wavetable/WaveTableBufferFactory.js');
class WindOrganInstrument{
    constructor(outputAudioNode, midiInputPipe){

        let localOutput = audioContext.createGain();
        localOutput.connect(outputAudioNode);

        this._output = localOutput;

        let noteManager = new NoteManager((midiNote)=> WindOrganVoice(this._output, this._whiteNoiseBuffer, midiNote.timeStamp, midiNote.hz), midiInputPipe);

        this._noteManager = noteManager;

        this._whiteNoiseBuffer = createWhiteNoiseBuffer(10);
    }

    destroy(){
        this._output.disconnect();
        this._output = null;
        this._noteManager.destroy();
    }
}

module.exports = WindOrganInstrument;