var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	static = require('node-static'),
	util = require('util');

var fileServer = new static.Server('./');

function handler (req, res) {
	req.addListener('end', function () {
        fileServer.serve(req, res); // this will return the correct file
    });
}

io.set('log level',1);
app.listen(1234);