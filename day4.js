function toggleImages() {
    const closedImage = document.getElementById('closed-image');
    const openImage = document.getElementById('open-image');
    const revealButton = document.getElementById('reveal-button');

    // Toggle images
    if (openImage.style.display === 'none') {
        closedImage.style.display = 'none';
        openImage.style.display = 'block';
        revealButton.style.display = 'inline-block';
    } else {
        closedImage.style.display = 'block';
        openImage.style.display = 'none';
        revealButton.style.display = 'none';
    }
}

function revealLetter() {
    // URL of the image to display
    const imageUrl = 'path-to-your-image.jpg';

    // Open a new tab with the image
    const newTab = window.open();
    newTab.document.write(`
        <html>
        <head>
            <title>Revealed Letter</title>
            <style>
                body {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: black;
                }
                img {
                    max-width: 100%;
                    max-height: 100%;
                    border: 5px solid white;
                }
            </style>
        </head>
        <body>
            <img src="${imageUrl}" alt="Revealed Letter">
        </body>
        </html>
    `);
    newTab.document.close();
}
// Select elements
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const progressBar = document.querySelector('.progress-bar');
const prevButton = document.getElementById('prevButton');
const quiznextButton = document.getElementById('nextButton');

// Play Audio
playButton.addEventListener('click', () => {
    audioPlayer.play();
    playButton.style.display = 'none'; // Hide Play Button
    pauseButton.style.display = 'inline-block'; // Show Pause Button
});

// Pause Audio
pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
    pauseButton.style.display = 'none'; // Hide Pause Button
    playButton.style.display = 'inline-block'; // Show Play Button
});

// Update Progress Bar
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

// Seek Audio
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
});

// Previous Button - Rewind by 10 seconds
prevButton.addEventListener('click', () => {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
});

// Next Button - Fast-forward by 10 seconds
nextButton.addEventListener('click', () => {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
});

// Optional: Reset Controls when Audio Ends
audioPlayer.addEventListener('ended', () => {
    pauseButton.style.display = 'none'; // Hide Pause Button
    playButton.style.display = 'inline-block'; // Show Play Button
    progressBar.value = 0; // Reset Progress Bar
});
// Declare DOM elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Questions Array
const questions = [
    { question: "What is my favorite color?", options: ["Pink", "Blue", "Green"], correct: 0 },
    { question: "What is my favorite animal?", options: ["Cat", "Dog", "Rabbit"], correct: 1 },
    // Add more questions...
];

// Load the first question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; // Clear previous options

    // Create buttons for each option
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.className = "cute-button";
        optionButton.onclick = () => {
            if (index === currentQuestion.correct) score++;
            nextButton.disabled = false; // Enable next button after a selection
        };
        optionsContainer.appendChild(optionButton);
    });

    // Update next button text for the last question
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Submit";
    }

    nextButton.disabled = true; // Disable the next button initially
}

// Handle next button click
nextButton.onclick = () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
};

// Show results based on score
function showResults() {
    const resultText = document.createElement("p");
    if (score <= 5) {
        resultText.textContent = "You scored low. Better luck next time!";
    } else if (score <= 10) {
        resultText.textContent = "Good effort! You're getting there.";
    } else {
        resultText.textContent = "Amazing! You know me so well!";
    }

    optionsContainer.innerHTML = ""; // Clear previous content
    optionsContainer.appendChild(resultText);
}

// Start the quiz
loadQuestion();
