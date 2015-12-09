var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var createMode = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/createMode?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var modifyMode = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/modifyMode?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getMode = function (options, cb)
{

	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getMode?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getModes = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getModes?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};


exports.createMode = createMode;
exports.modifyMode = modifyMode;
exports.getMode = getMode;
exports.getModes = getModes;