const messageElement = document.getElementById("msg"); //JavaScript code initializes a variable

const randomNumber = getRandomNumber();// JavaScript code is initializing a constant variable named and a function call

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  
  //This line of code checks for compatibility with the Web Speech API in the user's web browser
  //It assigns the SpeechRecognition object to window.SpeechRecognition if it exists, or falls back to window.webkitSpeechRecognition if the former is not available. 
  //This is necessary because different browsers may implement the API with different prefixes.


let recognition = new window.SpeechRecognition();

//This line of code initializes a new instance of the SpeechRecognition object and assigns it to the recognition variable

recognition.start();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
  
  //floating point no. is generated and after multi with 100 gets converted to int.
  //This expression generates a random integer between 0 and 99 and at last by adding 1 makes it between[0,100);


}

function onSpeak(event) {
  const message = event.results[0][0].transcript;


  //event.results[0]: This part accesses the first result, which is an array of recognition alternatives. In typical speech recognition scenarios,
  // multiple alternative transcriptions may be provided, but you're accessing the first one using [0].
  //event.results[0][0].transcript: This extracts the transcribed speech (text) from the first alternative of the first result.
  // This is the recognized speech input provided by the user
  // transcribed text= the written representation of spoken words.


  writeMessage(message);
  checkNumber(message);
}

function writeMessage(message) {
  messageElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${message}</span>
  `;
}

function checkNumber(message) {
  const number = +message;
  if (Number.isNaN(number)) {
    messageElement.innerHTML += "<div>That is not a valid number</div>";
    return;
  }
  if (number > 100 || number < 1) {
    messageElement.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }
  if (number === randomNumber) {
    document.body.innerHTML = `
          <h2>Congrats! You have guessed the number! <br><br>
          It was ${number}</h2>
          <button class="play-again" id="play-again">Play Again</button>
        `;
  } else if (number > randomNumber) {
    messageElement.innerHTML += "<div>GO LOWER</div>";
  } else {
    messageElement.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Event Listeners
recognition.addEventListener("result", onSpeak);


//This is a method that registers an event listener on the recognition object. It takes two arguments:
//"result": This is the name of the event you want to listen for. In this case, you're listening for the "result" event,
// which is typically triggered when the speech recognition system has recognized speech input and has results to provide.

//onSpeak: This is the event handler function that will be called when the "result" event occurs. In your code, 
//it's the onSpeak function that will be executed when speech recognition results are available.


recognition.addEventListener("end", () => recognition.start());

// The purpose of this code is to ensure that the speech recognition service continues listening for speech input even after it has finished processing a previous input.
// By listening for the "end" event and restarting the recognition process when it ends,
// you can create a continuous or persistent speech recognition system that is always ready to recognize new speech input from the user without requiring manual restarts

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") history.go(0);
});


// This line of code attaches a click event listener to the document.body element,
// which represents the entire body of the HTML document

//if (e.target.id == "play-again"): This condition checks if the element that was clicked (e.target) has an id attribute equal to "play-again."
// The e.target property refers to the actual HTML element that triggered the click event.
//history.go(0): If the condition is true (i.e., the element with the id "play-again" was clicked), this line of code uses the history.go(0) method to reload the page.
// The argument 0 instructs the browser to reload the current page, effectively resetting it to its initial state.
