// Setting up the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game variables
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 4;  // Slightly faster speed
let ballSpeedY = -4; // Slightly faster speed
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;

// Controls
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Function to handle key presses
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff6347";
    ctx.fill();
    ctx.closePath();
}

// Function to detect ball and paddle collision
function ballPaddleCollision() {
    if (ballY + ballRadius > canvas.height - paddleHeight && ballY + ballRadius < canvas.height) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY; // Reverse the ball's Y direction (bounce)
            score++; // Increase the score
        }
    }
}

// Function to move the paddle
function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

// Function to update the game
function updateGame() {
    // Clear the canvas for each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball and paddle
    drawBall();
    drawPaddle();

    // Check if the ball hits the walls
    if (ballX + ballSpeedX > canvas.width - ballRadius || ballX + ballSpeedX < ballRadius) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }
    else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        // If ball touches the bottom and misses the paddle
        if (ballX < paddleX || ballX > paddleX + paddleWidth) {
            gameOver();
        } else {
            ballSpeedY = -ballSpeedY;
        }
    }

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Move the paddle
    movePaddle();

    // Check for ball-paddle collision
    ballPaddleCollision();

    // Display the score
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: " + score, 8, 20);

    // Call updateGame() to refresh the screen and keep the game running
    requestAnimationFrame(updateGame);
}

// Game Over function
function gameOver() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverScreen').classList.remove('hidden');
}

// Restart the game
document.getElementById('restartButton').addEventListener('click', function () {
    score = 0;
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballSpeedX = 4;  // Reset to slightly faster speed
    ballSpeedY = -4; // Reset to slightly faster speed
    paddleX = (canvas.width - paddleWidth) / 2;
    document.getElementById('gameOverScreen').classList.add('hidden');
    updateGame();
});

// Start the game
updateGame();
