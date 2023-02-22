import { NeoPipe } from "./Pipe";
import Atom from "./Atom";

import getQuertyPipe from '../../fish/midi/browser/QuertyMidi'

export const INPUT_LIST = ["None", "Qwerty", "Midi"]

function Controller(){
    const pipe = NeoPipe();
    const selectAtom = new Atom(INPUT_LIST[1]);
    let unSub = nextSub(selectAtom.Value(), pipe)

    selectAtom.Subscribe(label => {
        unSub();
        unSub = nextSub(label, pipe)
    });

    return {
        controllerPipe: pipe,
        selectAtom
    }
}

function nextSub(label, outPipe){
   const pipe = nextPipe(label);

   return pipe.Connect(data => outPipe.Push(data));
}

function nextPipe(label){
    switch(label) {
        case "Qwerty": return getQuertyPipe();
        case "Midi": 
        case "None":
        default:
            return new NeoPipe();
    }
}

export default Controller;
