// Canvas and context setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

// Game constants
const snakeBlock = 20;
const snakeSpeed = 15;
let score = 0;

// Colors
const PASTEL_RED = "#FFB6C1";
const PASTEL_GREEN = "#BAFFC9";
const WHITE = "#FFFFFF";
const BLACK = "#000000";

// Snake and food variables
let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
let direction = { x: 0, y: 0 };
let food = {
  x: Math.floor((Math.random() * canvas.width) / snakeBlock) * snakeBlock,
  y: Math.floor((Math.random() * canvas.height) / snakeBlock) * snakeBlock,
};
let gameRunning = true;

// Game over message elements
const gameOverMessage = document.getElementById("gameOverMessage");
const playAgainButton = document.getElementById("playAgainButton");
const quitButton = document.getElementById("quitButton");

// Draw food
function drawFood() {
  ctx.fillStyle = PASTEL_RED;
  ctx.fillRect(food.x, food.y, snakeBlock, snakeBlock);
}

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = PASTEL_GREEN;
    ctx.fillRect(segment.x, segment.y, snakeBlock, snakeBlock);
  });
}

// Move snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x * snakeBlock, y: snake[0].y + direction.y * snakeBlock };
  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * canvas.width) / snakeBlock) * snakeBlock,
      y: Math.floor((Math.random() * canvas.height) / snakeBlock) * snakeBlock,
    };
  } else {
    snake.pop(); // Remove the tail
  }
}

// Check collisions
function checkCollisions() {
  const head = snake[0];

  // Wall collision
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    gameRunning = false;
  }

  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameRunning = false;
    }
  }
}

// Display score
function displayScore() {
  ctx.fillStyle = WHITE;
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Game over
function gameOver() {
  gameOverMessage.style.display = "block";
}

// Game loop
function gameLoop() {
  if (!gameRunning) {
    gameOver();
    return;
  }

  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawFood();
  drawSnake();
  moveSnake();
  checkCollisions();
  displayScore();

  setTimeout(gameLoop, 1000 / snakeSpeed);
}

// Event listeners for keypress
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Play again button
playAgainButton.addEventListener("click", () => {
  gameOverMessage.style.display = "none";
  snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
  direction = { x: 0, y: 0 };
  food = {
    x: Math.floor((Math.random() * canvas.width) / snakeBlock) * snakeBlock,
    y: Math.floor((Math.random() * canvas.height) / snakeBlock) * snakeBlock,
  };
  score = 0;
  gameRunning = true;
  gameLoop();
});

// Quit button
quitButton.addEventListener("click", () => {
  window.close();
});

// Start game loop
gameLoop();
