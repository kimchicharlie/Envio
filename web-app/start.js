//------------------------------ REQUIRE -------------------------------------//

// npm modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')

// personal modules
var config = require("./config_dist").config;
var rest = require("./rest");
var WebpackConfig = require('./webpack.config')

//------------------------------ INIT -------------------------------------//

var httpPort = config.webServerHttpPort;
var app = express();

//------------------------------ EXPRESSJS -------------------------------------//

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
 publicPath: '/assets/',
 stats: {
   colors: true
    } 
}))
app.use(express.static('public'));

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
	require("./Routes/connexion").routes,
	require("./Routes/room").routes,
	require("./Routes/mode").routes,
	require("./Routes/window").routes,
	require("./Routes/airConditioning").routes,
	require("./Routes/captor").routes,
	require("./Routes/event").routes,
	require("./Routes/default").routes,
	require("./Routes/admin").routes
];
for (var i = 0; i < routes.length; i++)
{
	for (var j = 0; j < routes[i].length; j++)
	{
		var route = routes[i][j];
		apiRouter[route.method](route.path, route.middlewares, route.handler);
	}
}

var homeRouter = express.Router();

// Default root page

app.use("/favicon.ico", express.static(__dirname + "/static/favicon.ico"));
app.use("/robots.txt", express.static(__dirname + "/static/robots.txt"));

// Expose info.json generated during the build
app.use("/info.json", express.static(__dirname + "/info.json"));

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