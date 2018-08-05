define(['Water'],function(Water){

  function randomBank(){
    let l = WAM.DX7.banklist;
    return l[Math.floor(Math.random() * l.length)];
  }

  let audioContext = Water.getAudioContext();
  
  let dx7Class = window.WAM.DX7;

  Promise.all([
    audioContext.audioWorklet.addModule("/static/dx7Wrip/wamsdk/wam-processor.js"),
    dx7Class.importScripts(audioContext)
  ]).then((patches)=>{
    console.log('patches', patches);
    let dx7 = new dx7Class(audioContext);
    console.log(dx7);

    dx7.connect(audioContext.destination);

    dx7.loadBank(randomBank())
      .then(()=>{
        dx7.onMidi([0x90, 45, 127]);
        setTimeout(function(){dx7.onMidi([0x90, 45, 0])}, 500);
      })
    
  })
  // 
  // dx7.init(audioContext);
});