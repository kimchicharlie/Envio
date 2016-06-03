//------------------------------ REQUIRE -------------------------------------//

// npm modules
var express = require('express');
var bodyParser = require('body-parser');
var multipartMiddleware = require('connect-multiparty')();
var cors = require('cors');

// personal modules
var config = require("./config").config;

//------------------------------ INIT -------------------------------------//

var httpPort = config.webServerHttpPort;
var app = express();

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
	require("./routes/communication").routes
];

for (var i = 0; i < routes.length; i++)
{
  for (var j = 0; j < routes[i].length; j++)
  {
    var route = routes[i][j];
    apiRouter[route.method](route.path, route.middlewares, route.handler);
  }
}

app.use("/communication", apiRouter);

app.use(function(error, req, res, next) {
	res.status(404);
});

app.use(function(error, req, res, next) {
	res.status(500);
});

//------------------------------ STARTED -------------------------------------//

var server = require('http').createServer(app);
server.listen(httpPort, function () {
	console.log("Recuperation server started, listening on port : " + httpPort);
});