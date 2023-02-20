import Clone from './Clone.js';
import Mtof from'./Mtof.js';

class NoteManager{
    // create function needs to be something that takes midi and audio node and outputs
    // a stop function
    constructor(createFunction, midiInput){
      this.destroyHash = {};
      this.createFunction = createFunction;

      if(midiInput) this._unWatchMidiInput = midiInput.watch(note => this.push(note));
    }

    push(noteObject){
      noteObject = Clone(noteObject);
      // find hz (for free)
      if(noteObject.note) noteObject.hz = Mtof(noteObject.note);

      // if this is velocity 0 then destroy
      if(noteObject.velocity === 0) {
        this.destroyNote(noteObject.note);
      } else {
        // if this note is being played then destroy the old
        this.destroyNote(noteObject.note, noteObject.timeStamp);
        this.destroyHash[noteObject.note] = this.createFunction(noteObject);
      }
      
    }

    destroyNote(note, timeStamp){
      if(this.destroyHash[note]){
        this.destroyHash[note](timeStamp);
        delete this.destroyHash[note];
      }
    }

    pushOnly(){
      return (noteObject)=>this.push(noteObject);
    }

    panic(){
      Object.keys(this.destroyHash)
        .forEach(key => this.destroyNote(key));
    }

    destroy(){
      this.panic();
      this.destroyHash = null;
      this.createFunction = null;
      if(this._unWatchMidiInput) this._unWatchMidiInput();
    }
  }

  export default NoteManager;