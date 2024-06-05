let midi;
let circles = [];
let freq;
let note;
let audioContext; // Declare globally

//press mouse to start!
function mousePressed() {
    getAudioContext().resume();
    userStartAudio();
}

// Setup function for p5.js
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    console.error('Web MIDI API is not supported in this browser.');
  }
  getAudioContext().suspend();
}

// Draw function for p5.js
function draw() {
  background(0);
  // fill(random(250),random(250),random(250));

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    fill(random(50,100),200,c.color);
    // fill(250,0,0);
    ellipse(c.x, c.y, c.size, c.size);
    // ellipse(c.x*random(20), c.y*random(20), c.size, c.size);//add random  
  }
}

// MIDI success callback
function onMIDISuccess(midiAccess) {
  console.log('MIDI ready!');
  midi = midiAccess;
  const inputs = midi.inputs.values();
  for (let input of inputs) {
    input.onmidimessage = getMIDIMessage;
  }
}

// MIDI failure callback
function onMIDIFailure() {
  console.error('Could not access your MIDI devices.');
}

// Handle incoming MIDI messages
function getMIDIMessage(message) {
  const [command, note, velocity] = message.data;
  if (command === 144 && velocity > 0) { // Note On message
    addCircle(note, velocity);
    startSound(note);
  }
  console.log('command:'+ command,'note:'+ note,'velocity:'+ velocity);
}

console.log(note);

// Add a circle based on MIDI note and velocity
function addCircle(note, velocity) {
  let x = map(note, 21, 108, 0, width); // Map MIDI note to canvas width
  let y = random(height); // Random y position
  let size = map(velocity, 0, 127, 10, 100); // Map velocity to circle size
  let c = map(velocity, 0, 127, 50, 255); // Map velocity to color intensity
  // let color = fill(random(255),random(255),random(255),c);//random color, but hue to the velocity
  // let color = (random(255),random(255),random(255));
  circles.push({ x: x, y: y, size: size, color: c });

  // Limit the number of circles to 50
  if (circles.length > 50) {
    circles.shift();
  }
}


function startSound(note) {
    const osc = new p5.TriOsc();
    const env = new p5.Envelope();
    osc.start();
  
    freq = midiToFreq(note);
    osc.freq(freq);
    env.ramp(osc, 0, 1.0, 0);
    console.log(freq);
    console.log(note);
}


// document.addEventListener('click', () => {
//   audioContext = new AudioContext();
//   // Initialize audio components here
// });
