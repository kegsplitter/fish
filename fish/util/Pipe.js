
define(function(){
	class Pipe{
	  constructor(f, headPipe){
		
		  this.f = f ? f : (v)=>v;
		  if(headPipe) this.headPipe = headPipe;
		
		  this.watchHash = {};
		  this.watchCount = 0;

		  this.childPipeList = [];
		  this.isHead = false;
	  }
    
    Head(){

      if(this.headPipe) throw 'Pipe already has head';

      this.isHead = true;
      this.namePipeList = [];

      return this;
    }

    push(v){
      
      v = this.f(v);
      if(v === null) return;
      Object.keys(this.watchHash).map(key => this.watchHash[key]).map(f => f(v));
      this.childPipeList.map(pipe => pipe.push(v));

      return this;
    };

    pushOnly(){
      return (v)=> this.push(v);
    }
    
    watch(f){
      
      let id = this.watchCount++;
      this.watchHash[id] = f;
      
      return () => delete this.watchHash[id];
    }

    map(f){
      let pipe = new Pipe(f, this.isHead ? this : this.headPipe);
      this.childPipeList.push(pipe);
      return pipe;
    }

    // pass a context set versio of the watch function
    watchOnly(){
      return (f) => this.watch(f);
    }

    destroy(){
      this.f = null;
      this.watchHash = null;
      this.watchCount = null;
      this.childPipeList.forEach(pipe => pipe.destroy());
      this.childPipeList = null;
    }

    getHead(){
      let head = this.isHead ? this : this.headPipe;

      if(!head) throw 'absent head';

      return head;
    }

    setName(name){
      let head = this.getHead();

      // check that name is not already taken
      if(head.namePipeList.find(pipe => pipe.name === name)) throw 'name already taken';

      this.name = name;
      if(!head.namePipeList.find(pipe => pipe === this)) head.namePipeList.push(this);

      return this;
    }
    
    getName(name){
      let pipe = this.getHead().namePipeList.find(pipe => pipe.name === name);
      if(!pipe) throw `Unknown name ${name}`;
      return pipe;
    }

    name(name){
      return this.getName(name);
    }
  }
  
	return Pipe;
});