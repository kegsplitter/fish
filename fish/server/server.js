// File Server.
// Used pass audio files

const Express = require("express");
const { createReadStream } = require("fs");
const { getSampleList } = require("./SampleList");
const app = Express();

// ENV
const port = process.env.PORT || 8765;
const samplePath = process.env.SAMPLE_PATH;

const longUrlParent = "/sample/";
const shortUrlParent = "/i/";

if (!samplePath) throw "NO_SAMPLE_PATH_SET";

const sampleList = getSampleList(longUrlParent, shortUrlParent, samplePath);

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/getSamples", (request, response) => {
  response.json(
    sampleList.map(o => ({
      name: o.name,
      i: o.i,
      url: o.url,
      iurl: o.iurl,
      fileType: o.fileType,
      slug: o.slug
    }))
  );
});

const fileStreamer = o => {
  const { path, fileType } = o;

  return (request, response) => {
    response.setHeader("Content-Type", `audio/${fileType}`);
    response.setHeader("slugName", o.slug);
    createReadStream(path).pipe(response);
  };
};

const getSampleDetails = o => {
  const { slug, index, url, iurl, name } = o;

  return (request, response) => {
    response.json({
      name,
      slug,
      index,
      url,
      iurl
    });
  };
};

sampleList.forEach(o => {
  app.get(o.url, fileStreamer(o));
  app.get(o.iurl, fileStreamer(o));
  app.get(`/details/${o.index}`, getSampleDetails(o));
});

console.log("Port: ", port);
console.log("Sample Path: ", samplePath);
console.log(`Sample list is ${sampleList.length} long.`);

app.listen(port);
