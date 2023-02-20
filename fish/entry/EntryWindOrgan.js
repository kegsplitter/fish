// EntryWindOrgan
import { createBasicButton } from '../../gui/vanilla/Button';

import { WindOrganInstrument} from '../instrument/WindOrganInstrument.js';
import QuertyMidi from '../midi/browser/QuertyMidi.js';
import { getAudioContext }  from '../util/AudioContext.js';

async function main(){
    await createBasicButton("Setup");
    const ac = getAudioContext();
    const inst = new WindOrganInstrument(ac.destination, QuertyMidi());
}

main();