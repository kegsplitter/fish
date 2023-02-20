class Pipe {
  constructor(f) {
    this._watchList = [];
    this._fList = [];

    if (f === undefined) {
      // dummy
      this._fList.push(data => data);
    } else if (!Array.isArray(f)) {
      this._fList.push(f);
    } else {
      this._fList = f.slice();
    }
  }

  pipe(f) {
    let pipe = new Pipe(f);
    pipe.unSubscribe = this.watch(pipe.hardPush());

    return pipe;
  }

  push(data) {
    for (let i = 0; i < this._fList.length; i++) {
      data = this._fList[i](data);

      if (data === null) return;
    }

    this._watchList.forEach(f => f(data));
  }

  hardPush() {
    return data => this.push(data);
  }

  watch(f) {
    this._watchList.push(f);

    return () => (this._watchList = this._watchList.filter(ff => ff !== f));
  }

  unSubscribe() {}
}

export default Pipe;
