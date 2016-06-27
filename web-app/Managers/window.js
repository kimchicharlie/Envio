var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var createWindow = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};
	
	rest.post(config.apiAddress + '/createWindow?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var modifyWindow = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/modifyWindow?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getWindow = function (options, cb)
{

	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getWindow?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getWindows = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};
	rest.post(config.apiAddress + '/getWindows?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var deleteWindow = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/deleteWindow?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};


exports.createWindow = createWindow;
exports.modifyWindow = modifyWindow;
exports.getWindow = getWindow;
exports.getWindows = getWindows;
exports.deleteWindow = deleteWindow;