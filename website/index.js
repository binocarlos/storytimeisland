
//setup Dependencies

var express = require('express');
var _ = require('lodash');
var eyes = require('eyes');
var http = require('http');
var engines = require('consolidate');
var url = require('url');
var dye = require('dye');
var fs = require('fs');
var marked = require('marked');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true
})




console.log('creating web server');

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

function pagehandler(req, res, next){
	var u = url.parse(req.url);
	var file = u.pathname;

	if(!file.match(/\.\w+?/)){
		file += 'index.html';
	}
	else if(!file.match(/\.(html?|md)$/)){
		next();
		return;
	}

	var markdownmode = false;

	function servecontent(content){
		if(file.match(/\.md$/) || markdownmode){
			//content = require( "markdown" ).markdown.toHTML( content);			
			content = marked(content);
		}

		res.render('layout', {
			body:content
		})
	}

	fs.readFile(document_root + file, 'utf8', function(error, content){
		if(error || !content){
			fs.readFile(document_root + file.replace(/\.html?$/, '.md'), 'utf8', function(error, content){
				if(error || !content){
					next();
					return;
				}
				else{
					markdownmode = true;
					servecontent(content);
				}
			})
			return;
		}
		else{
			servecontent(content);
		}
	})
}

app.use(pagehandler);

app.post('/343unihj3h3hy398h398h3/_update/34343', function(req, res, next){
	var exec = require('child_process').exec,
    child;

	child = exec('cd /home/storytimehq/webserver && git pull',
	  function (error, stdout, stderr) {
	  	res.send(stdout + ' ---- ' + stderr)
	});
})

app.use(express.static(document_root));

server.listen(80, function(error){
	console.log(dye.yellow('storytime island webserver listening on port: ') + dye.red(80));
})
