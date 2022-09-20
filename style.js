//Initializing variables

const startStopButton = document.getElementById("start-button");
const lapButton = document.getElementById("lap-button");
const timer = document.getElementById("timer");
const seconds = document.getElementById("seconds");
const miliseconds = document.getElementById("miliseconds");
const minutes = document.getElementById("minutes");
const lapsTable = document.getElementById("laps");
const lapsSection = document.getElementById("laps-section");

let secondsCounting = 00;
let minutesCounting = 00;
let milisecondsCounting = 00;
let intervalId;
let laps = [];
let isRunning = false;
let clickCounter = 1;

//Change this logic later using bool hhfhhtrhth
startStopButton.onclick = function () {
  if (startStopButton.innerText === "Start") {
    intervalId = setInterval(runTimer, 10);
    startStopButton.innerText = "Stop";
    isRunning = true;
  } else if (startStopButton.innerHTML === "Stop") {
    clearInterval(intervalId);
    startStopButton.innerText = "Start";
    isRunning = false;
  }
};

lapButton.onclick = function () {
  let text = "";
  laps.push(timer.innerText);
  // lapsTable.innerHTML = laps + "br";
  let tr = "<tr>";
  tr += "<td>" + "Lap " + clickCounter + " " + laps[clickCounter - 1] + "</td>";
  text += tr;
  console.log(text);
  lapsTable.innerHTML += text;
  clickCounter++;
};

console.log(laps);
//Look at other ways how to approach this.
function runTimer() {
  milisecondsCounting++;

  if (milisecondsCounting <= 9) {
    miliseconds.innerText = "0" + milisecondsCounting;
  } else if (milisecondsCounting > 9) {
    miliseconds.innerText = milisecondsCounting;
  }

  if (milisecondsCounting > 99) {
    secondsCounting++;
    seconds.innerText = "0" + secondsCounting;
    milisecondsCounting = 0;
    miliseconds.innerText = "0" + 0;
  } else if (secondsCounting > 9) {
    seconds.innerText = secondsCounting;
  }
  if (secondsCounting > 59) {
    minutesCounting++;
    minutes.innerText = "0" + minutesCounting;
    secondsCounting = 0;
    seconds.innerText = "0" + 0;
  } else if (minutesCounting > 9) {
    minutes.innerText = minutesCounting;
  }
}
