var async = require('async');
var models = require('../models');
var statManager = require('./stat.js');
var communicationManager = require('./communication.js');

var createRoom = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.create(options, {
        include: [
            { model: models.Window, as: 'windows' },
            { model: models.AirConditioning, as: 'airConditionings' },
            { model: models.Captor, as: 'captors' }
        ]
    }).then(function(room) {
        result.room = room.dataValues;
        cb(result);
    })
}

var getRoom = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.findById(options.roomID, {
        include: [
            { model: models.Window, as: 'windows' },
            { model: models.AirConditioning, as: 'airConditionings' },
            { model: models.Captor, as: 'captors' }
        ]
    })
    .then(function(room) {
        if (room) {
            result.room = room.dataValues;
            cb(result);
        } else {
            result.error = "Room not found";
            cb(result);
        }
    })
};

var modifyRoom = function (options, cb) {
    cb = cb || function () {};

    var roomObject = {
        "name": options.newName || options.name,
        "volume": options.volume
    }

    var result = {
        'error': null,
        'room': null
    };

    models.Room.update(roomObject, {
      where: {
        name: options.name,
      },
    }).then(function(res) {
        models.Room.findOne({
            where: {
                name: options.newName || options.name,
            }
        }).then(function(room) {
            result.room = room.dataValues;
            cb(result);
        })
    })
}

var deleteRoom = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'room': null
    };

    models.Room.destroy({
      where: {
        id: options.roomID,
      }
    }).then(function (room) {
        result.room = room.dataValues;
        cb(result);
    });
}

var modifyData = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.update({
        "data": options.data
    }, {
      where: {
        name: options.name,
      },
    }).then(function(res) {
        models.Room.findOne({
            where: {
                name: options.name,
            }
        }).then(function(room) {
            result.room = room.dataValues;
            cb(result);
        })
    })
}


var switchIA = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.findById(options.roomID)
    .then(function(roomToUpdate) {
        models.Room.update({
            "artificialIntellligence": !roomToUpdate.artificialIntellligence
        }, {
          where: {
            id: options.roomID,
          },
        }).then(function(res) {
            models.Room.findById(options.roomID)
            .then(function(room) {
                result.room = room.dataValues;
                cb(result);
            })
        })
    })

    
};

var getRoomPlusHardware = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.findById(options.roomID, {
        include: [
            { model: models.Window, as: 'windows' },
            { model: models.AirConditioning, as: 'airConditionings' },
            { model: models.Captor, as: 'captors' }
        ]
    })
    .then(function(room) {
        if (room) {
            result.room = room.dataValues;
            cb(result);
        } else {
            result.error = "Room not found";
            cb(result);
        }
    })
};

var getRooms = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'rooms': null
    };

    models.Room.findAll({
        include: [
            { model: models.Window, as: 'windows' },
            { model: models.AirConditioning, as: 'airConditionings' },
            { model: models.Captor, as: 'captors' }
        ]
    }).then(function(rooms) {
        result.rooms = rooms;
        cb(result);
    });
};


var changeLightWithoutStat = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.update({
        "light": options.light
    }, {
      where: {
        id: options.roomID,
      },
    }).then(function(res) {
        models.Room.findById(options.roomID).then(function(room) {
            result.room = room.dataValues;
            cb(result);
        })
    })
};

var changeTemperatureWithoutStat = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.update({
        "temperature": options.temperature
    }, {
      where: {
        id: options.roomID,
      },
    }).then(function(res) {
        models.Room.findById(options.roomID).then(function(room) {
            result.room = room.dataValues;
            cb(result);
        })
    })
};

var changeTemperature = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.update({
        "temperature": options.temperature
    }, {
      where: {
        id: options.roomID,
      },
    }).then(function(res) {
        models.Room.findById(options.roomID).then(function(room) {
            statManager.addStat({
                "realLight": room.realLight,
                "neededLight": room.light,
                "realTemperature": room.realTemperature,
                "neededTemperature": room.temperature,
                "roomId": room.id
            }, function (response) {
                if (!response.error && response.m && response.off) {
                    models.Room.update({
                        "m": response.m,
                        "off": response.off
                    }, {
                      where: {
                        id: options.roomID,
                      },
                    }) 
                }
            })
            result.room = room.dataValues;
            cb(result);
        })
    })
};

