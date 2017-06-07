/**
 * http://usejsdoc.org/
 */
var jsHTML = 
	'<form action="/busboy/disk/currentUplaodDir/file" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="file"><br>'+
		'<input type="submit" value="Upload">'+
	'</form>';
exports.jsFile = function(req, res){
	// show a file upload form
	console.log("Reqested for Javascript HTML File.");
	res.writeHead(200, {'content-type': 'text/html'});
	res.end(jsHTML);
};

var htmlFileLoacation = __dirname.replace("routes", "");
exports.htmlFile = function(req, res){
	console.log("Reqested for Source HTML File.");
	res.sendfile(htmlFileLoacation + 'views/fileUploadCurrDir.html');
};

exports.jadeFile = function(req, res){
	console.log("Reqested for Jade File.");
	/*Render the given view `name` name with `options` and a callback accepting an error and the rendered template string.
	 * NOTE: Invalid indentation, you can use tabs or spaces but not both*/
	res.render('fileUploadDir', { fileContent: jsHTML, title: "Rndering Application" });
};