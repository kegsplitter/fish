
function getQuerty(Pipe){
  let state = {};
  let out = new Pipe();
  function changeState(keyCode, bool){
    if(state[keyCode] === bool) return;
    state[keyCode]

    out.push({
      type: '',
      note: keyCode,
      velocity : bool ? 127 : 0
    });
  }
  
  document.body.addEventListener('keydown', (e)=>{
    changeState(e.keyCode, true);
  })

  document.body.addEventListener('keyup', (e)=>{
    changeState(e.keyCode, false);
  })

  return out;
}



define(['Water', 'Block5', 'MidiDevice', 'NoteManager', 'util/Querty'], function(Water, Block5, MidiDevice, NoteManager, Querty){
  
  return function(audioOutput){
    let quertyOut = Querty.map(o => ({
      type: '',
      note: o.key,
      velocity: o.on ? 127 : 0
    }));
    
    let noteManager = new NoteManager((note)=> Block5(audioOutput, note.hz));
    let keyPipe = new Water.Pipe();
    quertyOut.watch(n => keyPipe.push(n));
  	MidiDevice.getKeystationStream()(keyPipe.pushOnly());

    keyPipe.map(noteManager.pushOnly());
    
    keyPipe.map(v => console.log(v));
    // TODO: make destroy
    return ()=> null;
  }
})