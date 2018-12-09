const Pipe = require('./Pipe.js');

class Store{
    constructor(keyList = []){
        let valueHash = {};
        let pipeHash = {};
        this._valueHash = valueHash;
        this._pipeHash = pipeHash;
    }

    watch(name, f){
        if(!this._pipeHash.hasOwnProperty(name)) throw 'UNKNOWN_STORE_KEY';

        return this._pipeHash[name].watch(f);
    }

    value(name){
        return this._valueHash[name];
    }

    push(name, value){
        if(!this._valueHash.hasOwnProperty(name)) throw '';

        this._valueHash[name] = value;
        this._pipeHash[name].push(value);
    }

    add(name, initValue){
        this._valueHash[name] = initValue;
        this._pipeHash[name] = new Pipe().last();
        this._pipeHash[name].push(initValue);

        return this;
    }
    remove(){}
}

module.exports = Store;