//TODO : make the background of the scroll bar disappear, find the max/min of values and highlight them, finish styles - colors, fonts, margins among elements, change buttons, add pause button

//Initializing variables
const startStopButton = document.getElementById("start-button");
const lapButton = document.getElementById("lap-button");
const timer = document.getElementById("timer");
const lapsTable = document.getElementById("laps");
const lapsSection = document.getElementById("laps-section");
const resetButton = document.getElementById("reset-button");
const tableBody = document.getElementById("table-body");
let laps = [];

let centisOfEachLap = 0;
let centis = 0;
let intervalId;
let slowest_lap = 0;
let fastest_lap = Number.MAX_VALUE;
let isRunning = false;
let numberOfRows = 1;
let lapsTableRow;
let lapsTableLapCell;
let lapsTableTimerCell;

startStopButton.onclick = function () {
  if (!isRunning) {
    if (numberOfRows === 1) {
      createRow(centisOfEachLap, numberOfRows);
      numberOfRows++;
    }
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
  //To-Do...If time, change the logic here to use booleans instead.

  if (lapButton.innerText === "Reset") {
    reset();
  } else if (lapButton.innerText === "Lap") {
    laps = [...laps, centisOfEachLap];
    //laps.push(centisOfEachLap);
    replaceROw();
    createRow(centisOfEachLap);
    numberOfRows++;
    if (laps.length == 2) {
      assessFirstTwoRows();
    } else if (laps.length > 2) {
      assessFastestSlowestLap();
    }
    centisOfEachLap = 0;
  }
};

// Resets timer, stopwatch, and laps table.
function reset() {
  lapButton.innerText = "Lap";
  centis = 0;
  centisOfEachLap = 0;
  const resetTime = parseTime(centis);
  timer.innerText = resetTime;
  laps = [];
  isRunning = false;
  numberOfRows = 1;
  tableBody.innerText = "";
  createInitialRows();
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

// Gets the index of the fastest lap.

function getFastestLap(lapsList) {
  fastest_lap = Math.min(...lapsList);
  const fastestLap = lapsList.indexOf(fastest_lap);
  return fastestLap;
}

//Gets the index of the slowest lap.

function getSlowestLap(lapsList) {
  slowest_lap = Math.max(...lapsList);
  const slowestLap = lapsList.indexOf(slowest_lap);
  return slowestLap;
}

//Creates lap rows.

function createRow(number) {
  lapsTableRow = lapsTable.insertRow(0);
  lapsTableLapCell = lapsTableRow.insertCell(0);
  lapsTableTimerCell = lapsTableRow.insertCell(1);
  lapsTableLapCell.innerText = `Lap ${numberOfRows}`;
  lapsTableTimerCell.innerText = `${parseTime(number)}`;
}

//Function to pass into the setInterval.

function runTimer() {
  const newTime = parseTime(centis);
  timer.innerText = newTime;
  centisOfEachLap++;
  centis++;
  lapsTableTimerCell.innerText = `${parseTime(centisOfEachLap)}`;
}

function assessFirstTwoRows() {
  tableBody.children[2 - getSlowestLap(laps)].classList.add("slowest-lap");

  tableBody.children[2 - getFastestLap(laps)].classList.add("fastest-lap");
}

//Keeps track of the fastest / slowest laps. And based on the current lap time, assignes / removes a class. Or does nothing if neither condition is met.

function assessFastestSlowestLap() {
  if (slowest_lap < centisOfEachLap) {
    slowest_lap = centisOfEachLap;
    document
      .getElementsByClassName("slowest-lap")[0]
      .classList.remove("slowest-lap");
    tableBody.children[1].classList.add("slowest-lap");
  } else if (fastest_lap > centisOfEachLap) {
    fastest_lap = centisOfEachLap;
    document
      .getElementsByClassName("fastest-lap")[0]
      .classList.remove("fastest-lap");
    tableBody.children[1].classList.add("fastest-lap");
  }
}

function replaceROw() {
  if (numberOfRows < 8) {
    tableBody.lastElementChild.remove();
  }
}

function createInitialRows() {
  for (let number = 1; number < 7; number++) {
    lapsTableRow = lapsTable.insertRow(0);
    lapsTableLapCell = lapsTableRow.insertCell(0);
    lapsTableTimerCell = lapsTableRow.insertCell(1);
    lapsTableLapCell.classList.add("initial-table-data");
  }
}
