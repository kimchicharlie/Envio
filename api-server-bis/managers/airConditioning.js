var models = require('../models');
var utils = require('../utils.js');

var createAirConditioning = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'airConditioning': null
    };
    if (options.room && options.temperatureWanted) {
        models.Room.findById(options.room).then(function (room) {
            return models.AirConditioning.create({
                "temperatureWanted" : options.temperatureWanted
            }).then(function(airConditioning) {
                airConditioning.setRoom(room.dataValues.id);
                result.airConditioning = utils.changeIdToMongo(airConditioning);
                cb(result);
            });
        })
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
        models.AirConditioning.update(options, {
          where: {
            id: options.airConditioningID,
          },
        }).then(function(res) {
            models.AirConditioning.findOne({
                where: {
                    id: options.airConditioningID
                }
            }).then(function(airConditioning) {
                result.airConditioning = utils.changeIdToMongo(airConditioning);
                cb(result);
            })
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
        models.AirConditioning.destroy({
          where: {
            id: options.airConditioningID,
          }
        }).then(function (airConditioning) {
            result.airConditioning = utils.changeIdToMongo(airConditionin);
            cb(result);
        });
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

    models.AirConditioning.findAll({
        where : {
            roomId: options.room
        }
    }).then(function(airConditionings) {
        result.airConditionings = utils.changeArrayIdToMongo(airConditionings);
        cb(result);
    });
};

var getAirConditioning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'airConditioning': null
    };

    models.AirConditioning.findById(options.airConditioningID)
    .then(function(airConditioning) {
        if (airConditioning) {
            result.airConditioning = utils.changeIdToMongo(airConditioning);
            cb(result);
        } else {
            result.error = "AirConditioning not found";
            cb(result);
        }
    })
};

exports.createAirConditioning = createAirConditioning;
exports.modifyAirConditioning = modifyAirConditioning;
exports.deleteAirConditioning = deleteAirConditioning;
exports.getAirConditionings = getAirConditionings;
exports.getAirConditioning = getAirConditioning;
