define(function(){
	
	function Pipe(f){
		
		this.f = f ? f : (v)=>v;
		this.watchHash = {};
		this.watchCount = 0;

		this.childPipeList = [];
	}
	
	Pipe.prototype.push = function(v){
		
		v = this.f(v);
		if(v === null) return;
		Object.keys(this.watchHash).map(key => this.watchHash[key]).map(f => f(v));
		this.childPipeList.map(pipe => pipe.push(v));
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
		let pipe = new Pipe(f);
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
	
	return Pipe;
});