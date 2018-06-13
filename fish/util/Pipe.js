
define(function(){
	class Pipe{
	  constructor(f, headPipe){
		  this._f = f ? f : (v)=>v;
		  if(headPipe) this._headPipe = headPipe;
			this._watchList = []
		  this._childPipeList = [];
		  this._isHead = false;
			this._gate = true;
	  }

    Head(){
      if(this._headPipe) throw 'Pipe already has head';
      this._isHead = true;
      this.namePipeList = [];
      return this;
    }

    push(v){
			if(!this._gate) return this;

			if(this.blockValueList) {
				this.blockValueList.push(v);
				return this;
			}

			if(this._async){
				Promise.resolve(v)
					.then(v => this._f(v))
					.then(v => {
						if(v === null) return;
						this._watchList.forEach(f => f(v))
			      this._childPipeList.map(pipe => pipe.push(v));
					})
			} else {
				v = this._f(v);
	      if(v === null) return this;
				this._watchList.forEach(f => f(v));
	      this._childPipeList.map(pipe => pipe.push(v));
			}

      return this;
    };

    pushOnly(){
      return (v)=> this.push(v);
    }

    watch(f){
			this._watchList.push(f)
      return () => this._watchList = this._watchList.map(func => func !== f)
    }

    map(f){
      let pipe = new Pipe(f, this._isHead ? this : this._headPipe);
      this._childPipeList.push(pipe);
      return pipe;
    }

		mapAsync(f){
			let pipe = this.map(f);
			pipe._async = true;

			return pipe;
		}

    // pass a context set version of the watch function
    watchOnly(){
      return (f) => this.watch(f);
    }

    destroy(){
      this._f = null;
			this._watchList = null;
      this._childPipeList.forEach(pipe => pipe.destroy());
      this._childPipeList = null;
    }

    getHead(){
      let head = this._isHead ? this : this._headPipe;

      if(!head) throw 'absent head';

      return head;
    }

    setName(name){
      let head = this.getHead();

      // check that name is not already taken
      if(head.namePipeList.find(pipe => pipe._name === name)) throw 'name already taken';

      this._name = name;
      if(!head.namePipeList.find(pipe => pipe === this)) head.namePipeList.push(this);

      return this;
    }

    getName(name){
      let pipe = this.getHead().namePipeList.find(pipe => pipe._name === name);
      if(!pipe) throw `Unknown name ${name}`;
      return pipe;
    }

    name(name){
      return this.getName(name);
    }

		getNameOnly(){
			return (name) => this.getName(name);
		}

		on(){
			this._gate = true;
			return this;
		}

		off(){
			this._gate = false;
			return this;
		}

		detach(name) {
			if(!name) throw 'name detached pipe';

			return this.getHead().map().off().map().setName(name);
		}

		block(){
			this.blockValueList = [];
			return this;
		}

		flush(){
			if(!this.blockValueList) return;

			let blockValueList = this.blockValueList;
			this.blockValueList = null;
			blockValueList.forEach(v => this.push(v));

			return this;
		}
  }

	return Pipe;
});
