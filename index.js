const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const themeBtn = document.getElementById("themeBtn");
const laps = document.getElementById("laps");

let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;
let timer = null;
let isRunning = false;

function formatTime(h, m, s, ms) {
  let hh = h < 10 ? "0" + h : h;
  let mm = m < 10 ? "0" + m : m;
  let ss = s < 10 ? "0" + s : s;
  let mss = ms < 10 ? "0" + ms : ms;
  return `${hh}:${mm}:${ss}.${mss}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      milliseconds++;
      if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      display.textContent = formatTime(hours, minutes, seconds, milliseconds);
    }, 10);
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  display.textContent = "00:00:00.00";
  laps.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = "🌞";
  } else {
    themeBtn.innerHTML = "🌙";
  }
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
themeBtn.addEventListener("click", toggleTheme);

document.body.classList.add("dark");
themeBtn.innerHTML = "🌞";
