'use strict'
// shit to do conditional loading (to include in .html)
// if (typeof startTime === 'undefined') {
//         document.write('<script src="js/libs/jquery.tooltip.min.js">\x3C/script>');
//     }

const icoInactive = "grain.png";
const icoActive = "grain_orange.png";

function changeIcon(icon) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = './' + icon;
    document.getElementsByTagName('head')[0].appendChild(link);
}

var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;

var pomoDisplay = document.querySelector('.pomo');
var pomoStartTime;
var pomoUpdatedTime;
var pomoDifference;
var pomotInterval;
var pomoVerify;
var pomoSavedTime;
var pomoPaused = 0;
var pomoRunning = 0;
var pomoRestmode = 0; // start in WORK mode
const POMOWORK = 0.25;
const POMOREST = 0.05;
// const POMOWORK = 0.001;
// const POMOREST = 0.001;

function startTimer(){
  if(!running){
       changeIcon(icoActive);
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.
    paused = 0;
    running = 1;
    timerDisplay.style.background = "#FF6700"; //active timer color
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "white";
     }else{
     pauseTimer();
     }
}
function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
       changeIcon(icoInactive);
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
    timerDisplay.style.background = "#A1A1A1";
    timerDisplay.style.color = "white";
    timerDisplay.style.cursor = "pointer";
  } else {
// if the timer was already paused, when they click pause again, start the timer again
startTimer();
  }
}

function pomoStart(){
     console.log("restmode: " + pomoRestmode);
     if(!pomoRunning){
          if(!pomoRestmode){
               if(!running){startTimer();}}
          pomoRunning = 1;
          console.log("pomo started");
          bip(pomoRestmode ? 2 : 3);
          // if(!running){startTimer();}
          pomoStartTime = new Date().getTime();
          pomotInterval = setInterval(getShowPomo, 1); // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.
          //pomoVerify = setInterval(pomoWork, 1);
          pomoPaused = 0;
          pomoRunning = 1;
          var activeBG = pomoRestmode ? "green" : "red"; // RED = workmode / GREEN = restmode
          pomoDisplay.style.background = activeBG; //active pomo color
          pomoDisplay.style.cursor = "auto";
          pomoDisplay.style.color = "white";
     }else{
          pomoPause();
     }
}

function pomoPause(){
     console.log("pomopause");
  if (!pomoDifference){
       console.log("no pomoDifference detected!");
    // if pomo never started, don't allow the pause function to do anything
} else if (!pomoPaused) {
     console.log("not pomopaused");
     if(!pomoRestmode){pauseTimer();}
    clearInterval(pomotInterval);
    pomoSavedTime = pomoDifference;
    pomoPaused = 1;
    pomoRunning = 0;
    var pausedFont = pomoRestmode ? "green" : "red";
    pomoDisplay.style.background = "#A1A1A1"; // paused pomo color
    pomoDisplay.style.color = pausedFont;
    pomoDisplay.style.cursor = "pointer";
  } else {
       console.log("already pomopaused, pomostarting now");
// if the pomo was already paused, when they click pause again, start the pomo again
pomoStart();
  }
}

function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime; // difference is in milliseconds!
  } else {
    difference =  updatedTime - startTime;
  }
  //var floowPhases = difference / 28800000;
  //var hourz =  fixDec((difference / 3600000), 7);
  //timerDisplay.innerHTML = fixDec(floowPhases, 7);
  //var hourz = fixDec(fixDec(floowPhases , 7) * 8, 7); // LOL phases get converted back into hours, with decimal minutes. what a waste
  timerDisplay.innerHTML = fixDec(hourzElapsed(), 7);
}

function getShowPomo(){
     pomoUpdatedTime = new Date().getTime();
     if (pomoSavedTime){
          pomoDifference = (pomoUpdatedTime - pomoStartTime) + pomoSavedTime;}  // difference is in milliseconds!
     else {
          pomoDifference =  pomoUpdatedTime - pomoStartTime;}
     pomoDisplay.innerHTML = fixDec(pomoHourzElapsed(), 7);
     //console.log("getshowpomo conditional check coming... (" + pomoRestmode + ")");
     if(!pomoRestmode){ // work mode
          if(fixDec(pomoHourzElapsed(), 7) >= POMOWORK){pomoRest();}} // if pomowork time elapsed, go rest
     else{ //rest mode
          //console.log("it's rest mode!! " + fixDec(pomoHourzElapsed(), 7));
          if(fixDec(pomoHourzElapsed(), 7) >= POMOREST){console.log("rest is finished!!!"); pomoWork();}} // if pomorest time elapsed, go work
}

