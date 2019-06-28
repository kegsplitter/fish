const fs = require("fs");
const { join, basename } = require("path");
const slug = require("slug");

const audioExtensions = [".mp3", ".wav"];

const isAudioFile = path => audioExtensions.some(e => path.endsWith(e));
const getFileType = path =>
  audioExtensions.find(e => path.endsWith(e)).replace(".", "");

const getName = path => basename(path);

function getFilesFromDir(dir) {
  const fileList = fs.readdirSync(dir);

  return fileList
    .map(shortPath => {
      const longPath = join(dir, shortPath);
      const stat = fs.statSync(longPath);

      if (stat.isDirectory()) return getFilesFromDir(longPath);

      if (isAudioFile(shortPath))
        return {
          path: longPath,
          name: getName(longPath),
          slug: slug(getName(longPath)),
          fileType: getFileType(longPath)
        };
    })
    .filter(p => p)
    .reduce((e, v) => (!isNaN(v.length) ? [...e, ...v] : [...e, v]), []);
}

function getSampleList(longUrlParent, shortUrlParent, samplePath) {
  const fileList = getFilesFromDir(samplePath);

  return fileList.map((o, i) => ({
    ...o,
    url: buildFileUrl(longUrlParent, o.slug),
    iurl: buildFileUrl(shortUrlParent, String(i)),
    index: i
  }));
}

const buildFileUrl = (parentUrl, name) => join(parentUrl, name);

module.exports = {
  getSampleList
};
