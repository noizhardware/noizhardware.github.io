const httpGetAsync = (url, callback) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);}
    xmlHttp.open("GET", url, true); // true -> asynchronous
    xmlHttp.send(null);}
 
const ipGet = (nodeId, callback) => {
     return httpGetAsync('https://raw.githubusercontent.com/noizhardware/dotfiles/master/ip/.' + nodeId, callback);}
     

const all = (nodeId, usr) => {
     ipGet(nodeId, (ip) => {
          writeToClipboard("ssh " + usr + "@" + ip);})}



// 
// const makeSSHcommand = (nodeId, usr) => {
//      ipGet(nodeId, (ip) => {
//           return "ssh " + usr + "@" + ip;});}
// 
// const clipboardSSHcommand = (nodeId, usr) => {
//      writeToClipboard(makeSSHcommand(nodeId, usr));}
// 
// 
// 



const writeToClipboard = (data) => {
     clearText("txt");
     insertText("txt", data); 
     var text = document.getElementById("txt");
     text.select();
     document.execCommand("copy"); // this is not working?
     console.log("Copied the text: " + text.value);
     //clearSelection("txt");
}

     
const clearText = (id) => {
    var elem = document.getElementById(id);
    elem.innerHTML = '';}

const insertText = (elemID, text) => {
        var elem = document.getElementById(elemID);
        elem.innerHTML += text;}
        
function clearSelection(elemID) {
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
            if ( tagName == elemID ||
                    (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}