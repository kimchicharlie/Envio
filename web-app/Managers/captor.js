var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var createCaptor = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};
	
	rest.post(config.apiAddress + '/createCaptor?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var modifyCaptor = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/modifyCaptor?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getCaptor = function (options, cb)
{

	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getCaptor?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getCaptors = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};
	rest.post(config.apiAddress + '/getCaptors?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var deleteCaptor = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/deleteCaptor?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};


exports.createCaptor = createCaptor;
exports.modifyCaptor = modifyCaptor;
exports.getCaptor = getCaptor;
exports.getCaptors = getCaptors;
exports.deleteCaptor = deleteCaptor;