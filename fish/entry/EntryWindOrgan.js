// EntryWindOrgan
import { createBasicButton } from '../../gui/vanilla/Button';

import { WindOrganInstrument} from '../instrument/WindOrganInstrument.js';
import { getAudioContext }  from '../util/AudioContext.js';

import WindOrganGui from '../../gui/vanilla/WindOrganGui';

import Controller from '../util/Controller';

async function main(){
    await createBasicButton("Setup");
    const ac = getAudioContext();

    const { controllerPipe, selectAtom } = Controller();
    const inst = new WindOrganInstrument(ac.destination, controllerPipe);

    const windOrganComponent = WindOrganGui();

    document.body.innerHTML = windOrganComponent.next().value;
    windOrganComponent.next();
}

main();