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
const displayedBlock = document.getElementsByClassName("displayedBlock");
const attemptNumber = document.getElementById("attemptNumber");
const switchTheme = document.getElementById("switchTheme");
const closingBanner = document.getElementById("red");
const buttonForm = document.getElementsByClassName("button-form");
const textDullColor = document.getElementsByClassName("textDullColor");
const menuButton = document.getElementsByClassName("menuButton");

let lowValue = 0;
let highValue = 100;

let checkClickAnswers = true;
let isGameWon = false;
let isCustomInputActive = false;
let isControlPressed = false;

let countAttempt = 0;

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

guessField.addEventListener("focus", (e) => {
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
    for (let i = 0; i < displayedBlock.length; i += 1) {
      displayedBlock[i].style.display = "block";
    }
    answer.style.display = "flex";
    checkClickAnswers = false; // Show once
  }

  if (guessValue < 1 || guessValue > 100) {
    // If Guess Value out of range doing this
    hint.textContent = `Is out of range, try in the range (${lowValue} - ${highValue})`;

    textAnswer.textContent = "Incorrect Value";
    answer.style.backgroundColor = "yellow";
    answer.style.borderColor = "darkorange";
  } else {
    countAttempt += 1;
    attemptNumber.textContent -= 1;
    guesses.textContent += " " + guessValue; // Adding a value in the Previous panel
    if (randomValue !== guessValue) {
      textAnswer.textContent = "Wrong";
      answer.style.backgroundColor = "red";
      answer.style.borderColor = "darkred";

      if (randomValue > guessValue) {
        if (guessValue > lowValue) lowValue = guessValue;

        hint.textContent = `Too low, try numbers in the range (${lowValue} - ${highValue})`;
      } else if (randomValue < guessValue) {
        if (guessValue < highValue) highValue = guessValue;

        hint.textContent = `Too big, try numbers in the range (${lowValue} - ${highValue})`;
      }

      if (countAttempt >= 7) {
        hint.textContent = "Your attempts is over. It's was the " + randomValue;
        guessField.setAttribute("readonly", "true");
        sendButton.setAttribute("disabled", "true");
        isGameWon = true;
      }
    } else {
      textAnswer.textContent = "Correct";
      answer.style.backgroundColor = "greenyellow";
      answer.style.borderColor = "green";

      hint.textContent = "Your answer is correct! Congratulations!";

      guessField.setAttribute("readonly", "true");
      sendButton.setAttribute("disabled", "true");
      isGameWon = true;
    }
  }
  guessField.value = "";
});

switchTheme.addEventListener("click", () => {
  const currentTheme = document.body.className;
  if (currentTheme === "lightTheme") {
    document.body.className = "darkTheme";

    // menu buttons
    for (let i = 0; i < menuButton.length; i += 1) {
      menuButton[i].style.color = "white"
      menuButton[i].style.backgroundColor = "black"
    }

    // banner, which close info-text
    closingBanner.style.backgroundColor = "white";

    // buttons
    for (let i = 0; i < buttonForm.length; i += 1) {
      buttonForm[i].classList.add("black-form");
    }

    // Text with dull color
    for (let i = 0; i < textDullColor.length; i += 1) {
      textDullColor[i].style.color = "hsl(0 0% 15%)"
    }
  } else {
    document.body.className = "lightTheme";

    // menu buttons
    for (let i = 0; i < menuButton.length; i += 1) {
      menuButton[i].style.color = "black";
      menuButton[i].style.backgroundColor = "white";
    }

    // banner, which close info-text
    closingBanner.style.backgroundColor = "black";

    //buttons
    for (let i = 0; i < buttonForm.length; i += 1) {
      buttonForm[i].classList.remove("black-form");
    }

    // Text with dull color
    for (let i = 0; i < textDullColor.length; i += 1) {
      textDullColor[i].style.color = "hsl(0 0% 85%)";
    }
  }
});

// Play again button
playAgainButton.addEventListener("click", function () {
  location.reload(true);
});
