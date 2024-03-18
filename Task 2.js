let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

function startStop() {
  const startStopBtn = document.getElementById("startStopBtn");
  if (!isRunning) {
    startStopBtn.textContent = "Stop";
    startStopBtn.classList.remove("start");
    startStopBtn.classList.add("stop");
    startTime = Date.now() - (lapCounter > 1 ? lapTimes[lapTimes.length - 1] : 0);
    timer = setInterval(updateDisplay, 10);
    isRunning = true;
  } else {
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("stop");
    startStopBtn.classList.add("start");
    clearInterval(timer);
    isRunning = false;
  }
}

function lap() {
  if (!isRunning) return;
  const display = document.getElementById("display");
  const lapTime = Date.now() - startTime;
  const lapFormatted = formatTime(lapTime);
  const lapsList = document.getElementById("lapsList");
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapCounter}: ${lapFormatted}`;
  lapsList.prepend(lapItem);
  lapCounter++;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  lapCounter = 1;
  const startStopBtn = document.getElementById("startStopBtn");
  startStopBtn.textContent = "Start";
  startStopBtn.classList.remove("stop");
  startStopBtn.classList.add("start");
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("lapsList").innerHTML = "";
}

function updateDisplay() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const millisecondsFormatted = (milliseconds % 1000).toString().slice(0, 2).padStart(2, "0");
  return `${minutes}:${seconds}:${millisecondsFormatted}`;
}
