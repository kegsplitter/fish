// DX7 WAM Controller
// Jari Kleimola 2017-18 (jari@webaudiomodules.org)

var WAM = WAM || {}
// WAM.origin = "http://127.0.0.1:44101/";
WAM.origin = "https://webaudiomodules.org/";

WAM.DX7 = class DX7 extends WAMController
{
  constructor (actx, options) {
    options = options || {};
    options.numberOfInputs  = 0;
    options.numberOfOutputs = 1;
    options.outputChannelCount = [1];

    super(actx, "wam-dx7", options);
    this.banks = WAM.DX7.banklist;
    this.patches = [];
    this.bank = [];
    if (!this.context)
      this.context = actx;
  }
  
  get title () { return "webDX7"; }
  get defpatch () { return 10; }
  
  static importScripts (actx) {
    return new Promise( (resolve) => {
      actx.audioWorklet.addModule(WAM.origin + "synths/wasm/dx7/dx7-wasm.js").then(() => {
      actx.audioWorklet.addModule(WAM.origin + "synths/wasm/dx7/dx7-loader.js").then(() => {
      actx.audioWorklet.addModule(WAM.origin + "synths/wasm/dx7/dx7-awp.js").then(() => {
				// resolve();
        setTimeout( function () { resolve(); }, 500);
      }) }) });
    }) 
  }

  loadBank (filename) {
    
    function extractName (data,offset) {
      var offset = offset || 118;	// 118 for packed, 145 for unpacked
      var name  = "";
      for (var n = 0; n < 10; n++) {
        var c = data[n + offset];
        switch (c) {
          case  92:  c = 'Y';  break;  // yen
          case 126:  c = '>';  break;  // >>
          case 127:  c = '<';  break;  // <<
          default: if (c < 32 || c > 127) c = 32; break;
        }
      name += String.fromCharCode(c);
      }
      return name;
    }
    
    var self = this;
    var url  = WAM.origin + "presets/dx7/" + filename;
    return new Promise( (resolve,reject) => {
      fetch(url).then(resp => {
      resp.arrayBuffer().then(data => {

        // -- packed bank with sysex frame (32 patches)
        if (data.byteLength != 4104) reject();
        self.patches = [];
        self.bank = [];
        data = new Uint8Array(data);
        data = data.subarray(6,4102);
        for (var i=0; i<32; i++) {
          var offset = i*128;
          var voice  = data.subarray(offset,offset+128);
          var name   = extractName(voice);
          self.patches.push(name);
          self.bank.push(voice);
        }
        resolve(self.patches);
      }) }) });
  }
}
WAM.DX7.title = "webDX7";

/* WAM.DX7.processorScripts = [
  "synths/dx7/dx7-wasm.js",
  "synths/dx7/dx7-loader.js",
  "synths/dx7/dx7-awp.js" ]; */

WAM.DX7.banklist = [
  "rom1A.syx",
  "steinber.syx",
  "SynprezFM_03.syx",
  "weird1.syx",
  "solange2.syx",
  "analog1.syx",
  "Dexed_01.syx"
];
