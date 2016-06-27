var async = require("async");
var request = require('request');
var utils = require('./utils');
var config = require('./config').config;

var url = config.apiAddress;

var getRoom = function(cb) {
	cb = cb || function () {};

	var result = {
		'error': null,
		'room': null
	}

	
};

exports.getRoom = getRoom;