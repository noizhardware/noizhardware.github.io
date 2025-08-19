redirecting to ip nodes
you provide a node id and it retrieves the ip from
https://raw.githubusercontent.com/noizhardware/dotfiles/master/ip/.

usage:
noizhardware.com/rdr-MYNODEID-MYSUBADDRESS
will redirect to:
http://[ip contained in MYNODEID file]/[MYSUBADDRESS]

example:
noizhardware.com/rdr-node0-porcodio.html
will retrieve node0's IP from
https://github.com/noizhardware/dotfiles/blob/master/ip/.node0

and thus redirect to
http://62.11.170.4/porcodio.html