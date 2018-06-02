define(["LoadAudioWorklets"], function(LoadAudioWorklets){
  
  LoadAudioWorklets().then(()=> {
    console.log('LOADED');
    require(['fish/main.js'], function(){});
  });
});
