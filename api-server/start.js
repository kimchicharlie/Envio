//------------------------------ REQUIRE -------------------------------------//

// npm modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipartMiddleware = require('connect-multiparty')();
var cors = require('cors');

// personal modules
var config = require("./config").config;
var db = require("./database");

//------------------------------ INIT -------------------------------------//

var httpPort = config.webServerHttpPort;
var app = express();

db.initDB();

//------------------------------ EXPRESSJS -------------------------------------//

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

var apiRouter = express.Router();

// Bind routes on api router
var routes = [
	require("./routes/default").routes,
	require("./routes/user").routes,
	require("./routes/room").routes,
	require("./routes/materiel").routes,
	require("./routes/mode").routes,
	require("./routes/window").routes,
	require("./routes/airConditioning").routes,
	require("./routes/captor").routes,
	require("./routes/stat").routes
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

//------------------------------ STARTED -------------------------------------//

var server = require('http').createServer(app);
server.listen(httpPort, function () {
	console.log("Server started, listening on port : " + httpPort);
});