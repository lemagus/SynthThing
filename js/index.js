var files = [
	"midi/billie_jean.mid",
	"midi/take_on_me.mid"
];

var instruments = [
	new Tone.PolySynth(10, Tone.Synth).toMaster(),
	new Tone.PolySynth(10, Tone.FMSynth).toMaster(),
	new Tone.PolySynth(10, Tone.Synth, 
			{
				oscilliator: {
				type: 'triangle'
			},
			envelope: {
				attack: 8,
				decay: 3,
				sustain: 4,
				release: 3
			},
	}).toMaster()
];

MidiConvert.load( files[ Math.floor( Math.random() * files.length ) ] , function(midi) {
	
   // make sure you set the tempo before you schedule the events
  Tone.Transport.bpm.value = midi.header.bpm
    
  for(var i in midi.tracks) {

  	  var index = Math.floor(Math.random() * instruments.length);
	  var synth = instruments[ index ];
	  
	  console.log(index);
	  
  	  // pass in the note events from one of the tracks as the second argument to Tone.Part 
  	  var midiPart = new Tone.Part(function(time, note) {
	
	    //use the events to play the synth
	    synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
	
	  }, midi.tracks[i].notes).start();
  }

  // start the transport to hear the events
  Tone.Transport.start();
  
});