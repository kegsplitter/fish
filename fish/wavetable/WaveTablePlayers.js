// WaveTablePlayers
import { getAudioContext } from '../util/AudioContext.js';
import { createWhiteNoiseBuffer } from './WaveTableBufferFactory.js';

export function createWhiteNoisePlayer(){
    return createPlayer(createWhiteNoiseBuffer(10));
}

export function createPlayer(buffer){
    let player = getAudioContext().createBufferSource();
    player.buffer = buffer;
    player.loop = true;

    return player;
}
