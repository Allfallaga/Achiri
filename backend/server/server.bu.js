var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.get('/', function (req, res, next) {
    console.log("get /")
    res.send('Hello world!');
});

var server = app.listen(445);

peerServer = ExpressPeerServer(server, {
    path: "/myapp"
})
app.use('/', peerServer);

peerServer.on('connection', function (id) {
    console.log(id)
    console.log(server._clients)
});

server.on('disconnect', function (id) {
    console.log(id + "deconnected")
});
