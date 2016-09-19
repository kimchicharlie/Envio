var async = require("async");
var request = require('request');
var utils = require("../utils");
var config = require("../config").config;

var url = config.recuperationServerAddress;

var modifyLight = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'response': null
    };

    if (utils.checkProperty(options.captors) && utils.checkProperty(options.roomID) && utils.checkProperty(options.lightNeeded)) {
        var objectToSend = {
            "captors": options.captors,
            "roomID": options.roomID,
            "lightNeeded": options.lightNeeded,
            "maxLux": options.maxLux,
            "recuperation_key": config.recuperationServerAccessKey
        }

        request({
            url: url + "/modifyLight",
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            result.response = response;
            cb(result);
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var modifyTemperature = function (options, cb) {}

exports.modifyLight = modifyLight;
exports.modifyTemperature = modifyTemperature;