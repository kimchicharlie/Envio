var async = require("async");
var request = require('request');
var utils = require("../utils");
var config = require("../config").config;

var url = 'http://localhost:1337/api/modifyCaptor';

var modifyCaptorValue = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'response': null
    };

    if (utils.checkProperty(options.captorID) && utils.checkProperty(options.value)) {
        var objectToSend = {
            "value": options.value,
            "captorID": options.captorID,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: url,
            method: "POST",
            json: objectToSend
        }, function (response) {
            cb(response);
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

exports.modifyCaptorValue = modifyCaptorValue;