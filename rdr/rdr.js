const httpGetAsync = (url, callback) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);}
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);}
 
const ipGet = (nodeId, callback) => {
     return httpGetAsync('https://raw.githubusercontent.com/noizhardware/dotfiles/master/ip/.' + nodeId, callback);}
     
const ipGo = (nodeId) => {
     ipGet(nodeId, (ip) => locus.touch('http://' + ip));}