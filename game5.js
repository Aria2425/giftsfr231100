const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

const words = ["python", "hangman", "programming", "interface", "tkinter", "challenge"];
let word, guesses, attemptsLeft;

// DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const attemptsDisplay = document.getElementById("attemptsDisplay");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const resetButton = document.getElementById("resetButton");

// Initialize the game
function initGame() {
  word = words[Math.floor(Math.random() * words.length)];
  guesses = [];
  attemptsLeft = 6;

  wordDisplay.textContent = displayWord();
  attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
  drawHangman();
}

// Display the current state of the word
function displayWord() {
  return word
    .split("")
    .map((letter) => (guesses.includes(letter) ? letter : "_"))
    .join(" ");
}

// Make a guess
function makeGuess() {
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (guess.length !== 1 || !/^[a-z]$/.test(guess)) {
    alert("Please enter a valid single letter.");
    return;
  }

  if (guesses.includes(guess)) {
    alert("You already guessed that letter.");
    return;
  }

  guesses.push(guess);

  if (!word.includes(guess)) {
    attemptsLeft--;
  }

  wordDisplay.textContent = displayWord();
  attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
  drawHangman();

  if (!wordDisplay.textContent.includes("_")) {
    alert("Congratulations! You guessed the word!");
    initGame();
  } else if (attemptsLeft <= 0) {
    alert(`Game Over! The word was: ${word}`);
    initGame();
  }
}

// Draw the hangman
function drawHangman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Base
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  // Draw hangman base
  ctx.beginPath();
  ctx.moveTo(50, 180); // Base
  ctx.lineTo(150, 180);
  ctx.moveTo(100, 20); // Pole
  ctx.lineTo(100, 180);
  ctx.moveTo(100, 20); // Top
  ctx.lineTo(180, 20);
  ctx.moveTo(180, 20); // Noose
  ctx.lineTo(180, 40);
  ctx.stroke();

  // Draw hangman parts based on attempts left
  if (attemptsLeft < 6) {
    ctx.beginPath();
    ctx.arc(180, 60, 20, 0, Math.PI * 2); // Head
    ctx.stroke();
  }
  if (attemptsLeft < 5) {
    ctx.beginPath();
    ctx.moveTo(180, 80); // Body
    ctx.lineTo(180, 130);
    ctx.stroke();
  }
  if (attemptsLeft < 4) {
    ctx.beginPath();
    ctx.moveTo(180, 90); // Left Arm
    ctx.lineTo(160, 110);
    ctx.stroke();
  }
  if (attemptsLeft < 3) {
    ctx.beginPath();
    ctx.moveTo(180, 90); // Right Arm
    ctx.lineTo(200, 110);
    ctx.stroke();
  }
  if (attemptsLeft < 2) {
    ctx.beginPath();
    ctx.moveTo(180, 130); // Left Leg
    ctx.lineTo(160, 160);
    ctx.stroke();
  }
  if (attemptsLeft < 1) {
    ctx.beginPath();
    ctx.moveTo(180, 130); // Right Leg
    ctx.lineTo(200, 160);
    ctx.stroke();
  }
}

// Event listeners
guessButton.addEventListener("click", makeGuess);
resetButton.addEventListener("click", initGame);
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") makeGuess();
});

// Start the game
initGame();