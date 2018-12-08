// WaveTablePlayers
const audioContext = require('../util/AudioContext.js').getAudioContext();
const {createWhiteNoiseBuffer} = require('./WaveTableBufferFactory.js');

function createWhiteNoisePlayer(){
    return createPlayer(createWhiteNoiseBuffer(10));
}

function createPlayer(buffer){
    let player = audioContext.createBufferSource();
    player.buffer = buffer;
    player.loop = true;

    return player;
}

module.exports = {
    createWhiteNoisePlayer: createWhiteNoisePlayer,
    createPlayer: createPlayer
};