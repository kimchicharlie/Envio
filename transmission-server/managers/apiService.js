var async = require("async");
var request = require('request');
var utils = require('../utils');
var config = require('../config').config;

var url = config.apiAddress;
var roomID = config.roomID;

var getRoom = function(cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    }

    if (utils.checkProperty(roomID)) {
        var objectToSend = {
            "roomID": roomID,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: url + '/getRoomPlusHardware',
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                result.error = "Can't reach Envio API";
                cb(result);
            } else {
                result.room = body.room;
                cb(result);
            }
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

    getRoom(function (response) {
        if (response.error) {
            result.error = response.error;
            cb(result);
        } else {
            console.log('response : ', response.room)
        }
    })
}

exports.getRoom = getRoom;
exports.getCaptor = getCaptor;
exports.handleChanges = handleChanges;