

define(["util/Pipe"], function(Pipe){

  let output = new Pipe();
  let state = {};


  function changeState(key, on){
    if(!!state[key] === on) return;
    state[key] = on;

    output.push({
      key: key,
      on: on
    });
  }

  function downKey(e){
    changeState(e.keyCode, true);
  }

  function upKey(e){
    changeState(e.keyCode, false);
  }

  document.body.addEventListener('keydown', downKey);
  document.body.addEventListener('keyup', upKey);

  return output.watchOnly();
});