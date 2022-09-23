//TODO : make the background of the scroll bar disappear, find the max/min of values and highlight them, finish styles - colors, fonts, margins among elements, change buttons, add pause button

//Initializing variables
const startStopButton = document.getElementById("start-button");
const lapButton = document.getElementById("lap-button");
const timer = document.getElementById("timer");
const lapsTable = document.getElementById("laps");
const lapsSection = document.getElementById("laps-section");
const resetButton = document.getElementById("reset-button");

let centisOfEachLap = 0;
let centis = 0;
let intervalId;
let laps = [];

let isRunning = false;
let clickCounter = 1;
let lapsTableRow;
let lapsTableLapCell;
let lapsTableTimerCell;

startStopButton.onclick = function () {
  if (!isRunning) {
    intervalId = setInterval(runTimer, 10);
    startStopButton.innerText = "Stop";
    lapButton.innerText = "Lap";
    lapButton.classList.replace("lap", "active-lap-button");
    isRunning = true;
  } else if (isRunning) {
    clearInterval(intervalId);
    startStopButton.innerText = "Start";
    lapButton.innerText = "Reset";
    isRunning = false;
  }
};

lapButton.onclick = function () {
  if (lapButton.innerText === "Reset") {
    reset();
  } else if (lapButton.innerText === "Lap") {
    laps.push(centisOfEachLap);
    replaceRows();
    //   createRow(centisOfEachLap, clickCounter);
    //   clickCounter++;
    //   centisOfEachLap = 0;
    //   console.log(getFastestLap(laps));
    //   console.log(getSlowestLap(laps));
    // }
  }
};

// Resets timer, stopwatch, and laps table.
function reset() {
  centis = 0;
  centisOfEachLap = 0;
  const resetTime = parseTime(centis);
  timer.innerText = resetTime;
  laps = [];
  isRunning = false;
}

//Takes centi seconds and calculates individual bits of the timer.
function parseTime(centis) {
  let seconds = Math.floor(centis / 100);

  // console.log(seconds);
  let actualSeconds = seconds % 60;
  //console.log(actualSeconds);
  let minutes = Math.floor(seconds / 60);
  //console.log(minutes);
  let milis = centis % 100;
  return `${minutes.toString().padStart(2, "0")}: ${actualSeconds
    .toString()
    .padStart(2, "0")}.${milis.toString().padStart(2, "0")} `;
}

//gets the fastest lap in the array
function getFastestLap(lapsList) {
  let fastestLap = lapsList.indexOf(Math.min(...lapsList));
  return fastestLap;
}
function getSlowestLap(lapsList) {
  let slowestLap = lapsList.indexOf(Math.max(...lapsList));
  return slowestLap;
}
// i dont know what I am even doing
function replaceRows() {
  let i = 0;
  const numberOfRows = 6;
  let individualLap = lapsTable.rows(i);
  if (numberOfRows >= 0) {
    individualLap.innerText = "Hello";
    i++;
  } else {
    createRow();
  }
}
//Creates lap rows.
function createRow(number, rowCounter) {
  lapsTableRow = lapsTable.insertRow(0);
  lapsTableLapCell = lapsTableRow.insertCell(0);
  lapsTableTimerCell = lapsTableRow.insertCell(1);
  lapsTableLapCell.innerText = `Lap ${rowCounter}`;
  lapsTableTimerCell.innerText = `${parseTime(number)}`;
}
//Creates a lap and formats it.
// function createLap(laps) {
//   let i = 0;
//   const tableBody = document.getElementById("laps-data");
//   let individualLaps = "";
//   for (let lap of laps) {
//     let formatted = parseTime(laps[i]);
//     individualLaps = `${formatted}`;
//     //individualLaps += `<tr><td>Lap${i + 1}</td><td> ${formatted}</td></tr>`;
//     i++;
//   }
//   return individualLaps;
// }

//Function to pass into the setInterval.
function runTimer() {
  const newTime = parseTime(centis);
  const parsedSeconds = parseTime(centisOfEachLap);
  timer.innerText = newTime;
  centisOfEachLap++;
  centis++;
  if (clickCounter === 1) {
    lapsTableRow = lapsTable.insertRow(0);
    lapsTableLapCell = lapsTableRow.insertCell(0);
    lapsTableTimerCell = lapsTableRow.insertCell(1);
    lapsTableLapCell.innerText = `Lap ${clickCounter++}`;
  }
  lapsTableTimerCell.innerText = `${parseTime(centisOfEachLap)}`;
}
