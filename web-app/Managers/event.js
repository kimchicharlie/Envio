var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var createEvent = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};
	
	rest.post(config.apiAddress + '/addEventPlanning?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var deleteEvent = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/removeEventPlanning?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var modifyEvent = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/modifyEvent?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getEvent = function (options, cb)
{

	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getEvent?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getEvents = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getEvents?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

exports.createEvent = createEvent;
exports.modifyEvent = modifyEvent;
exports.getEvent = getEvent;
exports.getEvents = getEvents;
exports.deleteEvent = deleteEvent;  