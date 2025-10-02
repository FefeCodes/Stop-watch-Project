// Stopwatch variables
let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;

let timer = null; // stores setInterval reference
let isRunning = false; // prevents multiple timers

// DOM Elements
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const themeBtn = document.getElementById("themeBtn");
const lapsList = document.getElementById("laps");

// Format time values to always show 2 digits
function formatTime(h, m, s, ms) {
  const hh = h < 10 ? "0" + h : h;
  const mm = m < 10 ? "0" + m : m;
  const ss = s < 10 ? "0" + s : s;
  const mss = ms < 10 ? "0" + ms : ms;
  return `${hh}:${mm}:${ss}.${mss}`;
}

//Start the stopwatch
//Uses setInterval with 10ms steps

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      milliseconds++;

      // Handle rollover
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

      // Update display
      display.textContent = formatTime(hours, minutes, seconds, milliseconds);
    }, 10);
  }
}

//Stop / pause the stopwatch

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

//Reset stopwatch to zero and clear laps

function resetTimer() {
  clearInterval(timer);
  isRunning = false;

  // Reset time variables
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  // Reset UI
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
}

//Record a lap (only if stopwatch is running)

function recordLap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    lapsList.appendChild(li);
  }
}

/*
 Toggle between light and dark themes
 - Dark mode → 🌞 button (white background, black icon)
 - Light mode → 🌙 button (black background, white icon)
 */
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "🌞"; // Show sun icon
  } else {
    themeBtn.textContent = "🌙"; // Show moon icon
  }
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
themeBtn.addEventListener("click", toggleTheme);

// Default theme: Dark
document.body.classList.add("dark");
themeBtn.textContent = "🌞";
