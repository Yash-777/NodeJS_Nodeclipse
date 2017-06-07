/**
 * http://usejsdoc.org/
 */
var Busboy = require('busboy'); // 0.2.9

var listeningPort = "9077";
var express = require('express'); // 4.12.3
var app = express();
app.listen(listeningPort, function(){
	console.log('App listening|running on port : ',listeningPort);
});

var http = require('http'),
	path = require('path'),
	os = require('os'),
	fs = require('fs'),
	mkdirp = require('mkdirp');

var exportFile = require('./routes/fileUploadCurrDir');
app.get('/busboy/disk/currentUplaodDirHTML', exportFile.htmlFile);
app.get('/busboy/disk/currentUplaodDirJS', exportFile.jsFile);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.get('/busboy/disk/currentUplaodDirJade', exportFile.jadeFile);

app.get('/busboy/disk/currentUplaodDir', function(req, res) {
	// show a file upload form
	res.writeHead(200, {'content-type': 'text/html'});
	res.end(
		'<form action="/busboy/disk/currentUplaodDir/file" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="file"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
	);
});
/*
https://www.npmjs.com/package/mkdirp
mkdirp « Create a new directory and any necessary subdirectories at dir with octal permission string
var path = require("path");
__dirname (or) ./
It gives you the full path of the directory containing the current running script.
*/
app.post('/busboy/disk/currentUplaodDir/file', function(req, res) {
	if (req.method === 'POST') {
		var busboy = new Busboy({ headers: req.headers });
		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			console.log('File ['+ fieldname +']: filename: '+ filename +', encoding: '+ encoding +', mimetype: '+ mimetype);

			var datetimestamp = Date.now();

			var tempPath = os.tmpDir(), currentDir = path.basename(__dirname), saveFileDirecotory = './uploads';
			console.log('datetimestamp : ', datetimestamp, 'tempPath : ', tempPath, ' currentDir : ', currentDir);

			console.log("./ = %s", path.resolve("./"));
			console.log("__dirname = %s", path.resolve(__dirname));

			mkdirp(saveFileDirecotory, function (err) {
				if (err) {
					console.error(err);
				} else {
					console.log('pow!');
				}
			});

			var saveTo = path.join(saveFileDirecotory, path.basename( filename.split('.')[0] ));
			console.log('file Path : ', saveTo);
			var filePath = saveTo + '-' + datetimestamp + '.' + filename.split('.')[filename.split('.').length -1];
			console.log('file Path : ', filePath);
			file.pipe(fs.createWriteStream( filePath ));
		});
		busboy.on('finish', function() {
			res.writeHead(200, { 'Connection': 'close' });
			res.end("That's all folks!");
		});
		return req.pipe(busboy);
	}
	res.writeHead(404);
	res.end();
});