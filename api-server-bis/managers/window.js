var models = require('../models');
var utils = require('../utils.js');

var createWindow = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'window': null
    };

    if (options.room && options.orientation && options.size && options.opacity && options.opacityWanted) {
        models.Room.findById(options.room).then(function (room) {
            return models.Window.create({
                "orientation" : options.orientation,
                "size" : options.size,
                "opacity" : options.opacity,
                "opacityWanted" : options.opacityWanted,
            }).then(function(window) {
                window.setRoom(room.dataValues.id);
                result.window = utils.changeIdToMongo(window);
                cb(result);
            });
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var modifyWindow = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'window': null
    };

    if (options.windowID) {
        models.Window.update(options, {
          where: {
            id: options.windowID,
          },
        }).then(function(res) {
            models.Window.findOne({
                where: {
                    id: options.windowID
                }
            }).then(function(window) {
                result.window = utils.changeIdToMongo(window);
                cb(result);
            })
        })
    } else {
        result.error = "Requête incorrecte";
        cb(result);
    }
}

var deleteWindow = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'window': null
    };
    if (options.windowID) {
        models.Window.destroy({
          where: {
            id: options.windowID,
          }
        }).then(function (window) {
            result.window = utils.changeIdToMongo(window);
            cb(result);
        });
    } else {
        result.error = "Requête incorrecte";
        cb(result);
    }
}



var getWindows = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'windows': null
    };

    models.Window.findAll({
        where : {
            roomId: options.room
        }
    }).then(function(windows) {
        result.windows = utils.changeArrayIdToMongo(windows);
        cb(result);
    });
};

var getWindow = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'window': null
    };

    models.Window.findById(options.windowID)
    .then(function(window) {
        if (window) {
            result.window = utils.changeIdToMongo(window);
            cb(result);
        } else {
            result.error = "Window not found";
            cb(result);
        }
    })
};

exports.createWindow = createWindow;
exports.modifyWindow = modifyWindow;
exports.deleteWindow = deleteWindow;
exports.getWindows = getWindows;
exports.getWindow = getWindow;
