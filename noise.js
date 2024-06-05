//p5.js global variable setting
let space = 10;
let dotSize = 3;
let dots = [];
let noi = 0.004;
let amplitude;

//web midi variable setting
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
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    console.error('Web MIDI API is not supported in this browser.');
  }
  getAudioContext().suspend();

  createCanvas(windowWidth, windowHeight);
  background(20);

  for (let i = space; i < windowWidth; i += space) {
    for (let ii = space; ii < windowHeight; ii += space) {
      let x = i; // Random x-coordinate
      let y = ii; // Random y-coordinate
      dots.push({ x, y }); // Add dot to the array
    }
  }

}

// Draw function for p5.js
function draw() {
  noStroke();
  background(20);

  amplitude = freq;
  console.log(amplitude);

  for (let i = 0; i < dots.length; i++) {
    let dot = dots[i];
    let x = frameCount % 100;

    // Generate unique noise values for each dot
    let ntX = noi * (i + 1); // Vary the factor to create different orbits
    let ntY = noi * (i + 2); // Another unique factor

    // Calculate offsets based on noise
    let xOffset = sin(frameCount/2 * noise(ntX)) * amplitude; // Adjust the amplitude
    let yOffset = cos(frameCount/2 * noise(ntY)) * amplitude; // Adjust the amplitude


    // // Calculate offsets based on noise
    // let xOffset = sin(amplitude * noise(ntX)); // Adjust the amplitude
    // let yOffset = cos(amplitude * noise(ntY)); // Adjust the amplitude

    // Draw the dot with orbital effect
    fill(250);
    circle(dot.x + xOffset, dot.y +   yOffset, dotSize);
  }
}

//把frequency 移植到 setup?
//把sin cos function 改直，使更直接的可以看到頻率與圖形的對應關係

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
    startSound(note);
  }
  console.log('command:'+ command,'note:'+ note,'velocity:'+ velocity);
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