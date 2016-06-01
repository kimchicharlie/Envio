var async = require("async");
var request = require('request');
var utils = require("../utils");
var config = require("../config");

var url = 'http://localhost:1337/api/setCaptorValue';

var modifyValue = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'response': null
    };
    
    if (utils.checkProperty(options.type) && utils.checkProperty(options.value)) {
        request({
            url: url,
            method: "POST",
            json: JSON.stringify({
                "value": options.value,
                "type": options.type,
                "api_key": config.envioApiAccessKey
            })
        }, function (response) {
            cb(response);
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

exports.modifyValue = modifyValue;