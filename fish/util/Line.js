define(['util/Pipe'], function(Pipe){
  class Line {
    constructor() {
      this.up = new Pipe();
      this.down = new Pipe();
    }

    connect(line){

      this.down.map(line.down.pushOnly());
      line.up.map(this.up.pushOnly());

      return line;
    }

    destroy() {
      this.up.destroy();
      this.down.destroy();

      this.up = null;
      this.down = null;
    }
  }

  return Line;
})