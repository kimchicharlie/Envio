var models = require('../models');

var createCaptor = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'captor': null
    };

    if (options.room && options.type && options.value) {
        models.Room.findById(options.room).then(function (room) {
            return models.Captor.create({
                "type" : options.type,
                "value" : options.value,
            }).then(function(captor) {
                captor.setRoom(room.id);
                result.captor = captor.dataValues;
                cb(result);
            });
        })
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
        models.Captor.update(options, {
          where: {
            id: options.captorID,
          },
        }).then(function(res) {
            models.Captor.findOne({
                where: {
                    id: options.captorID
                }
            }).then(function(captor) {
                result.captor = captor.dataValues;
                cb(result);
            })
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
        models.Captor.destroy({
          where: {
            id: options.captorID,
          }
        }).then(function (captor) {
            result.captor = captor.dataValues;
            cb(result);
        });
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
    
    models.Captor.findAll({
        where : {
            roomId: options.room
        }
    }).then(function(captors) {
        result.captors = captors;
        cb(result);
    });
};

var getCaptor = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'captor': null
    };

    models.Captor.findById(options.captorID)
    .then(function(captor) {
        if (captor) {
            result.captor = captor.dataValues;
            cb(result);
        } else {
            result.error = "Captor not found";
            cb(result);
        }
    })
};

exports.createCaptor = createCaptor;
exports.modifyCaptor = modifyCaptor;
exports.deleteCaptor = deleteCaptor;
exports.getCaptors = getCaptors;
exports.getCaptor = getCaptor;