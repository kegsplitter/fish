define([], function(){
  return function(command, value) {
    return {
      command: command,
      value: value
    }
  }
})