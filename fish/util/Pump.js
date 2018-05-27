define([], function(){
  class Pump{
    constructor(){
      this.pullHash = {};
      this.nextRegisterId = 0;

    }

    source(v){
      Object.keys(this.pullHash)
        .map(key => this.pullHash[key])
        .forEach(pullObject => {
          pullObject.buffer.push(v)
          this.processPullObject(pullObject);
        });
    }

    register(){
      let id = this.nextRegisterId++;

      let pullObject = {
        buffer: [],
        resolve: null,
        reject: null
      };

      this.pullHash[id] = pullObject;

      return {
        pull : () => new Promise((resolve, reject)=>{
          if(pullObject.resolve) return reject('Already pulling');
          pullObject.resolve = resolve;
          pullObject.reject = reject;

          this.processPullObject(pullObject);
        }),
        destroy : ()=>{
          this.destroyPump(id);
          id = null;
          pullObject = null;
        }
      }
    }

    processPullObject(pullObject){
      
      if(!pullObject.resolve || pullObject.buffer.length === 0) return;
      pullObject.resolve(pullObject.buffer.shift());

      pullObject.resolve = null;
      pullObject.reject = null;
    }

    destroyPump(id){
      let pullObject = this.pullHash[id];
      delete this.pullHash[id];
      pullObject.buffer = null;
      if(pullObject.reject) pullObject.reject('destroying pump');
      pullObject.reject = null;
      pullObject.reseolve = null;
    }
  }

  return Pump;
})