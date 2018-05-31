define(["LoadAudioWorklets"], function(LoadAudioWorklets){
  console.log('LoadAudioWorklets', LoadAudioWorklets)
  LoadAudioWorklets().then(()=> {
    console.log('LOADED');
    require(['fish/main.js'], function(){});
  });
});
