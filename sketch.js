const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let input;
let myBLE;

function setup() {
  myBLE = new p5ble();

  // Create a 'Pair/ Connect' button
  const connectButton = createButton("Pair");
  connectButton.mousePressed(connectToBle);
  connectButton.position(15, 65);

  // Create a text input for messages
  input = createInput();
  input.position(15, 100);
  // input.size(200, 200);

  // Create a 'Write Messages' button
  const writeButton = createButton("Leave Message");
  writeButton.position(input.x + input.width + 15, 100);
  writeButton.mousePressed(writeToBle);

  // Create a 'Check Messages' button
  const checkButton = createButton("Check Messages");
  // checkButton.position(input.x + input.width + 15, 200);
  checkButton.mousePressed(checkMessages);
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log("error: ", error);
  console.log("characteristics: ", characteristics);
  // Set the first characteristic as myCharacteristic
  myCharacteristic = characteristics[0];
}

function writeToBle() {
  const inputValue = input.value();
  // Write the value of the input to myCharacteristic
  if (inputValue == "") {
    alert("Oops! You tried to store an empty message! 😫");
  } else {
    myBLE.write(myCharacteristic, inputValue);
  }
  input.value("");
}

function checkMessages() {
  const inputValue = "98764502837";
  // Write the value of the input to myCharacteristic
  myBLE.write(myCharacteristic, inputValue);
}
