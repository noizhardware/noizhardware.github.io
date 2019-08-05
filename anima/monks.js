// monadic validators
'use strict';
const monks = {
    version: 20190805
};

const Nothing = null;

function isJust(input){ // basically, not null and not empty, can be 0, true, false, whatever
     return (input !== null && input != "") ? true : (input === 0 || input === false) ? true : false;
}

function isNothing(input){ // only if null
     return !isJust(input);
}

function maybe(input){
     return isJust(input) ? input : Nothing;
}

function m(){}
m.forever = function(callback){
	while (true) {
          callback();
     }
}
     m.forever.every = function(callback, ms){
          while (true) {
               callback();
               m.sleep(ms);
          }
     }

m.loop = function(loops, callback){
     var i = 0;
	while (i < loops) {
          callback();
          i++;
     }
}
     m.loop.every = function(loops, callback, ms){
          var i = 0;
     	while (i < loops) {
               callback();
               m.sleep(ms);
               i++;
          }
     }

m.sleep = function(ms){
    var now = new Date().getTime();
    while(new Date().getTime() < now + ms){};
}