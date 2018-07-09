define(['Water', 'Block5', 'MidiDevice', 'NoteManager'], function(Water, Block5, MidiDevice, NoteManager){
  
  return function(audioOutput){
    let noteManager = new NoteManager((note)=> Block5(audioOutput, note.hz));
  	let keyPipe = new Water.Pipe();
  	MidiDevice.getKeystationStream()(keyPipe.pushOnly());

    keyPipe.map(noteManager.pushOnly());
    
    // TODO: make destroy
    return ()=> null;
  }
})