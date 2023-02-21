// EntryWindOrgan
import { createBasicButton } from '../../gui/vanilla/Button';

import { WindOrganInstrument} from '../instrument/WindOrganInstrument.js';
import { getAudioContext }  from '../util/AudioContext.js';

import WindOrganGui from '../../gui/vanilla/WindOrganGui';

import Controller from '../util/Controller';
import Atom from '../util/Atom';
import { NeoPipe } from '../util/Pipe';

async function main(){
    await createBasicButton("Setup");
    const ac = getAudioContext();

    const { controllerPipe, selectAtom } = Controller();

    const state = {
        attack: new Atom(0),
        release: new Atom(0),
        selectedInput: selectAtom,
        panic: new NeoPipe()
    };

    const inst = new WindOrganInstrument(ac.destination, controllerPipe);

    state.panic.Connect(() => {
        inst.panic();
    })

    const windOrganComponent = WindOrganGui(state);

    document.body.innerHTML = windOrganComponent.next().value;
    windOrganComponent.next();
}

main();