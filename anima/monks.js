// monadic validators and scapegoats
'use strict';
const monks = {
    version: 201908060242
};

const Nothing = null;

function isJust(input){ // basically, not(null ot empty or undefined), can be 0, true, false, whatever
     return (input !== null && input != "" && typeof input != 'undefined') ? true : (input === 0 || input === false) ? true : false;
}

function isNothing(input){ // only if null
     return !isJust(input);
}

function maybe(input, fallback){
     return isJust(input) ? input : isJust(fallback) ? fallback : Nothing ;
}

function m(){}
m.forever = function(callback, ms){
	while (true) {
          callback();
          if(isJust(ms)){m.sleep(ms);}
     }
}

m.loop = function(loops, callback, ms){ // aggiungere verifica che 'loops' sia un argomento valido - anzi in tutte le funzioni, verifica che tutti gli input siano validi prima di eseguire!!!
     var i = 0;
	while (i < loops) {
          callback();
          if(isJust(ms)){m.sleep(ms);}
          i++;
     }
     return true;
}

m.sleep = function(ms){
    var now = new Date().getTime();
    while(new Date().getTime() < now + ms){};
    return true;
}