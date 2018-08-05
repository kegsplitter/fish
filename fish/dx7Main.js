define([],function(){

  function randomBank(){
    let l = WAM.DX7.banklist;
    return l[Math.floor(Math.random() * l.length)];
  }

  function randomPatch(wam){
    let num = Math.floor(Math.random() * wam.patches.length);
    return wam.bank[num];
  }

  // load a random patchj
  async function createRandomDx7(audioContext){
    let dx7 = new WAM.DX7(audioContext);
    await dx7.loadBank(randomBank());
    dx7.setPatch(randomPatch(dx7));

    return dx7;
  }

  function playNote(dx7){
    
    let startTime = Math.random() * 1500;
    let duration = Math.random() * 1000;

    let note = Math.floor(Math.random() * 50) + 20;

    setTimeout(()=>{
      dx7.onMidi([0x90, note, 127]);
    }, startTime);
    
    setTimeout(()=>{
      dx7.onMidi([0x90, note, 0])
      playNote(dx7);
    }, startTime + duration);
  }

  let audioContext = new AudioContext();
  
  let dx7Class = window.WAM.DX7;

  Promise.all([
    audioContext.audioWorklet.addModule("/static/dx7Wrip/wamsdk/wam-processor.js"),
    dx7Class.importScripts(audioContext)
  ]).then(async ()=> {

    let list = new Array(5).fill(null).map(()=> createRandomDx7(audioContext));
    list = await Promise.all(list);

    list.forEach(n => {
      let gain = audioContext.createGain();
      gain.gain.value = 0.5;

      n.connect(gain);
      gain.connect(audioContext.destination);

      playNote(n);
    });
  })
});