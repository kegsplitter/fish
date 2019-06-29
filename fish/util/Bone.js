// Bone

// Curry functions to build a bar of music
// All values are expressed as a fraction of time

const buildBone = (id, position, duration) => {
  return (startTime, timeLength) => ({
    id,
    time: startTime + position * timeLength,
    duration: timeLength * duration
  });
};

// position list is something like [0,0,0,1,0,0,0,0]
// reduce through list - if value is truthy then create a bone there
const buildBoneLine = (id, positionList, duration) => {
  const dom = positionList.length;

  return positionList.reduce(
    (e, v, i) => (!v ? e : [...e, buildBone(id, i / dom, duration)]),
    []
  );
};

const renderBone = (input, bone, startTime, length) => {
  input.push(bone(startTime, length));
};

const renderBroth = (input, broth, startTime, length) => {
  broth.forEach(bone => renderBone(input, bone, startTime, length));
};

const renderSlosh = (input, slosh, startTime, length) => {
  for (let i = 0; i < slosh.length; i++) {
    const time = startTime * (length * i);
    this.renderBroth(input, slosh[i], time, length);
  }

  return tartTime + length * slosh.length;
};

const broth = [
  // ...new Array(4).fill(null).map((v, i) => buildBone("click", i / 4, 1 / 8)),
  ...buildBoneLine("click", [1, 1, 1, 1], 1 / 8),
  buildBone("kick", 0, 1 / 8),
  buildBone("kick", 3 / 8),
  buildBone("snare", 2 / 4, 1 / 8)
];

module.exports = {
  buildBone,
  buildBoneLine,
  renderBone,
  renderBroth,
  renderSlosh
};
