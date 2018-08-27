const validIsbnCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "X"];
let capturing = false;
let capturedData = "";

export default function barcodeListener(event, onCapture) {
  const keyName = event.key;

  if (keyName === "Control") {
    // do not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    if (keyName === "b") {
      capturing = true;
      capturedData = "";
      console.log("start barcode capture");
    } else if (keyName === "c" && capturing) {
      capturing = false;
      // TODO: dispatch event
      // onCapture(capturedData)
      console.log("barcode captured: " + capturedData);
    }
  } else if (capturing) {
    if (validIsbnCharacters.includes(keyName)) {
      // If we're capturing we need to prevent the event from going somewhere else
      event.preventDefault();
      event.stopPropagation();
      capturedData += keyName;
    } else {
      // TODO: generate all the keystrokes captured back to the event
      // https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically
      capturing = false;
      console.log("barcode capture canceled");
    }

  }
}