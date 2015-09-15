var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multipartMiddleware = require('connect-multiparty')();
var cors = require('cors');
var path = require('path');

var app = express();
var db = require("./database");

db.initDB();

var port = 1337;
var app = express();

var server = require('http').createServer(app);

var router = require("./routes");

app.use('/api', router);

app.use(function(error, req, res, next) {
	res.status(404);
});

app.use(function(error, req, res, next) {
	res.status(500);
});

server.listen(port, function () {
	console.log("Server started, listening on port : " + port);
});