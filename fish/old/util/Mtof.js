// from https://www.npmjs.com/package/mtof
define(function(){
  function mtof(midiNote, concertPitch) {
    if (concertPitch === undefined) concertPitch = 440;

    if (typeof midiNote !== 'number') {
      throw new TypeError("'mtof' expects its first argument to be a number.")
    }

    if (typeof concertPitch !== 'number') {
      throw new TypeError("'mtof' expects its second argument to be a number.")
    }

    return Math.pow(2, (midiNote - 69) / 12) * concertPitch;
  }
  
  return mtof;
})