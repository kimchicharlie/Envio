var models = require('../models');

var createMode = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };

    models.Mode.create(options).then(function(mode) {
        result.mode = mode.dataValues;
        cb(result);
    })
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
                            result.error = "newName is missing"
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.light) {
                            mode.light = options.light;
                            callback();
                        } else {
                            result.error = "light is missing"
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.opacity) {
                            mode.opacity = options.opacity;
                            callback();
                        } else {
                            result.error = "opacity is missing"
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.temperature) {
                            mode.temperature = options.temperature;
                            callback();
                        } else {
                            result.error = "temperature is missing"
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

    models.Mode.findAll().then(function(modes) {
        result.modes = modes;
        cb(result);
    });
};

var getMode = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };

    models.Mode.findOne({
      where: {
        id: options.modeID,
      },
    }).then(function(mode) {
        if (mode) {
            result.mode = mode.dataValues;
            cb(result);
        } else {
            result.error = "Mode not found";
            cb(result);
        }
    })
};

exports.createMode = createMode;
exports.modifyMode = modifyMode;
exports.deleteMode = deleteMode;
exports.getModes = getModes;
exports.getMode = getMode;