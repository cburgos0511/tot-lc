const startButton = document.getElementById("start-btn");
const overlay = document.getElementById("countdownOverlay");
const countDownText = document.getElementById("countdownText");
const mainScreen = document.getElementById("main-screen");
const startScreen = document.getElementById("start-screen");

let countdownInterval;

startButton.addEventListener("click", () => {
  clearInterval(countdownInterval);

  overlay.style.display = "flex";
  let count = 3;
  countDownText.textContent = count;

  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countDownText.textContent = count;
    } else {
      clearInterval(countdownInterval);
      overlay.style.display = "none";
      mainScreen.style.display = "none";
      startScreen.style.display = "flex";
    }
  }, 1000);
});
