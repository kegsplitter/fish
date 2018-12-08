const {getAudioContext, isOffline} = require('../../util/AudioContext.js');
const {createPlayer} = require('../../wavetable/WaveTablePlayers.js');

let rampDown = 0.01;

function windOrganVoice(audioOutputNode, buffer, startTime, baseHz){
    const audioContext = getAudioContext();
    let player = createPlayer(buffer);
    player.start(startTime);

    let localOutput = audioContext.createGain();
    localOutput.gain.value = 0;
    localOutput.connect(audioOutputNode);
    localOutput.gain.linearRampToValueAtTime(1, startTime + rampDown);

    let filterList = new Array(8)
      .fill(null)
      .map((v, i)=> {
        let filter = audioContext.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = baseHz * Math.pow(2, i);
        filter.Q.value = 100;
        player.connect(filter);
        filter.connect(localOutput);
        return filter;
      })

    filterList = filterList.concat(
      new Array(8)
        .fill(null)
        .map((v,i)=>{
          let filter = audioContext.createBiquadFilter();
          filter.type = 'bandpass';
          filter.Q.value = 100;
          let offsetHz = baseHz * Math.pow(2, i);
          filter.frequency.value = offsetHz * 1.5;
          player.connect(filter);
          filter.connect(localOutput);

          return filter;
        })
    )


    // destroy function
    return (endTime)=> {

        if(endTime === undefined) endTime = audioContext.currentTime;

        localOutput.gain.cancelScheduledValues(endTime);
        localOutput.gain.linearRampToValueAtTime(0, endTime + rampDown);
        player.stop(endTime + rampDown);

        if(!isOffline()){
            player.onEnded = ()=> {
                filterList.forEach(filter => filter.disconnect());
                localOutput.disconnect();
            }
        }
    }
}

module.exports = windOrganVoice;