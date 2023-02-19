// AudioContext
// This might be different things depending on wether the env is node or browser
// TODO: just browser for now

let _getAudioContext = () => {
    const audioContext = new AudioContext();

    _getAudioContext = () => audioContext;

    return audioContext;
}

function isOffline(){
    return false;
}

module.exports = {
    getAudioContext: () => _getAudioContext(),
    isOffline: isOffline
};