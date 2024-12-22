document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const candles = document.querySelectorAll('.candle');

  function createSteam(candle) {
    const steam = document.createElement('div');
    steam.classList.add('steam');
    candle.appendChild(steam);

    // Remove steam after animation completes
    setTimeout(() => {
      steam.remove();
    }, 3000); // Steam lasts 1.5 seconds
  }

  function flickerCandle(candle) {
    // Flicker effect only when blow strength is below the threshold
    candle.classList.add('flickering');
    setTimeout(() => {
      candle.classList.remove('flickering');
    }, 200); // Flicker for 200ms
  }

  function checkBlow(strength) {
    console.log('Blow strength:', strength); // Debugging: Log detected strength

    if (strength > 0.08) { // Very hard to blow out (high sensitivity)
      // Start the process of blowing out the candle if blow strength is above threshold
      candles.forEach(candle => {
        if (!candle.classList.contains('blown-out') && !candle.classList.contains('flickering')) {
          flickerCandle(candle);
        }
      });

      // After reaching the required blow strength, blow out the candle
      if (document.querySelectorAll('.flickering').length > 0) {
        candles.forEach(candle => {
          if (!candle.classList.contains('blown-out') && !candle.classList.contains('flickering')) {
            flickerCandle(candle);
          }
        });
      }

      // After all candles are blown out
      if (document.querySelectorAll('.blown-out').length === candles.length) {
        startButton.textContent = 'Candles Blown Out!';
        startButton.disabled = true;
      }
    }
  }

  function startListening() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        console.log('Microphone connected'); // Confirm microphone access
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectBlow() {
          analyser.getByteTimeDomainData(dataArray);

          // Calculate audio strength
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += Math.abs(dataArray[i] - 128);
          }
          const strength = sum / dataArray.length / 128; // Normalize to 0-1

          checkBlow(strength);
          requestAnimationFrame(detectBlow);
        }
        detectBlow();
      })
      .catch(error => {
        console.error('Microphone error:', error);
        alert('Microphone access is required to blow out the candles.');
      });
  }

  startButton.addEventListener('click', () => {
    console.log('Start button clicked'); // Debug: Log button click
    startListening();
    startButton.textContent = 'Blow into the mic!';
  });
});
