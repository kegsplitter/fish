// wind Organ
import NoteManager from '../util/NoteManager.js';
import { getAudioContext } from '../util/AudioContext.js';
import WindOrganVoice from './windOrgan/WindOrganVoice.js';
import { createWhiteNoiseBuffer } from '../wavetable/WaveTableBufferFactory.js';

export class WindOrganInstrument{
    constructor(outputAudioNode, midiInputPipe){

        let localOutput = getAudioContext().createGain();
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

    panic(){
        this._noteManager.panic();
    }
}
