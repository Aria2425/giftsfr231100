
// Select elements
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const progressBar = document.querySelector('.progress-bar');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

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
function revealLetter() {
    // Toggle visibility of the letter image
    document.getElementById("letter-image").style.display = "block";
    // Optionally, you can hide the "Reveal Letter" button once it's clicked
    document.getElementById("reveal-button").style.display = "none";
}
