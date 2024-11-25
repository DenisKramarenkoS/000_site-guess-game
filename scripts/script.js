const sendButton = document.getElementById("sendButton");
const playAgainButton = document.getElementById("playAgainButton");
const guesses = document.getElementById("guesses");
const randomValue =
  Math.floor(Math.random() * 100) === 0 ? 1 : Math.floor(Math.random() * 100);
const textAnswer = document.getElementById("textAnswer");
const answer = document.getElementById("answer");
const hint = document.getElementById("hint");
const guessField = document.getElementById("guessField");

let checkClickAnswers = true;

let lowValue = 0;
let highValue = 100;

let isGameWon = false;
console.log(randomValue);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    if (!isGameWon) sendButton.click();
    else playAgainButton.click();
  } else if (event.code === "Digit1") guessField.value += 1;
  else if (event.code === "Digit2") guessField.value += 2;
  else if (event.code === "Digit3") guessField.value += 3;
  else if (event.code === "Digit4") guessField.value += 4;
  else if (event.code === "Digit5") guessField.value += 5;
  else if (event.code === "Digit6") guessField.value += 6;
  else if (event.code === "Digit7") guessField.value += 7;
  else if (event.code === "Digit8") guessField.value += 8;
  else if (event.code === "Digit9") guessField.value += 9;
  else if (event.code === "Digit0") guessField.value += 0;
  else if (event.code === "Backspace")
    guessField.value = guessField.value.slice(0, -1);
});

sendButton.addEventListener("click", function () {
  const guessValue = Number(guessField.value);
  guesses.textContent += " " + guessValue;
  if (randomValue !== guessValue) {
    textAnswer.textContent = "Wrong";
    answer.style.backgroundColor = "red";
    answer.style.borderColor = "darkred";
    answer.style.display = "flex";

    if (checkClickAnswers) {
      guesses.style.display = "block";
      answer.style.display = "flex";
      checkClickAnswers = false;
    }
  }
  if (guessValue < 1 || guessValue > 100) {
    hint.textContent = `Your answer is out of range, try numbers in the range (${lowValue} - ${highValue})`;

    textAnswer.textContent = "Incorrect Value";
    answer.style.backgroundColor = "yellow";
    answer.style.borderColor = "darkorange";
  } else if (randomValue > guessValue) {
    if (guessValue > lowValue) {
      lowValue = guessValue + 1;
    }

    hint.textContent = `Your answer is too low, try numbers in the range (${lowValue} - ${highValue})`;
  } else if (randomValue < guessValue) {
    if (guessValue < highValue) {
      highValue = guessValue - 1;
    }

    hint.textContent = `Your answer is too big, try numbers in the range (${lowValue} - ${highValue})`;
  } else {
    textAnswer.textContent = "Correct";
    answer.style.backgroundColor = "greenyellow";
    answer.style.borderColor = "green";

    hint.textContent = "Your answer is correct! Congratulations!";

    guessField.setAttribute("readonly", "true");
    sendButton.setAttribute("disabled", "true");
    playAgainButton.style.display = "block";
    isGameWon = true;
  }
});

playAgainButton.addEventListener("click", function () {
  location.reload(true);
});
