document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  const playMusicBtn = document.getElementById("playMusicBtn");
  const audio = document.getElementById("birthdayMusic");
  let candles = [];

  // Add candles
  function updateCandleCount() {
    candleCountDisplay.textContent = candles.length;
  }

  function addCandle(left, top) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
    updateCandleCount();

    // Play music when adding the first candle
    if (candles.length === 1 && audio.paused) {
      audio.play();
      triggerConfetti();
      endlessConfetti();
    }
  }

  // Add candles when clicking the cake
  cake.addEventListener("click", function (event) {
    const rect = cake.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  // Button to manually play music
  playMusicBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      triggerConfetti();
      endlessConfetti();
    }
  });

  // Confetti effects
  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function endlessConfetti() {
    setInterval(function () {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0 },
      });
    }, 1000);
  }

  // Fade transition for navigation
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = href;
        }, 600);
      }
    });
  });
});
