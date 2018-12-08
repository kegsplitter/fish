define(['util/Pipe', 'util/nPow', 'util/Scale', 'util/Mtof', 'util/Patcher', 'util/getAudioContext', 'util/Command', 'util/Line', 'util/Id'], function(Pipe, nPow, Scale, Mtof, Patcher, getAudioContext, Command, Line, Id){
	
	return {
		Pipe            : Pipe,
		getAudioContext : getAudioContext,
		nPow            : nPow,
		Scale           : Scale,
		Mtof            : Mtof,
    Clone           : (o) => JSON.parse(JSON.stringify(o)),
    Patcher         : Patcher,
    Command         : Command,
    Line            : Line,
    Id              : Id
	};
});