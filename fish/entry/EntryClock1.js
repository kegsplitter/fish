import "babel-polyfill";
const { getSampleWithI } = require("../server/sampleGetter.js");
const Pipe = require("../util/Pipe.js");

async function _run() {
  const iList = [34, 87, 154];
  const samples = await Promise.all(iList.map(getSampleWithI));
  console.log(samples);

  const input = new Pipe();
}

function run() {
  document.body.removeChild(button);
  _run();
}

const button = document.createElement("button");
button.innerHTML = "GO";
document.body.appendChild(button);
button.addEventListener("click", run);
