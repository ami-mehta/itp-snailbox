const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let input;
let myBLE;

function setup() {
  myBLE = new p5ble();

  // Create a 'Pair/ Connect' button
  const connectButton = createButton("1. Pair With Me...");
  connectButton.mousePressed(connectToBle);
  connectButton.position(45, 200);

  // Create a text input for messages
  input = createInput();
  input.position(45, 250);
  // input.size(200, 200);

  // Create a 'Write Messages' button
  const writeButton = createButton("2. Leave A Message");
  // let col = color(25, 23, 200, 50);
  writeButton.position(input.x + input.width, 250);
  writeButton.mousePressed(writeToBle);
  // writeButton.style(col);

  // Create a 'Check Messages' button
  const checkButton = createButton("3. Check Messages!");
  checkButton.position(45, 300);
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
