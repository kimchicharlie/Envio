var async = require("async");
var db = require("../database");

var addStat = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };
    
    if (Number.isInteger(options.realLight) && Number.isInteger(options.neededLight) && Number.isInteger(options.realTemperature) && Number.isInteger(options.neededTemperature) && options.roomID) {
        var newStat = new db.Stats({
            "realLight" : options.realLight,
            "neededLight" : options.neededLight,
            "realTemperature" : options.realTemperature,
            "neededTemperature" : options.neededTemperature,
            "room": options.roomID
        });

        newStat.save(function (error) {
            if (error) {
                result.error = error;
                cb(result);
            } else {
                result.stat = newStat;
                cb(result);
            }
        });
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

exports.addStat = addStat;