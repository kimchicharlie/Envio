var utils = require('../utils');
var unirest = require('unirest');
var config = require('../config').config;
var rest = require('../rest');

var testDefault = function (options, cb)
{
	rest.post(config.apiAddress, options, function (response) {
		cb(response);
	})
}

exports.testDefault = testDefault;