var changeLight = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.update({
        "light": options.light
    }, {
      where: {
        id: options.roomID,
      },
    }).then(function(res) {
        models.Room.findById(options.roomID).then(function(room) {
            communicationManager.modifyLight({
                "captors": room.captors,
                "lightNeeded": room.light,
                "maxLux": room.maxLux,
                "roomID": room._id
            }, function (response) {
                console.log('response : ', response)
            })
            statManager.addStat({
                "realLight": room.realLight,
                "neededLight": room.light,
                "realTemperature": room.realTemperature,
                "neededTemperature": room.temperature,
                "roomId": room.id
            }, function (response) {
                if (!response.error && response.m && response.off) {
                    models.Room.update({
                        "m": response.m,
                        "off": response.off
                    }, {
                      where: {
                        id: options.roomID,
                      },
                    }) 
                }
            })
            result.room = room.dataValues;
            cb(result);
        })
    })
};

var addEventPlanning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    var eventPlanning = {
        'name': null,
        'mode': null,
        'dateBegin': null,
        'dateEnd': null  
    }

    if (options.roomID != null) {
        db.Rooms
        .findOne({'_id': options.roomID})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                if (options.eventName && options.modeID && options.dateBegin && options.dateEnd) {
                    eventPlanning.name = options.eventName;
                    eventPlanning.mode = options.modeID;
                    eventPlanning.dateBegin = options.dateBegin;
                    eventPlanning.dateEnd = options.dateEnd;

                    room.planning.push(eventPlanning);
                    room.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.room = room;
                            cb(result);
                        }
                    });
                } else {
                    result.error = "Des informations nécessaires sont manquantes";
                    cb(result);
                }
            }
        })
    } else {
        result.error = "Veuillez spécifier une roomID";
        cb(result);
    }
};

var removeEventPlanning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };
    if (options.roomID != null) {
        db.Rooms
        .findOne({'_id': options.roomID})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                if (options.eventName && options.dateBegin) {
                    for (var i = 0; i < room.planning.length; i++) {
                        if (room.planning[i].name == options.eventName && room.planning[i].dateBegin == options.dateBegin) {
                            room.planning.splice(i, 1);
                        }
                    };

                    room.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.room = room;
                            cb(result);
                        }
                    });
                } else {
                    result.error = "Des informations nécessaires sont manquantes";
                    cb(result);
                }
            }
        })
    } else {
        result.error = "Veuillez spécifier une roomID";
        cb(result);
    }
};

var modifyEventPlanning = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };
    if (options.newDateBegin && options.newDateEnd && options.eventName && options.modeID && options.roomID && options.dateBegin && options.dateEnd) {
        
        var planning = {
            "name": options.eventName,
            "mode": null,
            "dateBegin": null,
            "dateEnd": null
        }

        if (options.newName) {
            planning.name = options.newName;
        }
        planning.mode = options.modeID;
        planning.dateBegin = options.newDateBegin;
        planning.dateEnd = options.newDateEnd;

        if (options.roomID != null) {
            db.Rooms
            .findOne({'_id': options.roomID})
            .exec(function (err, room) {
                if (err) {
                    result.error = err;
                    cb(result);
                } else {
                    
                    for (var i = 0; i < room.planning.length; i++) {
                        if (room.planning[i].name == options.eventName && room.planning[i].dateBegin == options.dateBegin && room.planning[i].dateEnd == options.dateEnd ) {
                            room.planning.splice(i, 1);
                        }
                    };

                    room.planning.push(planning);
                    room.save(function (error, res) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.room = room;
                            cb(result);
                        }
                    });
                }
            })
        } else {
            result.error = "Veuillez spécifier une roomID";
            cb(result);
        }
        } else {
            result.error = "Des informations nécessaires sont manquantes";
            cb(result);
        }
};

exports.createRoom = createRoom;
exports.modifyRoom = modifyRoom;
exports.deleteRoom = deleteRoom
exports.modifyData = modifyData;
exports.getRoom = getRoom;
exports.getRoomPlusHardware=getRoomPlusHardware;
exports.getRooms = getRooms;
exports.changeTemperature = changeTemperature;
exports.changeLight = changeLight;
exports.addEventPlanning = addEventPlanning;
exports.removeEventPlanning = removeEventPlanning;
exports.modifyEventPlanning = modifyEventPlanning;
exports.switchIA = switchIA;
exports.changeLightWithoutStat = changeLightWithoutStat;
exports.changeTemperatureWithoutStat = changeTemperatureWithoutStat;