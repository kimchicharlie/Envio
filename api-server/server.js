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

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({
	"limit": 50000000,
	"defer": true
}));
app.use(bodyParser.urlencoded({
	"limit": 50000000,
	"extended": true,
	"defer": true
}));

var server = require('http').createServer(app);

var apiRouter = express.Router();

// Bind routes on api router
var routes = [
	require("./routes/default").routes,
	require("./routes/user").routes,
	require("./routes/room").routes,
	require("./routes/materiel").routes,
];
for (var i = 0; i < routes.length; i++)
{
  for (var j = 0; j < routes[i].length; j++)
  {
    var route = routes[i][j];
    apiRouter[route.method](route.path, route.middlewares, route.handler);
  }
}

app.use("/api", apiRouter);

app.use(function(error, req, res, next) {
	res.status(404);
});

app.use(function(error, req, res, next) {
	res.status(500);
});

server.listen(port, function () {
	console.log("Server started, listening on port : " + port);
});