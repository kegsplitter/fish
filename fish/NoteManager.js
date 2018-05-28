define(['Water'], function(Water){
  class NoteManager{

    constructor(createFunction){
      this.destroyHash = {};
      this.createFunction = createFunction;
    }

    push(noteObject){
      noteObject = Water.Clone(noteObject);
      // find hz (for free)
      if(noteObject.note) noteObject.hz = Water.Mtof(noteObject.note);

      // if this is velocity 0 then destroy
      if(noteObject.velocity === 0) {
        this.destroyNote(noteObject.note);
      } else {
        // if this note is being played then destroy the old
        this.destroyNote(noteObject.note);
        this.destroyHash[noteObject.note] = this.createFunction(noteObject);
      }
      
    }

    destroyNote(note){
      if(this.destroyHash[note]){
        this.destroyHash[note]();
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
    }
  }

  return NoteManager;
});