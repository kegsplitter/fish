class TestWorkletProcessor extends AudioWorkletProcessor {
  constructor(){
    super();
  }

  process(inputs, outputs, params){

    let input = inputs[0];
    let output = outputs[0];

    if(input.length === 0) return true;

    input[0].forEach((v, i) => output[0][i] = v);
    input[1].forEach((v, i) => output[1][i] = v);
    return true;
  }
}

registerProcessor('test-worklet-processor', TestWorkletProcessor);