"use strict";

// DOM Elements
const msgEl = document.getElementById("msg");

// Function getRandom Number
const getRandom = () => Math.floor(Math.random() * 100) + 1;

// Create a Random Number
const randomNum = getRandom();

console.log(`Number to guess: ${randomNum}`);

// Initialize the Speech Recognition Object
window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener("result", onSpeak);
// recognition.continuous = true;
// Capture the input from the user
function onSpeak(e) {
    // Path to access value
    const msg = e.results[0][0].transcript;
    console.log(msg);

    // Call functions
    writeMessage(msg);
    checkNumber(msg);
}

// Display user's input into the UI
function writeMessage(value) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${value}</span>
    `;
}

// Check the user's guess against the number
function checkNumber(msg) {
    const num = +msg;

    // Check number to see if it's valid
    if (Number.isNaN(num)) {
        console.log("Invalid Number");
        msgEl.innerHTML += `<div>That is not a valid number</div>`;
        return;
    } else if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
    } else {
        if (num === randomNum) {
            console.log("You got it!");
            document.body.innerHTML = `
                <h2 style="text-align: center"> Congrats! You have guessed the number!<br><br>
                It was ${num}</h2>
                <button class="play-again" id="play-again">Play Again</button>
                `;
            recognition.stop();
        } else if (num < randomNum) {
            console.log("Please guess higher");
            msgEl.innerHTML += `<div>GO HIGHER</div>`;
        } else {
            console.log("Please guess lower");
            msgEl.innerHTML += `<div>GO LOWER</div>`;
        }
    }
}

recognition.addEventListener("end", () => {
    recognition.start();
});

document.body.addEventListener("click", (e) => {
    if (e.target.id == "play-again") {
        window.location.reload();
    }
});
