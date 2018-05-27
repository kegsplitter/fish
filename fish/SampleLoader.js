define(['Water'], function(Water){
  function getArrayBuffer(file){
  
    return new Promise((resolve, reject) =>{
      let fileReader = new FileReader();
  
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
  
      fileReader.readAsArrayBuffer(file);
    });
  }
  
  function decodeFile(file){
    return getArrayBuffer(file).then(arrayBuffer => Water.getAudioContext().decodeAudioData(arrayBuffer));
  }
  
  function buildSampleObject(name, buffer){
    return {
      name: name,
      buffer: buffer
    }
  }

  function loadSample(url, sampleName){
    return fetch(url)
      .then(response => response.blob())
      .then(blob => decodeFile(blob))
      .then(buffer => buildSampleObject(sampleName, buffer))
  }

  function loadSampleList(list) {
    list = list.map(l => loadSample(l[0], l[1]));

    return Promise.all(list);
  }

  return {
    loadSample     : loadSample,
    loadSampleList : loadSampleList
  }
});