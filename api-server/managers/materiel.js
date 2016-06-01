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

var setCaptorValue = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'captorValue': null
    };

    if (options.organisation && options.type && options.value) {
        db.CaptorsValues
        .find({ "type" : options.type })
        .exec(function (err, captorValue) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (value) {
                captorValue.value = options.value;
                captorValue.save();
                result.captorValue = captorValue.value;
                cb(result);
            } else {
                var newObject = new db.CaptorsValues({
                    "type": options.type,
                    "value": options.value
                })
                newObject.save();
                result.captorValue = newObject.value;
                cb(result);
            }
        })
    }
}

var getAirConditioningValue = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'value': null
    };

    if (options.organisation && options.value) {
        db.CaptorsValues
        .find({ "type" : "airConditioning" })
        .exec(function (err, value) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.value = value;
                cb(result);
            }
        })
    }
};

var getWindowValue = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'value': null
    };

    if (options.organisation && options.value) {
        db.CaptorsValues
        .find({ "type" : "window" })
        .exec(function (err, value) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.value = value;
                cb(result);
            }
        })
    }
};

exports.getMaterielsFromRoom = getMaterielsFromRoom;
exports.changeTemperatureNeeded = changeTemperatureNeeded;
exports.setCaptorValue = setCaptorValue;
exports.getWindowValue = getWindowValue;
exports.getAirConditioningValue = getAirConditioningValue;