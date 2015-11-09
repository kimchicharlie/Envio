var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var register = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/register', options, function (response) {
		cb(response);
	})
};

var login = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/login', options, function (response) {
		cb(response);
	})
};

var isConnected = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	options.api_key = config.envioApiAccessKey;
	rest.post(config.apiAddress + '/isConnected', options, function (response) {
		cb(response);
	})
};

var logout = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	options.api_key = config.envioApiAccessKey;
	rest.post(config.apiAddress + '/logout', options, function (response) {
		cb(response);
	})
};

exports.register = register;
exports.login = login;
exports.isConnected = isConnected;
exports.logout = logout;