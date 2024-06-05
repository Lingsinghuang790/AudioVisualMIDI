//basic midi setting
//check the input & output info

WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {//midi enable
    if (navigator.requestMIDIAccess) {
      console.log('This browser supports WebMIDI!');
  } else {
      console.log('WebMIDI is not supported in this browser.');
  }

  navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

  function onMIDISuccess(midiAccess) {
      console.log(midiAccess);

      var inputs = midiAccess.inputs;
      var outputs = midiAccess.outputs;
  }

  function onMIDIFailure() {
      console.log('Could not access your MIDI devices.');
  }


  
  // Inputs
  WebMidi.inputs.forEach(input => console.log(input.manufacturer, input.name));
  
  // Outputs
  WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

}

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values()){
      input.onmidimessage = getMIDIMessage;
  }
}

// function getMIDIMessage(midiMessage) {
//   console.log(midiMessage);
// }

function getMIDIMessage(midiMessage){
  var command = message.data[0];
  var note = message.data[1];
  var velocity = (message.data.length > 2) ? message.data[2] : 0; // a
  console.log('command:'+command, 'note:'+note, 'velocity:'+velocity);
}