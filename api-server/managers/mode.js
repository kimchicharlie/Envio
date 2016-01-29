var async = require("async");
var db = require("../database");

var createMode = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };
    if (options.name && options.light && options.organisation && options.opacity && options.temperature) {
        var newMode = new db.Modes({
            "name" : options.name,
            "organisation" : options.organisation,
            "light" : options.light,
            "opacity" : options.opacity,
            "temperature" : options.temperature
        });

        newMode.save(function (error) {
            if (error) {
                result.error = error;
                cb(result);
            } else {
                result.mode = newMode;
                cb(result);
            }
        });
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var modifyMode = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };

    if (options.modeID) {
        db.Modes
        .findOne({'_id': options.modeID})
        .exec(function (err, mode) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!mode) {
                result.error = "Ce mode n'existe pas";
                cb(result);
            } else {
                async.parallel([
                    function (callback) {
                        if (options.newName) {
                            mode.name = options.newName;
                            callback();
                        } else {
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.light) {
                            mode.light = options.light;
                            callback();
                        } else {
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.opacity) {
                            mode.opacity = options.opacity;
                            callback();
                        } else {
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.temperature) {
                            mode.temperature = options.temperature;
                            callback();
                        } else {
                            callback();
                        }
                    }
                ], function () {
                    mode.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.mode = mode;
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

var deleteMode = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };

    if (options.modeID) {
        db.Modes
        .findOne({'_id': options.modeID})
        .exec(function (err, mode) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!mode) {
                result.error = "Ce mode n'existe pas";
                cb(result);
            } else {
                mode.remove(function (error) {
                    if (error) {
                        result.error = error;
                        cb(result);
                    } else {
                        cb(result);
                    }
                });
            }
        })
    } else {
        result.error = "Requête incorrecte";
        cb(result);
    }
}

var getModes = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'modes': null
    };

    if (options.organisation) {
        db.Modes
        .find({'organisation': options.organisation})
        .exec(function (err, modes) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.modes = modes;
                cb(result);
            }
        })
    }
};

var getMode = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };

    if (options.modeID != null) {
        db.Modes
        .findOne({'_id': options.modeID})
        .exec(function (err, mode) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.mode = mode;
                cb(result);
            }
        })
    }
};

exports.createMode = createMode;
exports.modifyMode = modifyMode;
exports.deleteMode = deleteMode;
exports.getModes = getModes;
exports.getMode = getMode;