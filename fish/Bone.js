define(['Water'], function(Water){

    function renderBone(startTime, duration, boneList){
      return boneList
        .map(bone => Water.Clone(bone))
        .map(bone => { return bone.targetTime = (bone.fraction * duration) + startTime, bone});
    }

    function createBone(id, num, dom){
      return {
        id: id,
        num: num,
        dom: dom,
        fraction: num / dom
      }
    }

    return {
      renderBone: renderBone,
      createBone: createBone
    };
});
