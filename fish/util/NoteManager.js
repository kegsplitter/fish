import { getAudioContext } from './AudioContext.js';
import Clone from './Clone.js';
import Mtof from'./Mtof.js';

export function NoteManager(playF){
  let noteEndHash = {};

  function Push(note){
      note = Clone(note);
      note.hz = Mtof(note.note);
      const isEndNote = note.velocity === 0;

      if(isEndNote){
        const endF = noteEndHash[note.note];
        if(!endF) return;

        endF(note.timestamp);
        delete noteEndHash[note.note];
      } else {
        if(noteEndHash[note.note]) return;
        noteEndHash[note.note] = playF(note);
      }
  }

  function Panic(){
    const ac = getAudioContext();
    for(const key in noteEndHash) {
      noteEndHash[key](ac.currentTime);
    }

    noteEndHash = {};
  }

  return {
      Push,
      Panic
  }
}

  export default NoteManager;
  
