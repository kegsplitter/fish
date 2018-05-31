
define(['Water', 'Block5', 'MidiDevice', 'NoteManager'], function(Water, Block5, MidiDevice, NoteManager){
	
  let audioContext = Water.getAudioContext();
  let noteManager = new NoteManager((note)=> Block5(audioContext.destination, note.hz));
  let keyPipe = new Water.Pipe();
  MidiDevice.getKeystationStream()(keyPipe.pushOnly());

  keyPipe.map(noteManager.pushOnly());
  // Block5(audioContext.destination, 440);
  
})