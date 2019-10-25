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

    var tt5 = ttMark + ":" + (Math.round(ttNum * 100000) / 100000).toFixed(5); // only five decimal digits
    var tt2 = ttMark + ":" + (Math.round(ttNum * 100) / 100).toFixed(2); // only two decimal digits

    document.getElementById("clock5").innerHTML = tt5;
    document.getElementById("clock2").innerHTML = tt2;
  }
  //setInterval(updateTime, 1000);
}