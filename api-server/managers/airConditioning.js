var async = require("async");
var db = require("../database");

var createAirConditioning = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'airConditioning': null
    };
    if (options.room && options.temperatureWanted) {
        var newAirConditioning = new db.AirConditionings({
            "room" : options.room,
            "temperatureWanted" : options.temperatureWanted,
        });

        newAirConditioning.save(function (error) {
            if (error) {
                result.error = error;
                cb(result);
            } else {
                result.airConditioning = newAirConditioning;
                db.Rooms.findByIdAndUpdate(
                    {"_id" : options.room},
                    {$push: {"airConditionings" :  newAirConditioning._id }},
                    {safe: true, upsert: true},
                    function(err, model) { 
                        if (err) {
                            result.error = err;
                            cb(result);
                            return;
                        } else {
                            cb(result);
                            return;
                        }
                    }
                );
            }
        });
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var modifyAirConditioning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'airConditioning': null
    };

    if (options.airConditioningID) {
        db.AirConditionings
        .findOne({'_id': options.airConditioningID})
        .exec(function (err, airConditioning) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!airConditioning) {
                result.error = "Cette vitre n'existe pas";
                cb(result);
            } else {
                async.parallel([
                    function (callback) {
                        if (options.temperatureWanted) {
                            airConditioning.temperatureWanted = options.temperatureWanted;
                            callback();
                        } else {
                            callback();
                        }
                    },
                ], function () {
                    airConditioning.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.airConditioning = airConditioning;
                            cb(result);
                        }
                    });
                })
            }
        })
    } else {
        result.error = "Requête incorrecte";
        cb(result);
    }
}

var deleteAirConditioning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'airConditioning': null
    };
    if (options.airConditioningID) {
        db.AirConditionings
        .findOne({'_id': options.airConditioningID})
        .exec(function (err, airConditioning) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!airConditioning) {
                result.error = "Ce airConditioning n'existe pas";
                cb(result);
            } else {
                airConditioning.remove(function (error) {
                    if (error) {
                        result.error = error;
                        cb(result);
                    } else {
                        db.Rooms.findByIdAndUpdate(
                            {"_id" : airConditioning.room},
                            {$pull: {"airConditionings" :  options.airConditioningID }},
                            {safe: true, upsert: true},
                            function(err, model) { 
                                if (err) {
                                    result.error = err;
                                    cb(result);
                                } else {
                                    cb(result);
                                }
                            }
                        );
                    }
                });
            }
        })
    } else {
        result.error = "Requête incorrecte";
        cb(result);
    }
}

var getAirConditionings = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'airConditionings': null
    };
    
    if (options.room) {
        db.AirConditionings
        .find({'room': options.room})
        .exec(function (err, airConditionings) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.airConditionings = airConditionings;
                cb(result);
            }
        })
    }
};

var getAirConditioning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'airConditioning': null
    };

    if (options.airConditioningID != null) {
        db.AirConditionings
        .findOne({'_id': options.airConditioningID})
        .exec(function (err, airConditioning) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.airConditioning = airConditioning;
                cb(result);
            }
        })
    }
};

exports.createAirConditioning = createAirConditioning;
exports.modifyAirConditioning = modifyAirConditioning;
exports.deleteAirConditioning = deleteAirConditioning;
exports.getAirConditionings = getAirConditionings;
exports.getAirConditioning = getAirConditioning;