define(['Water', 'sequencer/Bone'], function(Water, Bone){
  return function(outputPipe, pulseInputPipe, commandInputPipe){
    
    let boneList = [];

    let destroyPulseInput = pulseInputPipe
      .watch( pulseObject => boneList
        .map(bone => Object.assign({}, bone))
        .map(bone => Bone.renderBone(pulseObject.targetTime, pulseObject.duration, bone))
        .forEach(bone => outputPipe.push(bone))
      );

    let commandRouter = new Water.Pipe();

    let destroyCommandInput = commandInputPipe.watch(commandRouter.pushOnly());
    
    commandRouter
      .map(o => o.command === 'add' ? o : null)
      .watch(o => boneList = boneList.concat([o.value]));
    
    commandRouter
      .map(o => o.command === 'clear' ? o : null)
      .watch(o => boneList = []);

    return () => {
      destroyPulseInput();
      destroyCommandInput();
      commandRouter.destroy();
    }
  }
})