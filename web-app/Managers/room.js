var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var createRoom = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/createRoom?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var modifyRoom = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/modifyRoom?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getRoom = function (options, cb)
{

	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getRoom?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getRooms = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getRooms?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var changeTemperature = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/changeTemperature?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var changeLight = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/changeLight?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var deleteRoom = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/deleteRoom?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};


exports.createRoom = createRoom;
exports.modifyRoom = modifyRoom;
exports.getRoom = getRoom;
exports.getRooms = getRooms;
exports.changeTemperature = changeTemperature;
exports.changeLight = changeLight;
exports.deleteRoom = deleteRoom;