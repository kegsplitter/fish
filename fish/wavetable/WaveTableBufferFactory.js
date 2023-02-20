// wave table buffer factory
import {getAudioContext} from '../util/AudioContext.js';

export function createWhiteNoiseBuffer(duration = 1){
    let audioContext = getAudioContext();
    let buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    let data = buffer.getChannelData(0);

    for(let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2) - 1;
    }

    return buffer;
}
