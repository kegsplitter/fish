class Pipe{
    constructor(f){
        this._watchList = [];
        this._fList = [];

        if(f === undefined){
            // dummy
            this._fList.push((data=>data));
        } else if (!Array.isArray(f)) {
            this._fList.push(f);
        } else {
            this._fList = f.slice();
        }

        this._lastMode = false;
        this._lastData = null;
    }

    child(f){
        let pipe = new Pipe(f);
        pipe.unSubscribe = this.watch(pipe.hardPush());

        return pipe;
    }

    pipe(childPipe){
        this.watch(childPipe.hardPush())
        return childPipe;
    }

    push(data){
        for(let i = 0; i < this._fList.length;i++){
            data = this._fList[i](data);

            if(data === null) return;
        }

        if(this._lastMode) this._lastData = data;

        this._watchList.forEach(f => f(data));

        return this;
    }

    hardPush(){
        return (data)=>this.push(data);
    }

    watch(f){
        this._watchList.push(f);

        if(this._lastMode && this._lastData !== null) f(this._lastData);
        return ()=> this._watchList = this._watchList.filter(ff => ff !== f);
    }
    
    unSubscribe(){

    }

    last(){
        this._lastMode = true;
        return this;
    }
}

module.exports = Pipe;