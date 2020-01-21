'use strict'
// shit to conditional loading (to include in .html)
// if (typeof startTime === 'undefined') {
//         document.write('<script src="js/libs/jquery.tooltip.min.js">\x3C/script>');
//     }

const icoInactive = "floow_fav00.png";
const icoActive = "floow_fav00_orange.png";

function changeIcon(icon) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '../img/' + icon;
    document.getElementsByTagName('head')[0].appendChild(link);
}

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
       changeIcon(icoActive);
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.
    paused = 0;
    running = 1;
    //timerDisplay.style.background = "#2E86AB"; //active timer color
    timerDisplay.style.background = "#FF6700"; //active timer color
    timerDisplay.style.cursor = "auto";
    timerDisplay.style.color = "white";
    //startTimerButton.classList.add('lighter');
    //pauseTimerButton.classList.remove('lighter');
    //startTimerButton.style.cursor = "auto";
    //pauseTimerButton.style.cursor = "pointer";
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
    //startTimerButton.classList.remove('lighter');
    //pauseTimerButton.classList.add('lighter');
    //startTimerButton.style.cursor = "pointer";
    //pauseTimerButton.style.cursor = "auto";
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
  //startTimerButton.classList.remove('lighter');
  //pauseTimerButton.classList.remove('lighter');
  //startTimerButton.style.cursor = "pointer";
  //pauseTimerButton.style.cursor = "auto";
}

const fract = (n) => (n - Math.floor(n));
const floor = (n) => Math.floor(n);

document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.keyCode === 13) { // Ctrl + Enter combo keypress
    //if (ctrlPlus('m')) { // call to the encapsulated version
    console.log("Ctrl + Enter on eventlisten");
    resetTimer();
  }
});

document.addEventListener('keydown', function(event) { 
  if (event.shiftKey && event.keyCode === 13) { // Shift + Enter combo keypress
    //if (ctrlPlus('m')) { // call to the encapsulated version
    console.log("Shift + Enter on eventlisten");
    clearAll();
    getfocus("proj");
  }
});

function getfocus(elemid) {
  document.getElementById(elemid).focus();
}

function clearAll(){
     clearField("proj");
     clearField("typ1");
     clearField("typ2");
     clearField("typ3");
     clearField("typ4");
     clearField("typ5");
     clearField("forw");
     clearField("note");
}

function clearField(elementid){
     document.getElementById(elementid).value = "";
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

function floowElapsed(){
  var floowPhases = difference / 28800000;
  return Number(floowPhases);
}

const hourzElapsed = () => floor(Number(difference / 3600000)) + (fract(Number(difference / 3600000)) * .6);

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
  //if (ctrlPlus('m')) { // call to the encapsulated version
  console.log("Ctrl + SPACEBAR on eventlisten");
        spacebar();
  }
});



////////// spit MASS /////////////
document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.key === ',') { // Ctrl + , combo keypress
  //if (ctrlPlus('m')) { // call to the encapsulated version
    console.log("Ctrl + , on eventlisten");
    spitMASS();
  }
});

document.addEventListener('keydown', function(event) { 
  if (event.ctrlKey && event.key === '.') { // Ctrl + . combo keypress
  //if (ctrlPlus('l')) { // call to the encapsulated version
    console.log("Ctrl + . on eventlisten");
    writetoClipboard();
  }
});

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
  spitMASS();
});

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


/////////////////// cookies
/*
document.getElementById("testA").addEventListener("click", function(){
     event.preventDefault(); // to prevent script reload on Android
    var projVal = readInput("proj");
    var fatCookie = makeMASSline("DATE","2019", true) + makeMASSline("proj",projVal);
  setCookie("porco",fatCookie,30);
});

document.getElementById("testB").addEventListener("click", function(){
     event.preventDefault(); // to prevent script reload on Android
    var biscotto=getCookie("porco");
  console.log("biscotto: " + biscotto);
});
*/

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



