var async = require("async");
var request = require('request');
var utils = require('../utils');
var config = require('../config').config;

var url = config.apiAddress;
var organisation = config.organisation;

var getRooms = function(cb) {
	cb = cb || function () {};

	var result = {
		'error': null,
		'rooms': null
	}

	if (utils.checkProperty(organisation)) {
        var objectToSend = {
            "organisation": organisation,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: url + '/getRooms',
            method: "POST",
            json: objectToSend
        }, function (response) {
        	if (response.error) {
        		result.error = response.error;
        	} else {
	        	result.rooms = response.rooms;
	        }
	        cb(result);
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var getCaptor = function(cb) {
	cb = cb || function () {};

	var result = {
		'error': null,
		'room': null
	}
}

var handleChanges = function(cb) {
	cb = cb || function () {};

	var result = {
		'error': null,
		'room': null
	}

	getRooms(function (response) {
		if (response.error) {
			result.error = response.error;
			cb(result);
		} else {
			async.each(response.rooms, function (room, callback) {
				console.log('roomID : ', room._id);
				callback();
			}, function (err) {
				if (err) {
					result.error = err;
				} else {
					console.log("Treatment success");
				}
			})
		}
	})
}

exports.getRooms = getRooms;
exports.getCaptor = getCaptor;
exports.handleChanges = handleChanges;