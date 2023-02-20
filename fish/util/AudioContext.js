// AudioContext
// This might be different things depending on wether the env is node or browser
// TODO: just browser for now

let _getAudioContext = () => {
    const audioContext = new AudioContext();

    _getAudioContext = () => audioContext;

    return audioContext;
}

export function isOffline(){
    return false;
}

export function getAudioContext(){
    return _getAudioContext();
}