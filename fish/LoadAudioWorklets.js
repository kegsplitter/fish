define(['SigPlay'], function(SigPlay){
  return () => Promise.all([
    SigPlay.setup()
  ]);
});
