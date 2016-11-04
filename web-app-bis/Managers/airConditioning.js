var utils = require('../utils');
var config = require('../config').config;
var rest = require('./rest');

var createAirConditioning = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};
	
	rest.post(config.apiAddress + '/createAirConditioning?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var modifyAirConditioning = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function () {};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/modifyAirConditioning?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getAirConditioning = function (options, cb)
{

	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/getAirConditioning?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var getAirConditionings = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};
	rest.post(config.apiAddress + '/getAirConditionings?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};

var deleteAirConditioning = function (options, cb)
{
	cb = (typeof cb == "function") ? cb : function (){};
	options = (typeof options == "object") ? options : {};

	rest.post(config.apiAddress + '/deleteAirConditioning?api_key='+config.envioApiAccessKey, options, function (response) {
		cb(response);
	})
};


exports.createAirConditioning = createAirConditioning;
exports.modifyAirConditioning = modifyAirConditioning;
exports.getAirConditioning = getAirConditioning;
exports.getAirConditionings = getAirConditionings;
exports.deleteAirConditioning = deleteAirConditioning;