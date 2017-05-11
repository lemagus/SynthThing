var files = [
	"midi/billie_jean.mid",
	"midi/take_on_me.mid",
	"midi/bohemian_rhapsody.mid",
	"midi/under_pressure.mid",
	"midi/another_brick.mid"
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
	  	  
  	  var midiPart = new Tone.Part(function(time, note) {
  	  	synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
  	  	
  	  	// Animation
  	  	var offset = 300;
  	  	
  	  	onMouseMoved({
	  	  	pageX: Math.round( Math.random() * offset ) ,
	  	  	pageY: Math.round( Math.random() * offset ) 
  	  	});
  	  	
	  }, midi.tracks[i].notes).start();
  }

  // start the transport to hear the events
  Tone.Transport.start();
  
});
