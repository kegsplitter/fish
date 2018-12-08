define(['SigPlay', 'PwmOscillator'], function(SigPlay, PwmOscillator){
  return () => Promise.all([
    SigPlay.setup(),
    PwmOscillator.setup()
  ]);
});
