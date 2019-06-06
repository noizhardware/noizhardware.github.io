var TT = {
  full: function(){
    var seconds = Math.round(new Date() / 1000);
    //document.getElementById("clock").innerHTML = `MASS element: "${fileArray[block][element][zeroOne]}"`;
    var d = new Date();
    document.getElementById("clock").innerHTML = d.toLocaleTimeString();
  }
}
