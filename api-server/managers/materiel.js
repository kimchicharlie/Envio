var async = require("async");
var db = require("../database");

var getMaterielsFromRoom = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'materiels': null
    };

    if (options.organisation) {
        db.Materiels
        .find({ "roomId" : options.roomId })
        .exec(function (err, materiels) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.materiels = materiels;
                cb(result);
            }
        })
    }
};

var changeTemperatureNeeded = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'success': false
    };

    if (options.organisation) {
        db.Materiels
        .findOne({
            "roomId" : options.roomId,
            "type" : "tneed"
        })
        .exec(function (err, materiel) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                materiel.level = options.temperature;
                materiel.save(function (error) {
                    if (error) {
                        result.error = error;
                        cb(result);
                    } else {
                        result.success = true;
                        cb(result);
                    }
                });
            }
        })
    }
};

exports.getMaterielsFromRoom = getMaterielsFromRoom;
exports.changeTemperatureNeeded = changeTemperatureNeeded;