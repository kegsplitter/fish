define(['Water', 'EndGain'], function(Water, EndGain){
  return function(audioOut, commandPipe, type){

    let audioContext = Water.getAudioContext();
    let Pipe = Water.Pipe;

    let osc = audioContext.createOscillator();

    let routerPipe = new Pipe();

    let destroyCommand = commandPipe((v) => routerPipe.push(v));
    
    // routerPipe.watch((v) => console.log(v));

    routerPipe
      .map((v) => /frequency/.exec(v.command) ? v : null)
      .watch(v => osc.frequency.linearRampToValueAtTime(v.value, v.time));

    routerPipe
      .map((v) => /detune/.exec(v.command) ? v : null)
      .watch(v => osc.detune.linearRampToValueAtTime(v.value, v.time));

    if(type) osc.type = type;
    osc.start();

    let destroyEndGain = EndGain(audioOut, osc);

    return () => destroyEndGain().then(()=> {
      osc.stop();
      osc.disconnect();
      routerPipe.destroy();
      destroyCommand();
      Pipe = null;
      audioContext = null;
    });
  }
})