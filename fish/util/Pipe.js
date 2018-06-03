
define(function(){
	
	function Pipe(f, headPipe){
		
		this.f = f ? f : (v)=>v;
		if(headPipe) this.headPipe = headPipe;
		
		this.watchHash = {};
		this.watchCount = 0;

		this.childPipeList = [];
		this.isHead = false;
	}
	
	Pipe.prototype.Head = function(){

		if(this.headPipe) throw 'Pipe already has head';

		this.isHead = true;
		this.namePipeList = [];

		return this;
	}

	Pipe.prototype.push = function(v){
		
		v = this.f(v);
		if(v === null) return;
		Object.keys(this.watchHash).map(key => this.watchHash[key]).map(f => f(v));
		this.childPipeList.map(pipe => pipe.push(v));

		return this;
	};

	Pipe.prototype.pushOnly = function(){
		return (v)=> this.push(v);
	}
	
	Pipe.prototype.watch = function(f){
		
		let id = this.watchCount++;
		this.watchHash[id] = f;
		
		return () => delete this.watchHash[id];
	}

	Pipe.prototype.map = function(f){
		let pipe = new Pipe(f, this.isHead ? this : this.headPipe);
		this.childPipeList.push(pipe);
		return pipe;
	}

	// pass a context set versio of the watch function
	Pipe.prototype.watchOnly = function(){
		return (f) => this.watch(f);
	}

	Pipe.prototype.destroy = function(){
		this.f = null;
		this.watchHash = null;
		this.watchCount = null;
		this.childPipeList.forEach(pipe => pipe.destroy());
		this.childPipeList = null;
	}

	Pipe.prototype.getHead = function(){
		let head = this.isHead ? this : this.headPipe;

		if(!head) throw 'absent head';

		return head;
	}

	Pipe.prototype.setName = function(name){
		let head = this.getHead();

		// check that name is not already taken
		if(head.namePipeList.find(pipe => pipe.name === name)) throw 'name already taken';

		this.name = name;
		if(!head.namePipeList.find(pipe => pipe === this)) head.namePipeList.push(this);

		return this;
	}
	
	Pipe.prototype.getName = function(name){
    let pipe = this.getHead().namePipeList.find(pipe => pipe.name === name);
    if(!pipe) throw `Unknown name ${name}`;
    return pipe;
	}

	Pipe.prototype.name = function(name){
		return this.getName(name);
	}

	return Pipe;
});