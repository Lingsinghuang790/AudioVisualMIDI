WebMidi.enable().then(onEnabled).catch(err => alert(err));

let freq;

function setup() {
    let cnv = createCanvas(100, 100);
    cnv.mousePressed(startSound);
    osc = new p5.TriOsc();
    env = new p5.Envelope();
  }

function startSound() {
    // see also: userStartAudio();
    osc.start();
  
    freq = midiToFreq( );
    osc.freq(freq);
    env.ramp(osc, 0, 1.0, 0);
}

function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      console.log("No MIDI device detected.");
    } else {
      WebMidi.inputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
        device.addListener('noteon', 'all', e => {
          handleNoteOn(e);
        });
        device.addListener('noteoff', 'all', e => {
          handleNoteOff(e);
        });
      });
    }
  }