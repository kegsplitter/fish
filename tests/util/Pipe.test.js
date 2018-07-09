describe("Pipe.js", function(){

  function r(f){
    require(['util/Pipe'], f);
  }

  const testWord = 'testyTestyTest';

  it('Should Load via require', function(done){
    r(function(Pipe){
      done();
    })
  });

  it('pipe.watch', function(done){
    r(function(Pipe){

      let p = new Pipe();

      p.watch(s => {
        if(s !== testWord) throw `Bad value ${s}`;
        done();
      });

      p.push(testWord);
    })
  });

  it('core f function', function(done){
    r(function(Pipe){
      let end = 'ENDY'
      let pipe = new Pipe((s) => s + end)

      pipe.watch(s => {
        if(s !== testWord + end){
          throw 'core f not working'
        } else {
          done()
        }
      });

      pipe.push(testWord);
    });
  });

  it("core f filter's nulls", function(done){
    r(function(Pipe){
      let pipe = new Pipe();
      pipe
        .map((s) => s === testWord ? testWord : null)
        .watch(s =>{
          if(s !== testWord) throw 'Not filtering correctly';
          done();
        });

        pipe.push('NOT TEST WORD');
        pipe.push({ one : testWord});
        pipe.push(234234);
        pipe.push(testWord + "junkwefsgat43ref");
        pipe.push(testWord);
    });
  });

  it('pushOnly', function(done){
    r(function(Pipe){
      let pipe = new Pipe();
      pipe.watch(s => {
        if(s !== testWord) throw `bad test word ${s}`;
        done();
      });

      pipe.pushOnly()(testWord);
    });
  });

  it('watchOnly', function(done){
    r(function(Pipe){
      let pipe = new Pipe();
      pipe.watchOnly()(function(s){
        if(s !== testWord) throw `bad test word ${s}`;
        done();
      })

      pipe.push(testWord);
    });
  });

  it('should be in functional chains and with named pipes when head is set', function(done){
    r(function(Pipe){
      let head = new Pipe().Head();

      head
        .map(s => s === testWord ? testWord : null)
        .setName('withTestWord')
        .getHead()
        .map(s => s !== testWord ? s : null)
        .setName('notTestWord')
        .getName('withTestWord')
        .map(s => {
          if(s !== testWord) throw 'Letting non testWord through'
        })
        .name('notTestWord')
        .map(s => {
          if(s === testWord) throw 'Should not be testWord';
        })
        .name('notTestWord')
        .map(s => s === 'done' ? s : null)
        .map(s => done())
        .getHead()
        .push('notTheTestWord-no-no')
        .push(testWord)
        .push('done');
    })
  });

  it('should reject unknown names', function(done){
    r((Pipe)=>{
      try {
        new Pipe().Head().name('noName');
        throw 'noName not caught';
      }catch(e){
        done();
      }
    })
  });

  it('should fail if when setting name when head is not set', function(done){
    const errorMessage = 'Should have failed as no head is set';
    r(Pipe => {
      try {
        new Pipe().setName('HAWK');
        throw errorMessage
      } catch(e) {
        if(e === errorMessage) throw errorMessage;
        done();
      }
    })
  });

  it('Should fail if name is duplicate', function(done){
    const errorMessage = 'Should not create duplicate names';
    r(Pipe => {
      try {
        new Pipe()
          .Head()
          .map()
          .setName(testWord)
          .getHead()
          .map()
          .setName(testWord);

          throw errorMessage
      } catch(e) {
        if(e === errorMessage) throw errorMessage;
        done();
      }
    })
  })

  it('should turn off', function(done){
    r(Pipe => {
        let output = [];

        new Pipe((v)=> output.push(v))
          .push(1)
          .off()
          .push(2)
          .on()
          .push(3);

        if(output.find(v => v === 2)) throw 'passing values when off';
        if(!output.find(v => v === 1) || !output.find(v => v === 3)) throw 'not pasing on values';
        done();
    })
  });

  it('should detach', function(done){
    r(Pipe => {
      new Pipe().Head()
        .map(v => {
          if(v !== testWord) throw 'leaked values';
        })
        .setName('normal')
        .detach('detachedPipe')
        .map((v)=> {
          if(v === testWord) throw 'leaked values in detached'
        })
        .getHead()
        .push(testWord)
        .name('detachedPipe')
        .push('notTestWords');

        done();
    });
  });

  it('block/flush', function(done){
    r(Pipe => {

      let l = [];

      new Pipe().Head()
        .map()
        .setName('input')
        .map((v)=> l.push(v))
        .setName('output')
        .name('input')
        .block()
        .push(0)
        .push(1)
        .name('output')
        .push(2)
        .name('input')
        .flush();

        if(l[0] !== 2 || l[1] !== 0 || l[2] !== 1) throw `block flush error ${l}`;
        done();
    })
  });

  it('asyncMap should make work with Promises', function(done){
    r(Pipe => {
        new Pipe().Head()
          .mapAsync((v) => new Promise(function(resolve, reject){
            setTimeout(()=> resolve(v), 0);
          }))
        .map(v => {
          if(v !== testWord) throw 'test word not passed async';
          done();
        })
        .push(testWord)
    });
  });
})
