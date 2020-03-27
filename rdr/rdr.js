const httpGetAsync = (url, callback) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);}
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);}
    

    
  //  hash.see()
    
const ipGet = (nodeId, callback) => {
     return httpGetAsync('https://raw.githubusercontent.com/noizhardware/dotfiles/master/ip/.' + nodeId, callback);}

//ipGet(hash.see(), (a)=>console.log(a));