function pomoRest(){
     console.log("pomoRest function!");
     pomoRestmode = 1;
     pauseTimer();
     pomoSoftReset();
     pomoStart();
}

function pomoWork(){
     console.log("pomoWork function!");
     pomoRestmode = 0;
     pomoSoftReset();
     pomoStart();
}

// function beep(){
//      var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAALA=");  
//   snd.play();}

function beep(){
     new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(1e3).join(10)).play();}
     // number inside join() determines pitch/duration. use minimum value: 10
  
function bip(bips){
     const bipLen = 250;
     var bibi = setInterval(beep, bipLen);
     setTimeout(() => {clearInterval(bibi);}, bipLen * bips);}

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
}

function pomoReset(){
  clearInterval(pomotInterval);
  pomoSavedTime = 0;
  pomoDifference = 0;
  pomoPaused = 0;
  pomoRunning = 0;
  pomoRestmode = 0; // start in WORK mode
  pomoDisplay.innerHTML = 'pomo';
  pomoDisplay.style.background = "#A1A1A1";
  pomoDisplay.style.color = "white";
  pomoDisplay.style.cursor = "pointer";
}

function pomoSoftReset(){ // doesn't reset the restmode status
  clearInterval(pomotInterval);
  pomoSavedTime = 0;
  pomoDifference = 0;
  pomoPaused = 0;
  pomoRunning = 0;
  pomoDisplay.innerHTML = 'pomo';
  pomoDisplay.style.background = "#A1A1A1";
  pomoDisplay.style.color = "white";
  pomoDisplay.style.cursor = "pointer";
}

const fract = (n) => (n - Math.floor(n));
const floor = (n) => Math.floor(n);

document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.keyCode === 13) { // Ctrl + Enter combo keypress
    resetTimer();}});

document.addEventListener('keydown', function(event) { 
  if (event.shiftKey && event.keyCode === 13) { // Shift + Enter combo keypress
    clearAll();
    getfocus("proj");}});

function getfocus(elemid) {
  document.getElementById(elemid).focus();}

function clearAll(){
     clearField("proj");
     clearField("typ1");
     clearField("typ2");
     clearField("typ3");
     clearField("typ4");
     clearField("typ5");
     clearField("forw");
     clearField("note");}

function clearField(elementid){
     document.getElementById(elementid).value = "";}





function floowElapsed(){
  var floowPhases = difference / 28800000;
  return Number(floowPhases);
}

const hourzElapsed = () => floor(Number(difference / 3600000)) + (fract(Number(difference / 3600000)) * .6);
const pomoHourzElapsed = () => floor(Number(pomoDifference / 3600000)) + (fract(Number(pomoDifference / 3600000)) * .6);

function floowDate(){
    var floowYear = new Date().getFullYear();
    
    var month = new Date().getMonth() + 1;
    if(month == 1){var floowMonth = "a"}
    if(month == 2){var floowMonth = "b"}
    if(month == 3){var floowMonth = "c"}
    if(month == 4){var floowMonth = "d"}
    if(month == 5){var floowMonth = "e"}
    if(month == 6){var floowMonth = "f"}
    if(month == 7){var floowMonth = "g"}
    if(month == 8){var floowMonth = "h"}
    if(month == 9){var floowMonth = "i"}
    if(month == 10){var floowMonth = "j"}
    if(month == 11){var floowMonth = "k"}
    if(month == 12){var floowMonth = "w"}
    
    var day = new Date().getDate();
    if(day < 10){var floowDay = "0" + day} else{var floowDay = day}
    return floowYear + floowMonth + floowDay;
}

function fixDec(value, decimals) {
    return Number(value).toFixed(decimals);
}

function roundDec(value, decimals) {
    if(decimals == 0){
        var mult = 1;
    } else{
        var mult = Math.pow(10, decimals)
    }
    return Math.round(value * mult) / mult;
}

