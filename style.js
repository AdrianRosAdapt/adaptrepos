//TODO : make the background of the scroll bar disappear, find the max/min of values and highlight them, finish styles - colors, fonts, margins among elements, change buttons, add pause button

//Initializing variables
const startStopButton = document.getElementById("start-button");
const lapButton = document.getElementById("lap-button");
const timer = document.getElementById("timer");
const lapsTable = document.getElementById("laps");
const lapsSection = document.getElementById("laps-section");
const resetButton = document.getElementById("reset-button");
const tableBody = document.getElementById("table-body");

let centisOfEachLap = 0;
let centis = 0;
let intervalId;
let laps = [];

let slowest_lap = 0;
let fastest_lap = 999999999;

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

function colorRowsIfLessThanTwo() {}

lapButton.onclick = function () {
  //To-Do...If time, change the logic here to use booleans instead.

  if (lapButton.innerText === "Reset") {
    reset();
  } else if (lapButton.innerText === "Lap") {
    laps.push(centisOfEachLap);
    createRow(centisOfEachLap, numberOfRows);
    numberOfRows++;

    if (laps.length == 2) {
      lapsTable.lastElementChild.childNodes[
        2 - getSlowestLap(laps)
      ].classList.add("red");

      lapsTable.lastElementChild.childNodes[
        2 - getFastestLap(laps)
      ].classList.add("green");
    } else if (laps.length > 2) {
      if (slowest_lap < centisOfEachLap) {
        slowest_lap = centisOfEachLap;
        document.getElementsByClassName("red")[0].classList.remove("red");
        document
          .getElementById("laps")
          .lastElementChild.children[1].classList.add("red");
      } else if (fastest_lap > centisOfEachLap) {
        fastest_lap = centisOfEachLap;
        document.getElementsByClassName("green")[0].classList.remove("green");
        document
          .getElementById("laps")
          .lastElementChild.children[1].classList.add("green");
      }
    }
    centisOfEachLap = 0;
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
  numberOfRows = 1;
  tableBody.innerText = "";
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
  fastest_lap = Math.min(...lapsList);
  let fastestLap = lapsList.indexOf(fastest_lap);
  return fastestLap;

  // const fastestRow = document.querySelectorAll();
  console.log(fastestRow);
}

function getSlowestLap(lapsList) {
  slowest_lap = Math.max(...lapsList);
  let slowestLap = lapsList.indexOf(slowest_lap);
  return slowestLap;
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
  //const parsedSeconds = parseTime(centisOfEachLap);
  timer.innerText = newTime;
  centisOfEachLap++;
  centis++;
  // if (numberOfRows === 1) {
  //   lapsTableRow = lapsTable.insertRow(0);
  //   lapsTableLapCell = lapsTableRow.insertCell(0);
  //   lapsTableTimerCell = lapsTableRow.insertCell(1);
  //   lapsTableLapCell.innerText = `Lap ${numberOfRows++}`;
  // }
  lapsTableTimerCell.innerText = `${parseTime(centisOfEachLap)}`;
}
