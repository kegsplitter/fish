define([], function(){
  return function * (startTime, duration){
    let currentTime = startTime;
    while(true) {
      yield currentTime;
      currentTime += duration;
    }
  }
});
