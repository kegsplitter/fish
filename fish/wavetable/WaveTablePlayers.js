// WaveTablePlayers
const {getAudioContext} = require('../util/AudioContext.js');
const {createWhiteNoiseBuffer, createSignalBuffer} = require('./WaveTableBufferFactory.js');

let signalBuffer = null;

function createWhiteNoisePlayer(){
    return createPlayer(createWhiteNoiseBuffer(10));
}

function createPlayer(buffer){
    let player = getAudioContext().createBufferSource();
    player.buffer = buffer;
    player.loop = true;

    return player;
}

function createSignalPlayer(){
    if(!signalBuffer) signalBuffer = createSignalBuffer();
    return createPlayer(signalBuffer);
/*
    let volume = getAudioContext().createGain();
    player.connect(volume);
    volume.start = player.start.bind(player);
    volume.stop = player.stop.bind(player);

    return volume;
    */
}

module.exports = {
    createWhiteNoisePlayer: createWhiteNoisePlayer,
    createPlayer: createPlayer,
    createSignalplayer: createSignalPlayer
};