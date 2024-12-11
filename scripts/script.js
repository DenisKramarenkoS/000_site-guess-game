"use strict";

function gameMode(isGameModeEnable, anotherGameMode, mode) {
  isGameModeEnable = true;
  anotherGameMode = false;
  const russianVersionCheck =
    document.body.classList.contains("russianVersion");

  if (russianVersionCheck) { //s
    if (mode === "hard") {
      info.textContent =
        "Мы загадали число от 1 до 1000. Сможешь отгадать его за 10 попыток?";
    } else if (mode === "insane") {
      info.textContent =
        "Мы загадали число от 1 до 4 миллиардов. Сможешь отгадать его за 32 попытки?";
    }
  } else {
    if (mode === "hard") {
      info.textContent =
        "We have selected a number from 1 to 1000. See if you can guess it in 10 turns or fewer";
    } else if (mode === "insane") {
      info.textContent =
        "We have selected a number from 1 to 4 billion. See if you can guess it in 32 turns or fewer";
    }
  }
}

// HTML elements
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
const curtain = document.getElementById("curtain");
const buttonForm = document.getElementsByClassName("button-form");
const textDullColor = document.getElementsByClassName("textDullColor");
const menuButton = document.getElementsByClassName("menuButton");
const hardModeButton = document.getElementById("hardModeButton");
const insaneModeButton = document.getElementById("insaneModeButton");
const info = document.getElementById("info");
const numbersBlock = document.getElementById("numbersBlock");
const numberButton = document.getElementsByClassName("numberButton");

let isGameWon = false;
let isCustomInputActive = false;
let isControlPressed = false;

let isHardModeEnable = false;
let isInsaneModeEnable = false;

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
});
// Key handler
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Delete default action on "Enter" key
    if (!isGameWon)
      sendButton.click(); // If game isn't end, activate the sendButton
    else playAgainButton.click(); // If game end, activate the playAgainButton
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
  let randomValue;
  let maxValue;
  let lowValue;
  let highValue;
  let isValueCreated = false;
  let checkClickAnswers = true;
  let countAttempt = 0;
  let maxCountAttempts;

  if (!isValueCreated) {
    if (isHardModeEnable) {
      maxValue = 1000;
      maxCountAttempts = 10;
    } else if (isInsaneModeEnable) {
      maxValue = 4000000000;
      maxCountAttempts = 32;
    } else {
      maxValue = 100;
      maxCountAttempts = 7;
    }
    randomValue = Math.floor(Math.random() * maxValue);

    console.log(randomValue);

    isValueCreated = true;
    lowValue = 1;
    highValue = maxValue;
  }

  const guessValue = Number(guessField.value); // User input
  const russianVersionCheck =
    document.body.classList.contains("russianVersion");

  if (checkClickAnswers) {
    // If SendButton was click show the addict content
    for (let i = 0; i < displayedBlock.length; i++) {
      displayedBlock[i].style.display = "block";
    }
    answer.style.display = "flex";
    checkClickAnswers = false; // Show once
  }

  if (guessValue < 1 || guessValue > maxValue) {
    // If Guess Value out of range doing this

    if (russianVersionCheck) {
      hint.textContent = `Число вне диапазона, попробуйте (${lowValue} - ${highValue})`;
    } else {
      hint.textContent = `Is out of range, try in the range (${lowValue} - ${highValue})`;
    }

    textAnswer.textContent = "Incorrect Value";

    answer.style.color = "hsl(25 100% 50%)";
    answer.style.borderColor = "hsl(25 100% 50%)";
  } else {
    countAttempt++;
    attemptNumber.textContent = maxCountAttempts - countAttempt;
    guesses.textContent += " " + guessValue; // Adding a value in the Previous panel
    if (randomValue !== guessValue) {
      if (russianVersionCheck) textAnswer.textContent = "Неправильно";
      else textAnswer.textContent = "Wrong";
      answer.style.color = "red";
      answer.style.borderColor = "red";

      if (randomValue > guessValue) {
        if (guessValue > lowValue) lowValue = guessValue;

        if (russianVersionCheck) {
          hint.textContent = `Слишком мало, попробуй в диапазоне (${lowValue} - ${highValue})`;
        } else {
          hint.textContent = `Too low, try numbers in the range (${lowValue} - ${highValue})`;
        }
      } else if (randomValue < guessValue) {
        if (guessValue < highValue) highValue = guessValue;

        if (russianVersionCheck) {
          hint.textContent = `Слишком много, попробуй в диапазоне (${lowValue} - ${highValue})`;
        } else {
          hint.textContent = `Too bit, try numbers in the range (${lowValue} - ${highValue})`;
        }
      }

      if (countAttempt >= maxCountAttempts) {
        if (russianVersionCheck) {
          hint.textContent =
            "Попытки закончились. Это было число " + randomValue;
        } else {
          hint.textContent =
            "Your attempts is over. It's was the " + randomValue;
        }
        guessField.setAttribute("readonly", "true");
        sendButton.setAttribute("disabled", "true");
        isGameWon = true;
      }
    } else {
      if (russianVersionCheck) {
        textAnswer.textContent = "Верно";
        hint.textContent = "Наши поздравления!";
      } else {
        textAnswer.textContent = "Correct";
        hint.textContent = "Your answer is correct! Congratulations!";
      }

      answer.style.color = "green";
      answer.style.borderColor = "green";

      guessField.setAttribute("readonly", "true");
      sendButton.setAttribute("disabled", "true");
      isGameWon = true;
    }
  }
  guessField.value = "";
});

