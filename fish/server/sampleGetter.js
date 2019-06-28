// sampleGetter
const { getAudioContext } = require("../util/AudioContext.js");
const port = 8765;

const getArrayBuffer = blob => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(fileReader.error);

    fileReader.readAsArrayBuffer(blob);
  });
};

const decodeBuffer = arrayBuffer =>
  getAudioContext().decodeAudioData(arrayBuffer);

const buildAudioBuffer = blob => getArrayBuffer(blob).then(decodeBuffer);

const getSampleWithI = (i, name) =>
  Promise.all([
    getDetailsWithI(i),
    fetch(`http://localhost:${port}/i/${i}`)
      .then(response => response.blob())
      .then(buildAudioBuffer)
  ]).then(([details, buffer]) => {
    return {
      slug: details.slug,
      buffer: buffer,
      name: name,
      i: i
    };
  });

const getDetailsWithI = i =>
  fetch(`http://localhost:${port}/details/${i}`).then(response =>
    response.json()
  );

module.exports = {
  getSampleWithI: getSampleWithI,
  getDetailsWithI: getDetailsWithI
};
