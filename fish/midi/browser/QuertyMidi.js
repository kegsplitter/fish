// Querty
import Pipe from '../../util/Pipe.js';
import { getAudioContext } from '../../util/AudioContext.js';

// TODO: standardise midi
// remove object wrapper - get used to midi data array (type, note, velocity)
let outputPipe = null;

function setup(){
    const audioContext = getAudioContext();

    outputPipe = new Pipe();
    let stateHash = {};

    function changeState(keyCode, state){

        // if state has not changed then ignore
        if(stateHash[keyCode] === state) return;

        stateHash[keyCode] = state;
        outputPipe.push({
            timeStamp: audioContext.currentTime,
            type: '',
            note: keyCode,
            velocity: state ? 127 : 0
        })
    }

    document.body.addEventListener('keydown', (e)=>{
        changeState(e.keyCode, true);
    })

    document.body.addEventListener('keyup', (e)=>{
        changeState(e.keyCode, false);
    })

    return outputPipe;
}

function getQuertyPipe(){
    return outputPipe ? outputPipe : setup();
}

export default getQuertyPipe;