define(['Water', 'pulse/BarStartGenerator'], function(Water, BarStartGenerator){
  return function(outPipe, startTime, duration){

    let gen = BarStartGenerator(startTime, duration);
    let gate = true;

    function push(targetTime){

      if(!gate) return;

      outPipe.push({
        targetTime : targetTime,
        duration   : duration
      });

      targetTime = gen.next().value;

      setTimeout(
        push.bind(undefined, targetTime),
      ((targetTime - Water.getAudioContext().currentTime) * 1000) - 50
      )
    }

    push(gen.next().value);

    return ()=>{
      gate = null;
      gen.return();
    }
  }
})
