
let ball = {
    x: 0,
    y: 0,
    diameter: 50,
    speedX: 0,
    speedY: 0,
    color: [255, 255, 255]
  };
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    ball.x = width / 2;
    ball.y = height / 2;
  
    // Enable WebMIDI
    WebMidi.enable().then(onEnabled).catch(err => console.error(err));
  }
  
  function draw() {
    background(0);
  
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
  
    // Bounce off walls
    if (ball.x > width - ball.diameter / 2 || ball.x < ball.diameter / 2) {
      ball.speedX *= -1;
    }
    if (ball.y > height - ball.diameter / 2 || ball.y < ball.diameter / 2) {
      ball.speedY *= -1;
    }
  
    // Draw the ball
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.diameter);
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

  function handleNoteOn(event) {
    let note = event.note;
    let velocity = event.velocity*10;
    
    // Map note range to ball speed and direction
    ball.speedX = map(note.number, 21, 108, -10, 10) * velocity;
    ball.speedY = map(note.number, 21, 108, -10, 10) * velocity;
    
    // Map note number to ball color
    let hue = map(note.number, 21, 108, 0, 360);
    ball.color = color(hue, 100, 100);
    console.log(velocity);
    console.log(note);
  }
  
  function handleNoteOff(event) {
    // Optionally handle note off events
  }
  
//   function getColorForNote(note) {
//     // Create a color based on the note number
//     let hue = map(note, 21, 108, 0, 360); // Map note to hue value
//     return color(hue, 100, 100); // Use HSB color mode
//   }
  