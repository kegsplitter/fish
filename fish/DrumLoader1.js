define(['SampleLoader'], function(SampleLoader){
  
  let sampleList = [
    [ 'MaxV - AGOGO_H.wav', 'agogo_h' ],
    [ 'MaxV - AGOGO_L.wav', 'agogo_l' ],
    [ 'MaxV - BONGO_H.wav', 'bongo_h' ],
    [ 'MaxV - BONGO_L.wav', 'bongo_l' ],
    [ 'MaxV - CLAVES.wav', 'calves' ],
    [ 'MaxV - CONGA_H.wav', 'conga_h' ],
    [ 'MaxV - CONGA_HM.wav', 'conga_hm' ],
    [ 'MaxV - CONGA_L.wav', 'conga_l' ],
    [ 'MaxV - COWBELL.wav', 'cowbell' ],
    [ 'MaxV - CUICA_H.wav', 'cuica_h' ],
    [ 'MaxV - CUICA_L.wav', 'cuica_l' ],
    [ 'MaxV - TAMBOURI.wav', 'tambouri' ],
    [ 'MaxV - TIMBAL_H.wav', 'timbal_h' ],
    [ 'MaxV - TIMBAL_L.wav', 'timbal_l' ],
    [ 'MaxV - WHISTLE1.wav', 'whistel1' ],
    [ 'MaxV - WHISTLE2.wav', 'whistel2' ]
  ];

  sampleList = sampleList.map(l => {return l[0] = '/samples/' + l[0], l});

  return () => SampleLoader.loadSampleList(sampleList);
});