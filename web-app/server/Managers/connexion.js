var bcrypt = require("bcrypt-nodejs");
var utils = require('../utils');

var login = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};
};

var getConnectedUser = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};
};

var isConnected = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};
};

var logout = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};
};

exports.login = login;
exports.getConnectedUser = getConnectedUser;
exports.isConnected = isConnected;
exports.logout = logout;
