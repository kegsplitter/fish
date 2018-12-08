define([], function(){

    function renderBone(startTime, duration, bone){
      return bone.targetTime = (bone.fraction * duration) + startTime, bone;
    }

    function createBone(id, num, dom){
      return {
        id: id,
        num: num,
        dom: dom,
        fraction: num / dom
      }
    }

    function processHandList(handList) {
      return handList.map(h => createBone(h[0], h[1], h[2]))
    }

    return {
      renderBone      : renderBone,
      createBone      : createBone,
      processHandList : processHandList
    };
});