switchTheme.addEventListener("click", () => {
  if (document.body.classList.contains("blackTheme")) {
    document.body.classList.replace("blackTheme", "whiteTheme");

    // menu buttons
    for (let i = 0; i < menuButton.length; i++) {
      if (menuButton[i].classList.contains("modeButton")) {
        if (menuButton[i].id === "hardModeButton") {
          menuButton[i].style.backgroundColor = "orange";
          menuButton[i].style.border = "none";
        } else {
          menuButton[i].style.backgroundColor = "red";
          menuButton[i].style.border = "none";
        }
        menuButton[i].style.color = "black";
      } else {
        menuButton[i].style.color = "white";
        menuButton[i].style.backgroundColor = "black";
      }
    }

    // banner, which close info-text
    curtain.style.backgroundColor = "white";

    // buttons
    for (let i = 0; i < buttonForm.length; i++) {
      buttonForm[i].classList.add("black-form");
    }

    // Text with dull color
    for (let i = 0; i < textDullColor.length; i++) {
      textDullColor[i].style.color = "hsl(0 0% 15%)";
    }

    // numbers buttons
    for (let i = 0; i < numberButton.length; i++) {
      numberButton[i].classList.add("dullBlackTheme");
    }
  } else {
    document.body.classList.replace("whiteTheme", "blackTheme");

    // menu buttons
    for (let i = 0; i < menuButton.length; i++) {
      if (menuButton[i].classList.contains("modeButton")) {
        if (menuButton[i].id === "hardModeButton") {
          menuButton[i].style.borderColor = "orange";
          menuButton[i].style.color = "orange";
          menuButton[i].style.border = "3px solid hsl(25 100% 50%)";
        } else {
          menuButton[i].style.borderColor = "red";
          menuButton[i].style.color = "red";
          menuButton[i].style.border = "3px solid red";
        }
        menuButton[i].style.backgroundColor = "black";
      } else {
        menuButton[i].style.color = "black";
        menuButton[i].style.backgroundColor = "white";
      }
    }

    // banner, which close info-text
    curtain.style.backgroundColor = "black";

    //buttons
    for (let i = 0; i < buttonForm.length; i++) {
      buttonForm[i].classList.remove("black-form");
    }

    // Text with dull color
    for (let i = 0; i < textDullColor.length; i++) {
      textDullColor[i].style.color = "var(--dullWhite-color)";
    }

    // numbers buttons
    for (let i = 0; i < numberButton.length; i++) {
      numberButton[i].classList.remove("dullBlackTheme");
    }
  }
});

hardModeButton.addEventListener("click", () =>
  gameMode(isHardModeEnable, isInsaneModeEnable, "hard")
);
insaneModeButton.addEventListener("click", () =>
  gameMode(isInsaneModeEnable, isHardModeEnable, "insane")
);

numbersBlock.addEventListener("click", function (event) {
  const target = event.target;

  if (
    target.tagName === "BUTTON" &&
    target.id !== "clearOneNumber" &&
    target.id !== "clearAllNumbers"
  ) {
    guessField.value += Number(target.textContent);
  } else if (target.id === "clearAllNumbers") {
    guessField.value = "";
  } else if (target.id === "clearOneNumber") {
    guessField.value = guessField.value.slice(0, -1);
  }
});

// Play again button
playAgainButton.addEventListener("click", function () {
  location.reload(true);
});
