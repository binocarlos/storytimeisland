
//setup Dependencies

var express = require('express');

var http = require('http');
var url = require('url');
var engines = require('consolidate');
var fs = require('graceful-fs');

//var StatsDClient = require('statsd-client');

//var stats = new StatsDClient({host: 'hq.local', port: 8125, prefix: 'app.storytimeisland',  debug: false});

var port = process.argv[2] || 80;

var config = {};

// create a spanking brand new Express App
// it will save Sessions into Redis and so will survive a crash/restart
var document_root = __dirname + '/www';

var app = express();
var server = http.createServer(app);

app.use(express.favicon());
app.use(express.query());
app.use(express.bodyParser());

app.engine('ejs', engines.ejs);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(function(req, res, next){
	if(req.url=='/'){
		req.url = '/index.html';
	}

	if(req.url.match(/\.html$/)){
		fs.readFile(document_root + req.url, 'utf8', function(error, content){
			if(error || !content){
				res.statusCode=404;
				res.send(req.url + ' not found');
				return;	
			}
			var match = content.match(/^\s*<\!--\s*storytimewrapper(:\w+)?/)

			if(match){
				var template = match[1] ? match[1].replace(/^:/, '') : 'layout';
				res.render(template, {
					body:content
				})
			}
			else{
				res.send(content);
			}
		})
	}
	else{
		next();
	}
})

app.use(express.static(document_root));

server.listen(port, function(error){
	console.log('storytime island webserver listening on port: ' + port);
})