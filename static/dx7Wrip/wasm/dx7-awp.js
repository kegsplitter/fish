// DX7 WAM Processor
// Jari Kleimola 2017-18 (jari@webaudiomodules.org)

class DX7AWP extends AudioWorkletGlobalScope.WAMProcessor
{
  constructor(options) {
    options = options || {}
    options.mod = AudioWorkletGlobalScope.WAM.DX7;
    super(options); }
}

registerProcessor("wam-dx7", DX7AWP);
