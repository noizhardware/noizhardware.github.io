var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;
function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
// change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.

    paused = 0;
    running = 1;
timerDisplay.style.background = "#2E86AB"; //active timer color
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "white";
    startTimerButton.classList.add('lighter');
    pauseTimerButton.classList.remove('lighter');
    startTimerButton.style.cursor = "auto";
    pauseTimerButton.style.cursor = "pointer";
  }
}
function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
    timerDisplay.style.background = "#A1A1A1";
    timerDisplay.style.color = "white";
    timerDisplay.style.cursor = "pointer";
    startTimerButton.classList.remove('lighter');
    pauseTimerButton.classList.add('lighter');
    startTimerButton.style.cursor = "pointer";
    pauseTimerButton.style.cursor = "auto";
  } else {
// if the timer was already paused, when they click pause again, start the timer again
startTimer();
  }
}
function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  timerDisplay.innerHTML = 'Ready to F L O O W';
  timerDisplay.style.background = "#A1A1A1";
  timerDisplay.style.color = "white";
  timerDisplay.style.cursor = "pointer";
  startTimerButton.classList.remove('lighter');
  pauseTimerButton.classList.remove('lighter');
  startTimerButton.style.cursor = "pointer";
  pauseTimerButton.style.cursor = "auto";
}
function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime; // difference is in milliseconds!
  } else {
    difference =  updatedTime - startTime;
  }
  var floowPhases = difference / 28800000;
  timerDisplay.innerHTML = fixDec(floowPhases, 7);
}

function fixDec(value, decimals) {
    return Number(value).toFixed(decimals);
}

function spacebar(){
    if(!running){
        startTimer();
    } else {
        pauseTimer();
    }
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32 && !(checkInputFocus("blabla"))){ // spacebar press, when there is no focus on any input field
    //if(e.keyCode == 32){
        spacebar();
    }
}

function checkInputFocus(myclass){
    var isFocused = new Boolean(false);
    var x = document.activeElement.tagName;
    if(x == "INPUT"){
        isFocused = true;
    } else{
        isFocused = false;
    }
    console.log(isFocused);
    return isFocused;
}