function roundStep(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

function spacebar(){
    if(!running){
        startTimer();
    } else {
        pauseTimer();
    }
}

// document.body.onkeyup = function(e){
//     if(e.keyCode == 32 && !(checkInputFocus("inputField"))){ // spacebar press, when there is no focus on any input field, my class "inputField"
//         spacebar();
//     }
document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.key === ' ') { // Ctrl + SPACEBAR combo keypress
        spacebar();}});
        
document.addEventListener('keydown', function(event) { 
     if (event.ctrlKey && event.key === 'x') { // Ctrl + X combo keypress
          pomoStart();}});


////////// spit MASS /////////////
document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.key === ',') { // Ctrl + , combo keypress
    spitMASS();}});

document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.key === '.') { // Ctrl + . combo keypress
    writetoClipboard();}});

function ctrlPlus(mykey){  // TODO : this doesn't work, the non-encapsulated version works
    var output = new Boolean(false);
    if(event.key === mykey){console.log("M");}
    if (event.ctrlKey && event.key === mykey){
        output = true;
        console.log("combo");
    }
    return output;
}

document.getElementById("makeMASSbutton").addEventListener("click", function(){
  event.preventDefault(); // to prevent script reload on Android
  spitMASS();});

function spitMASS(){
    clearText("massOut"); // clears textarea
    var projVal = readInput("proj");
    var typ1Val = readInput("typ1");
    var typ2Val = readInput("typ2");
    var typ3Val = readInput("typ3");
    var typ4Val = readInput("typ4");
    var typ5Val = readInput("typ5");
    var forwVal = readInput("forw");
    var noteVal = readInput("note");
    
    
    insertText("massOut", makeMASSline("DATE",floowDate(), true));
    insertText("massOut", makeMASSline("TOTT",roundDec(hourzElapsed(), 2)));
    if(projVal){insertText("massOut", makeMASSline("proj",projVal))}
    if(typ1Val){insertText("massOut", makeMASSline("type",typ1Val))}
    if(typ2Val){insertText("massOut", makeMASSline("type",typ2Val))}
    if(typ3Val){insertText("massOut", makeMASSline("type",typ3Val))}
    if(typ4Val){insertText("massOut", makeMASSline("type",typ4Val))}
    if(typ5Val){insertText("massOut", makeMASSline("type",typ5Val))}
    if(forwVal){insertText("massOut", makeMASSline("forw",forwVal))}
    if(noteVal){insertText("massOut", makeMASSline("note",noteVal))}
    
}
////////////////////////////

document.getElementById("clipboard").addEventListener("click", function(){
     event.preventDefault(); // to prevent script reload on Android
     writetoClipboard();
});

document.getElementById("clear").addEventListener("click", function(){
     event.preventDefault(); // to prevent script reload on Android
     clearAll();
     getfocus("proj");
});

function writetoClipboard() {
  var text = document.getElementById("massOut");
  text.select();
  document.execCommand("copy");
  console.log("Copied the text: " + text.value);
  clearSelection();
  //clearAllFocus();
}

function clearAllFocus(){
     if (document.activeElement != document.body) document.activeElement.blur();
}

function clearSelection() {
    var sel;
    if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if ( tagName == "textarea" ||
                    (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
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

function insertText(elemID, text)
    {
        var elem = document.getElementById(elemID);
        elem.innerHTML += text;
    }
    
function readInput(id) {
    if(document.getElementById(id).value){
        var x = document.getElementById(id).value;
    } else{
        x = false;
    }
    return x;
}

function clearText(id){
    var elem = document.getElementById(id);
    elem.innerHTML = '';
}

function makeMASSline(attribName, attribValue, header){ // header is non-mandatory
    if(header){
        var massLine = "";
    } else{
        var massLine = "  ";
    }
        massLine += attribName;
        massLine += "  ";
        massLine += attribValue;
        massLine += '\n';
    return massLine;
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log("cookie SET: " + cname + "=" + cvalue);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        console.log("cookie FOUND!!!");
      return c.substring(name.length, c.length);
    }
  }
  console.log("cookie NOT found");
  return "";
}



