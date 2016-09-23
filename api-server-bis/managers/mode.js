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

    var modeObject = {
        
    }

    if (options.newName) {
        modeObject['name'] = options.newName;
    }
    if (options.light) {
        modeObject['light'] = options.light;
    }
    if (options.opacity) {
        modeObject['opacity'] = options.opacity;
    }
    if (options.temperature) {
        modeObject['temperature'] = options.temperature;
    }

    if (options.modeID) {
        models.Mode.update(modeObject, {
          where: {
            id: options.modeID,
          },
        }).then(function(res) {
            models.Mode.findOne({
                where: {
                    id: options.modeID,
                }
            }).then(function(mode) {
                result.mode = mode.dataValues;
                cb(result);
            })
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

    models.Mode.destroy({
      where: {
        id: options.modeID,
      }
    }).then(function (mode) {
        result.mode = mode.dataValues;
        cb(result);
    });
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