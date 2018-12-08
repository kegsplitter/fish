define([], function(){

  let audioContext = new AudioContext();

  return ()=> audioContext;
})