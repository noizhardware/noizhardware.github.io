function init(){
    setInterval(function(){ TT.full(); }, 1);
}

var TT = {
  full: function(){
    //var seconds = Math.round(new Date() / 1000);
    //document.getElementById("clock").innerHTML = `MASS element: "${fileArray[block][element][zeroOne]}"`;
    var hs = moment().format('HH');
    var h = parseInt(hs, 10);
    var ms = moment().format('mm');
    var m = parseInt(ms, 10);
    var ss = moment().format('ss');
    var s = parseInt(ss, 10);
    var totSec = (h * 3600) + (m * 60) + s;
    if (totSec <= 28800){ttMark = "S";}
    else if (totSec > 28800 && totSec < 57600){ttMark = "M";}
    else if (totSec >= 57600){ttMark = "R";}
    var ttNum = (totSec % 28800) / 28800;

    var ttNumTwo = Math.round(ttNum * 100) / 100; // only two decimal digits

    var ttFull = ttMark + ":" + ttNum;
    var ttTwo = ttMark + ":" + ttNumTwo;

    document.getElementById("clock").innerHTML = ttFull;
    document.getElementById("clockT").innerHTML = ttTwo;
  }
  //setInterval(updateTime, 1000);
}