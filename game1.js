// Constants
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const OBSTACLE_WIDTH = 50;
const OBSTACLE_HEIGHT = 50;
const OBSTACLE_SPEED = 5;
const PLAYER_SPEED = 5;
const MIN_OBSTACLES = 4;
let score = 0;

// Colors
const PASTEL_PINK = '#FFB6C1';
const PASTEL_PURPLE = '#DDA0DD';
const DARK_PASTEL_PINK = '#FF69B4';

// Create and style canvas container
const canvasContainer = document.createElement('div');
canvasContainer.style.display = 'flex';
canvasContainer.style.alignItems = 'center';
canvasContainer.style.justifyContent = 'center';
canvasContainer.style.height = '100vh';
canvasContainer.style.backgroundColor = 'black';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.appendChild(canvasContainer);

// Create canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500; // Square canvas size
canvas.height = 500; // Square canvas size
canvas.style.border = '2px solid white';
canvasContainer.appendChild(canvas);

// Game Over Menu
const gameOverMenu = document.createElement('div');
gameOverMenu.style.position = 'fixed';
gameOverMenu.style.top = '50%';
gameOverMenu.style.left = '50%';
gameOverMenu.style.transform = 'translate(-50%, -50%)';
gameOverMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
gameOverMenu.style.color = 'white';
gameOverMenu.style.padding = '20px';
gameOverMenu.style.borderRadius = '10px';
gameOverMenu.style.textAlign = 'center';
gameOverMenu.style.display = 'none';

const gameOverText = document.createElement('h1');
gameOverText.textContent = 'Game Over';
gameOverMenu.appendChild(gameOverText);

const tryAgainButton = document.createElement('button');
tryAgainButton.textContent = 'Try Again';
tryAgainButton.style.margin = '10px';
tryAgainButton.style.padding = '10px 20px';
tryAgainButton.style.backgroundColor = PASTEL_PINK;
tryAgainButton.style.border = 'none';
tryAgainButton.style.borderRadius = '5px';
tryAgainButton.style.fontSize = '16px';
tryAgainButton.style.cursor = 'pointer';
tryAgainButton.style.transition = 'transform 0.2s ease-in-out';
gameOverMenu.appendChild(tryAgainButton);

const quitButton = document.createElement('button');
quitButton.textContent = 'Quit';
quitButton.style.margin = '10px';
quitButton.style.padding = '10px 20px';
quitButton.style.backgroundColor = PASTEL_PINK;
quitButton.style.border = 'none';
quitButton.style.borderRadius = '5px';
quitButton.style.fontSize = '16px';
quitButton.style.cursor = 'pointer';
quitButton.style.transition = 'transform 0.2s ease-in-out';
gameOverMenu.appendChild(quitButton);

document.body.appendChild(gameOverMenu);

// Add button hover effect
[tryAgainButton, quitButton].forEach(button => {
    button.addEventListener('mouseover', () => button.style.transform = 'scale(1.1)');
    button.addEventListener('mouseout', () => button.style.transform = 'scale(1)');
});

// Player class
class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.color = PASTEL_PINK;
        this.speed = PLAYER_SPEED;
        this.x = canvas.width / 2 - this.width / 2; // Center horizontally
        this.y = canvas.height - this.height - 10; // Positioned above the bottom edge
    }

    move(keysPressed) {
        if (keysPressed['ArrowLeft'] && this.x > 0) {
            this.x -= this.speed;
        }
        if (keysPressed['ArrowRight'] && this.x + this.width < canvas.width) {
            this.x += this.speed;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Obstacle class
class Obstacle {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width - OBSTACLE_WIDTH));
        this.y = 0;
        this.width = OBSTACLE_WIDTH;
        this.height = OBSTACLE_HEIGHT;
        this.color = PASTEL_PURPLE;
        this.speed = OBSTACLE_SPEED;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Game Over function
function gameOver() {
    gameOverMenu.style.display = 'block';
    clearInterval(gameInterval);
}

// Restart the game
function restartGame() {
    gameOverMenu.style.display = 'none';
    score = 0;
    obstacles = [];
    player = new Player();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 1000 / 60);
}

// Quit the game
function quitGame() {
    window.location.reload();
}

// Main game loop
let player = new Player();
let obstacles = [];
let gameInterval;

// Key handling
let keysPressed = {};
window.addEventListener('keydown', (e) => keysPressed[e.key] = true);
window.addEventListener('keyup', (e) => delete keysPressed[e.key]);

function gameLoop() {
    while (obstacles.length < MIN_OBSTACLES) {
        obstacles.push(new Obstacle());
    }

    if (Math.random() < 0.03) {
        obstacles.push(new Obstacle());
    }

    player.move(keysPressed);

    for (let obstacle of obstacles) {
        obstacle.move();
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            gameOver();
            return;
        }
    }

    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
    score++;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.draw();
    obstacles.forEach(obstacle => obstacle.draw());

    ctx.fillStyle = DARK_PASTEL_PINK;
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 40);
}

// Button click listeners
tryAgainButton.addEventListener('click', restartGame);
quitButton.addEventListener('click', quitGame);

// Start game loop
gameInterval = setInterval(gameLoop, 1000 / 60);
