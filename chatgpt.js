// let circles = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   background(0);

//   // Enable WebMIDI
//   WebMidi.enable().then(onEnabled).catch(err => console.error(err));
// }

// function draw() {
//   background(0, 20); // Clear the background with transparency
//   noStroke();

//   // Draw circles based on MIDI input
//   for (let circle of circles) {
//     fill(circle.color);
//     ellipse(circle.x, circle.y, circle.size);
//     circle.size -= 1; // Shrink the circles over time
//   }

//   // Remove circles that are too small
//   circles = circles.filter(circle => circle.size > 0);
// }

// //enable MIDI
// function onEnabled() {
//   // Display available MIDI input devices
//   if (WebMidi.inputs.length < 1) {
//     console.log("No MIDI device detected.");
//   } else {
//     WebMidi.inputs.forEach((device, index) => {
//       console.log(`${index}: ${device.name}`);
//       device.addListener('noteon', 'all', e => {
//         handleNoteOn(e);
//       });
//       device.addListener('noteoff', 'all', e => {
//         handleNoteOff(e);
//       });
//     });
//   }
// }

// //push the circle with multiple values, use in the draw function
// function handleNoteOn(event) {
//   let note = event.note;
//   let velocity = event.velocity;
//   let x = map(note.number, 21, 108, 0, width); // Map note range to canvas width
//   let y = random(height); // Random y position
//   let size = map(velocity, 0, 1, 20, 100); // Map velocity to circle size
//   let color = getColorForNote(note.number); // Get a color based on the note

//   circles.push({ x: x, y: y, size: size, color: color });
// }

// function handleNoteOff(event) {
//   // Optionally handle note off events
// }

// function getColorForNote(note) {
//   // Create a color based on the note number
//   let hue = map(note, 21, 108, 0, 360); // Map note to hue value
//   return color(hue, 100, 100); // Use HSB color mode
// }


// Initialize WebMIDI
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    WebMidi.enable().then(onEnabled).catch(err => console.error(err));
}

// Handle MIDI input
function onEnabled() {
    if (WebMidi.inputs.length < 1) {
        console.log("No MIDI device detected.");
    } else {
        WebMidi.inputs.forEach(device => {
            device.addListener('noteon', 'all', handleNoteOn);
            // Optionally add noteoff listener: device.addListener('noteoff', 'all', handleNoteOff);
        });
    }
}

// Handle note-on events
function handleNoteOn(event) {
    let note = event.note.number;
    let velocity = event.velocity;
    let x = map(note, 21, 108, 0, width); // Map note range to canvas width
    let y = random(height); // Random y position
    let size = map(velocity, 0, 1, 20, 100); // Map velocity to circle size
    let color = getColorForNote(note); // Get a color based on the note

    fill(color);
    ellipse(x, y, size);
}

// Map note number to color
function getColorForNote(note) {
    let hue = map(note, 21, 108, 0, 360);
    return color(hue, 100, 100);
}
