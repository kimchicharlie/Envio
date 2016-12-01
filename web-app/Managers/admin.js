var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var getUsersAdmin = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getUsersAdmin?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var updateUser = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/updateUser?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var deleteUser = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/deleteUser?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

exports.getUsersAdmin = getUsersAdmin;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;