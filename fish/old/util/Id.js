define([], function(){

  let idCount = 0;
  const lookFor = '{{random}}';

  function getId(){
    return idCount++;
  }

  function renderId(idString){
    return idString.indexOf(lookFor) > -1 ? idString.replace(lookFor, getId()) : idString;
  }

  return {
    getId    : getId,
    renderId : renderId
  };
});