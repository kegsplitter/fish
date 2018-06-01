define(['Water'], function(Water){

  class Patcher{
    constructor(){
      this.patchHash = {};
      this.nodeHash = {};
      this.pipeHash = {};
    }

    getPatch(id){
      if(!this.patchHash.hasOwnProperty(id)) this.patchHash[id] = Watcher.getAudioContext().createGain();
      return this.patchHash[id];
    }

    setNode(name, node){
      this.nodeHash[name] = node;
      return node;
    }

    getNode(name){
      return this.nodeHash[name];
    }

    getPipe(name){
      if(!this.pipeHash.hasOwnProperty(name)) this.pipeHash[name] = new Water.Pipe();
      return this.pipeHash[name];
    }

    destroy(){
      this.hashPatch = Object.keys(this.hashPatch)
        .map(key => this.hashPatch[key])
        .map(gain => gain.disconnect())
        .map(g => null);
      this.hashPatch = null;

      this.nodeHash = Object.keys(this.nodeHash)
        .map(key => this.nodeHash[key])
        .map(node => {
          if(node.stop) node.stoP();
          node.disconnect()
          return null;
        })
      this.nodeHash = null;

      this.pipeHash = Object.keys(this.pipeHash)
        .map(key => this.pipeHash[key])
        .map(pipe => pipe.destroy())
        .fill(null);
      this.pipeHash = null;
    }
  }

  return Patcher;
});
