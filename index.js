
//setup Dependencies

var express = require('express');
var _ = require('lodash');
var eyes = require('eyes');
var http = require('http');
var engines = require('consolidate');
var url = require('url');
var dye = require('dye');
var fs = require('fs');


var program = require('commander');
var version = require('./package.json').version;

program
  .option('-p, --port <number>', 'port to listen on', '80')
  .version(version)
  
program
  .command('start')
  .description('start the storytimeisland web server')
  .action(function(env){

  	var port = program.port || 80;

  	runserver(port);
  })

program
  .command('*')
  .action(function(command){
    console.log('command: "%s" not found', command);
  });  

program.parse(process.argv);

function runserver(port){

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

	app.use(express.static(document_root));

	server.listen(port, function(error){
		console.log(dye.yellow('storytime island webserver listening on port: ') + dye.red(port));
	})
}