import { NeoPipe } from "./Pipe";
import Atom from "./Atom";

import getQuertyPipe from '../../fish/midi/browser/QuertyMidi'

export const INPUT_LIST = ["None", "Qwerty", "Midi"]

function Controller(){
    const pipe = NeoPipe();
    const selectAtom = new Atom(INPUT_LIST[1]);
    let unSub = nextSub(selectAtom.Value());

    selectAtom.Subscribe(label => {
        unSub();
        unSub = newSub(label);
    });

    return {
        controllerPipe: pipe,
        selectAtom
    }
}

function nextSub(label){
    switch(label) {
        
        case "Querty": return getQuertyPipe();
        case "Midi": 
        case "None":
        default:
            return () => {};
    }
}

export default Controller;