// AudioContext
// This might be different things depending on wether the env is node or browser
// TODO: just browser for now
const audioContext = new AudioContext();

function isOffline(){
    return false;
}

module.exports = {
    getAudioContext: ()=> audioContext,
    isOffline: isOffline
};