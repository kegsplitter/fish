import Pipe from './Pipe';

function Atom(initValue){
    let value = initValue;

    const watcher = new Pipe();

    function Update(_value){
        value = _value;
        watcher.push(value);
    }

    return {
        Value: () => value,
        Update,
        Subscribe: (f) => watcher.watch(f)
    }
}

export default Atom;
