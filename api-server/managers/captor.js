var async = require("async");
var db = require("../database");

var createCaptor = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'captor': null
    };
    if (options.room && options.type && options.value ) {
        var newCaptor = new db.Captors({
            "room" : options.room,
            "type" : options.type,
            "value" : options.value,
        });

        newCaptor.save(function (error) {
            if (error) {
                result.error = error;
                cb(result);
            } else {
                result.captor = newCaptor;
                db.Rooms.findByIdAndUpdate(
                    {"_id" : options.room},
                    {$push: {"captors" :  newCaptor._id }},
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

var modifyCaptor = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'captor': null
    };

    if (options.captorID) {
        db.Captors
        .findOne({'_id': options.captorID})
        .exec(function (err, captor) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!captor) {
                result.error = "Cette vitre n'existe pas";
                cb(result);
            } else {
                async.parallel([
                    function (callback) {
                        if (options.type) {
                            captor.type = options.type;
                            callback();
                        } else {
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.value) {
                            captor.value = options.value;
                            callback();
                        } else {
                            callback();
                        }
                    }
                ], function () {
                    captor.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.captor = captor;
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

var deleteCaptor = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'captor': null
    };
    if (options.captorID) {
        db.Captors
        .findOne({'_id': options.captorID})
        .exec(function (err, captor) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!captor) {
                result.error = "Ce captor n'existe pas";
                cb(result);
            } else {
                captor.remove(function (error) {
                    if (error) {
                        result.error = error;
                        cb(result);
                    } else {
                        db.Rooms.findByIdAndUpdate(
                            {"_id" : captor.room},
                            {$pull: {"captors" :  options.captorID }},
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

var getCaptors = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'captors': null
    };
    
    if (options.room) {
        db.Captors
        .find({'room': options.room})
        .exec(function (err, captors) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.captors = captors;
                cb(result);
            }
        })
    }
};

var getCaptor = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'captor': null
    };

    if (options.captorID != null) {
        db.Captors
        .findOne({'_id': options.captorID})
        .exec(function (err, captor) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.captor = captor;
                cb(result);
            }
        })
    }
};

exports.createCaptor = createCaptor;
exports.modifyCaptor = modifyCaptor;
exports.deleteCaptor = deleteCaptor;
exports.getCaptors = getCaptors;
exports.getCaptor = getCaptor;