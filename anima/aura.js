// environment operators
// TODO: verify all arguments before function execution 
'use strict';
const aura = {
    version: 201908071413
};

function locus (){}
     locus.see = function(){
          return window.location.href.replace(/\#.*/g,"");
     };

function visor (){}
     visor.touch = function (elemID, text){
          if(isJust(text)){document.getElementById(elemID).innerHTML += text;
               return true;
          }else{
               return null;
          }
     };

function hash (){}
     hash.see = function(){
       return location.hash.replace("#", "");
     };
     hash.touch = function(hash){
          location.hash = hash; // this is to SET the current location hash
          return true;
     };
     
function say (log){if(isJust(log)){console.log(log);}}
     say.debug = function(log){if(isJust(log)){console.log("%cDebug log: %c" + log, "font-weight: bold", "");};};
     say.info = function(log){if(isJust(log)){console.log("%cInfo%c: " + log, "color:green; text-decoration: underline", "color:green");};};
     say.notice = function(log){if(isJust(log)){console.log("%cNotice%c: " + log, "text-decoration: underline", "");};};
     say.warning = function(log){if(isJust(log)){console.log("%cWARNING%c: " + log, "font-weight: bold; text-decoration: underline", "");};};
     say.error = function(log){if(isJust(log)){console.log("%c::ERROR::%c : " + log, "color:red","");};};
     say.critical = function(log){if(isJust(log)){console.log("::CRITICAL ERROR:: " + log);};};
     say.alert = function(log){if(isJust(log)){console.log("::ACHTUNG ERROR:: : " + log); alert("ACHTUNG : ERROR : " + log);};};
     say.panic = function(log){if(isJust(log)){console.log('%c [[PANIC]] : ' + log, 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'); alert("[[PANIC]] : " + log);};};
     
function loadJS(jslocation, location, load){
     //"location" is the location to insert the <script> element
     //"load" is the function to be executed after onload
     if(isJust(jslocation) && isJust(location) && isJust(load)){
          var scriptTag = document.createElement('script');
          scriptTag.src = jslocation;
          scriptTag.onload = load;
          scriptTag.onreadystatechange = load;
          location.appendChild(scriptTag);
          say.debug("JS loaded: " + scriptTag.src);
          return true;
     }else{return null;}
}