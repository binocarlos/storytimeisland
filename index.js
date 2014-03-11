
//setup Dependencies

var express = require('express');
var argv = require('optimist').argv;
var http = require('http');
var url = require('url');
var engines = require('consolidate');
var fs = require('graceful-fs');
var Includes = require('html-include');

//var StatsDClient = require('statsd-client');

//var stats = new StatsDClient({host: 'hq.local', port: 8125, prefix: 'app.storytimeisland',  debug: false});

var port = argv.port || 80;

var config = {};

// create a spanking brand new Express App
// it will save Sessions into Redis and so will survive a crash/restart
var document_root = __dirname + '/www';

var app = express();
var server = http.createServer(app);

app.use(express.favicon());
app.use(express.query());
app.use(express.bodyParser());

var html = Includes({
	document_root:document_root
})

html.on('page', function(path, vars, done){
	done();
})

html.setup(app);
app.use(html.serve);

server.listen(port, function(error){
	console.log('storytime island webserver listening on port: ' + port);
})