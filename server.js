var http = require('http');
var https = require('https');
var fs = require('fs');

var express = require('express');
var swaggerize = require("swaggerize-express");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fileUpload = require('express-fileupload');

var jwt = require("jsonwebtoken");
var config = require('config');
var randomstring = require("randomstring");

global.ERROR = require('./constants/error-codes-constants');
global.AUTH = require('./constants/auth-constants');

global.requireService = function(service) {
	return require("./services/" + service + "-service");
}

// var privateKey  = fs.readFileSync('./cert/portal_srjca_com.key', 'utf8');
// var certificate = fs.readFileSync('./cert/portal_srjca_com.crt', 'utf8');
// var credentials = { key: privateKey, cert: certificate };

var app = express();
var port = process.env.PORT || 4000;
var server = http.createServer(app);

app.use(morgan('dev'));
app.set('secret', "secret");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/', function(req, res) {
	res.json({
		message: 'contract-api@v0.0.1'
	});
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, auth-token, Content-Type, Cache-Control");
	res.header('Access-Control-Allow-Methods', 'POST, GET');
	next();
});

app.use(swaggerize({
	api: './api.yaml',
	handlers: './handlers'
}));

// if (config.get('ssl')){
// 	var httpsServer = https.createServer(credentials, app);
// 	httpsServer.listen(port);
// }
// else {
// 		app.listen(port);
// }

server.listen(port, '0.0.0.0', function () {
    app.swagger.api.host = server.address().address + ':' + server.address().port;
});

console.log('contract-api@0.0.1 running on port ' + port);
