// monadic functions, wrappers, validators and scapegoats
'use strict';
const monks = {
    version: 201908071417
};

//TODO:
//doJust(callback(var1, var2...)) : calls the passed function only if all the args passed to that function are Just 

const Nothing = null;

function isJust(input){ // basically, not(null ot empty or undefined), can be 0, true, false, whatever
     return (input !== null && input != "" && typeof input != 'undefined') ? true : (input === 0 || input === false) ? true : false;
}

function isNothing(input){ // only if null
     return !isJust(input);
}

// usage: maybe("blahblah") // blahblah
// maybe() // `null`
// maybe(Nothing, 5) // 5
function maybe(input, fallback){
     return isJust(input) ? input : isJust(fallback) ? fallback : Nothing ;
}

function m(){}

// function myFunc(){console.log("Hello!");}
// usage: m.forever(myFunc); // Hello! (goes on forever)
// usage: m.forever(myFunc, 500); // Hello! (goes on forever, every 500 milliseconds)
m.forever = function(callback, ms){
     if(isFunction(callback)){
          while (true) {
               callback();
               if(isJust(ms) && isFinite(ms)){m.sleep(ms);}
          }
     }
}

// function myFunc(){console.log("Hello!");}
// usage: m.loop(5, myFunc); // Hello (5 times)
// usage: m.loop(5, myFunc, 200); // Hello! (5 times, every 200 milliseconds)
m.loop = function(loops, callback, ms){
     if(isJust(loops) && isFinite(loops) && isFunction(callback)){
          var i = 0;
	    while (i < loops) {
               callback();
               if(isJust(ms) && isFinite(ms)){m.sleep(ms);}
               i++;
          }
          return true;
     }else{return false;}
}

// usage: m.sleep(1000); // system freezes for one second, then becomes available again
m.sleep = function(ms){
     if(isJust(ms) && isFinite(ms)){
          var now = new Date().getTime();
          while(new Date().getTime() < now + ms){};
          return true;
     }else{return false;}
}

function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}