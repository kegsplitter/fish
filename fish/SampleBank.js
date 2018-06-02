define(['util/Pipe'], function(Pipe){
  return function(outputPipe, inputPipe, commandPipe){

    let sampleList = [];

    let routerPipe = new Pipe();

    let destroyInputWatch = inputPipe.watch(boneCaravan => {

      let sample = sampleList.find(s => s.id === boneCaravan.id);
      let buffer = sample ? sample.buffer : null;
      
      boneCaravan.buffer = buffer;

      outputPipe.push(boneCaravan);
    });

    let destroyCommandPipeWatch = commandPipe.watch(routerPipe.pushOnly());

    routerPipe
      .map(command => command.command === 'add' ? command : null)
      .watch(command => sampleList = sampleList.concat([command.value]));

    routerPipe
      .map(command => command.command === 'clear' ? command : null)
      .watch(command => sampleList = []);

    return () => {
      routerPipe.destroy();
      destroyInputWatch();
      destroyCommandPipeWatch();
    }
  }
})