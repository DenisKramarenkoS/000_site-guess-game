const randomValue =
  Math.floor(Math.random() * 100) === 0 ? 1 : Math.floor(Math.random() * 100); // Random anchor value from 1 to 100
const sendButton = document.getElementById("sendButton");
const playAgainButton = document.getElementById("playAgainButton");
const guesses = document.getElementById("guesses");
const textAnswer = document.getElementById("textAnswer");
const answer = document.getElementById("answer");
const hint = document.getElementById("hint");
const guessField = document.getElementById("guessField");
const formSubmit = document.getElementById("formSubmit");

let lowValue = 0;
let highValue = 100;

let checkClickAnswers = true;
let isGameWon = false;
let isCustomInputActive = false;
let isControlPressed = false;

console.log(randomValue); // Checking in Console

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Key handler
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Delete default action on "Enter" key
    if (!isGameWon)
      sendButton.click(); // If game isn't end, activate the sendButton
    else playAgainButton.click(); // If game end,  activate the playAgainButton
  }

  if (event.code === "ControlLeft" || event.code === "ControlRight") {
    isControlPressed = true;
  }

  if (!isGameWon && !isCustomInputActive) {
    if (/^Digit[0-9]$/.test(event.code) || /^Numpad[0-9]$/.test(event.code)) {
      guessField.value += Number(event.key);
    } else if (
      isControlPressed &&
      (event.code === "Backspace" || event.code === "Delete")
    ) {
      guessField.value = "";
    } else if (event.code === "Backspace") {
      guessField.value = guessField.value.slice(0, -1);
    } else if (event.code === "Delete") {
      guessField.value = guessField.value.slice(1);
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ControlLeft" || event.code === "ControlRight") {
    isControlPressed = false;
  }
});

guessField.addEventListener("focus", () => {
  isCustomInputActive = true;
});

guessField.addEventListener("blur", () => {
  isCustomInputActive = false;
});

// Send button
sendButton.addEventListener("click", function () {
  const guessValue = Number(guessField.value); // User input

  if (checkClickAnswers) {
    // If SendButton was click show the addict content
    guesses.style.display = "block";
    answer.style.display = "flex";
    checkClickAnswers = false; // Show once
  }

  if (guessValue < 1 || guessValue > 100) {
    // If Guess Value out of range doing this
    guesses.textContent += " X";

    hint.textContent = `Your answer is out of range, try numbers in the range (${lowValue} - ${highValue})`;

    textAnswer.textContent = "Incorrect Value";
    answer.style.backgroundColor = "yellow";
    answer.style.borderColor = "darkorange";
  } else {
    guesses.textContent += " " + guessValue; // Adding a value in the Previous panel

    if (randomValue !== guessValue) {
      textAnswer.textContent = "Wrong";
      answer.style.backgroundColor = "red";
      answer.style.borderColor = "darkred";

      if (randomValue > guessValue) {
        if (guessValue > lowValue) lowValue = guessValue;

        hint.textContent = `Your answer is too low, try numbers in the range (${lowValue} - ${highValue})`;
      } else if (randomValue < guessValue) {
        if (guessValue < highValue) highValue = guessValue;

        hint.textContent = `Your answer is too big, try numbers in the range (${lowValue} - ${highValue})`;
      }
    } else {
      textAnswer.textContent = "Correct";
      answer.style.backgroundColor = "greenyellow";
      answer.style.borderColor = "green";

      hint.textContent = "Your answer is correct! Congratulations!";

      guessField.setAttribute("readonly", "true");
      isGameWon = true;
    }
  }
});

// Play again button
playAgainButton.addEventListener("click", function () {
  location.reload(true);
});
