var async = require("async");
var request = require('request');
var utils = require("../utils");
var config = require("../config").config;

var url = config.apiAddress;

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
            url: url + '/modifyCaptor',
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

var modifyLight = function (options, cb) {
    cb = cb || function () {};

    console.log('options : ', options)

    var result = {
        'error': null,
        'response': null
    };

    var lightLux = 0;
    var lightPower = 0;
    var opacity = 0;
    var lightNeededLux = 0;
    var lightCaptors = {
        "outside": {
            "averageValue": 0,
            "number": 0
        },
        "inside": {
            "averageValue": 0,
            "number": 0
        }
    }

    if (utils.checkProperty(options.captors) && utils.checkProperty(options.roomID) && utils.checkProperty(options.lightNeeded) && utils.checkProperty(options.maxLux)) {
        console.log(42)
        for (var i = 0; i < options.captors.length; i++) {
            if (options.captors[i].type == 'OutsideLight') {
                lightCaptors.outside.averageValue += options.captors[i].value;
                lightCaptors.outside.number += 1;
            } else if (options.captors[i].type == 'InsideLight') {
                lightCaptors.inside.averageValue += options.captors[i].value;
                lightCaptors.inside.number += 1;
            }
        }

        if (lightCaptors.outside.number > 0 && lightCaptors.inside.number > 0) {
            lightCaptors.outside.averageValue = Math.round(lightCaptors.outside.averageValue / lightCaptors.outside.number);
            lightCaptors.inside.averageValue = Math.round(lightCaptors.inside.averageValue / lightCaptors.inside.number);
        }

        lightNeededLux = options.lightNeeded * (options.maxLux / 100);
        
        if (lightCaptors.outside.averageValue > lightNeededLux) {
            var tmp = lightNeededLux * 100 / lightCaptors.outside.averageValue;
            opacity = Math.round(100 - tmp);
            if (opacity > 90) {
                opacity = 90;
            }
            lightPower = 0;
        } else {
            opacity = 0;
            lightLux = lightNeededLux - lightCaptors.outside.averageValue;
            lightPower = Math.round(lightLux * (100 / options.maxLux));
        }

        console.log('outside light : ', lightCaptors.outside.averageValue);
        console.log('lightNeeded : ', options.lightNeeded);
        console.log('lightNeededLux : ', lightNeededLux);
        console.log('lumMax : ', options.maxLux);
        console.log('lightLux : ', lightLux);
        console.log('opacity : ', opacity);
        console.log('lightPower : ', lightPower);

        cb(result);
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

exports.modifyCaptorValue = modifyCaptorValue;
exports.modifyLight = modifyLight;