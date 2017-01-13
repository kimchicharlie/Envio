var async = require('async');
var models = require('../models');
var statManager = require('./stat.js');
var communicationManager = require('./communication.js');
var utils = require('../utils.js');

var createRoom = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    models.Room.create(options).then(function(room) {
        result.room = utils.changeRoomIdsToMongo(room);
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
            result.room = utils.changeRoomIdsToMongo(room);
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
            result.room = utils.changeIdToMongo(room);
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
        result.room = utils.changeIdToMongo(room);
        cb(result);
    });
}

var modifyData = function (options, cb) {
    cb = cb || function () {};
    console.log('options : ', options)

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
          console.log('room : ', room)
            result.room = utils.changeIdToMongo(room);
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
                result.room = utils.changeIdToMongo(room);
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
            result.room = utils.changeRoomIdsToMongo(room);
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
        result.rooms = utils.changeArrayRoomIdsToMongo(rooms);
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
            result.room = utils.changeIdToMongo(room);
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
            result.room = utils.changeIdToMongo(room);
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
            result.room = utils.changeIdToMongo(room);
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
            result.room = utils.changeIdToMongo(room);
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

    var planningArray = [];

    if (options.roomID != null) {
        models.Room.findById(options.roomID).then(function(room) {
            if (!room) {
                result.error = "Room not found";
                cb(result);
            } else {
                if (options.eventName && options.modeID && options.dateBegin && options.dateEnd) {
                    eventPlanning.name = options.eventName;
                    eventPlanning.mode = options.modeID;
                    eventPlanning.dateBegin = options.dateBegin;
                    eventPlanning.dateEnd = options.dateEnd;

                    planningArray = room.dataValues.planning;
                    planningArray.push(eventPlanning);


                    models.Room.update({
                        "planning": planningArray
                    }, {
                      where: {
                        id: options.roomID,
                      },
                    }).then(function(res) {
                        models.Room.findById(options.roomID).then(function(room) {
                            result.room = utils.changeIdToMongo(room);
                            cb(result);
                        })
                    })
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

    var eventPlanning = {
        'name': null,
        'mode': null,
        'dateBegin': null,
        'dateEnd': null
    }

    var planningArray = [];

    if (options.roomID != null) {
        models.Room.findById(options.roomID).then(function(room) {
            if (!room) {
                result.error = "Room not found";
                cb(result);
            } else {
                if (options.eventName && options.dateBegin) {
                    planningArray = room.dataValues.planning;

                    for (var i = 0; i < planningArray.length; i++) {
                        if (planningArray[i].name == options.eventName && planningArray[i].dateBegin == options.dateBegin) {
                            planningArray.splice(i, 1);
                        }
                    };

                    models.Room.update({
                        "planning": planningArray
                    }, {
                      where: {
                        id: options.roomID,
                      },
                    }).then(function(res) {
                        models.Room.findById(options.roomID).then(function(room) {
                            result.room = utils.changeIdToMongo(room);
                            cb(result);
                        })
                    })
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
            models.Room.findById(options.roomID).then(function(room) {
                if (!room) {
                    result.error = "Room not found";
                    cb(result);
                } else {
                    if (options.eventName && options.dateBegin) {
                        planningArray = room.dataValues.planning;

                        for (var i = 0; i < planningArray.length; i++) {
                            if (planningArray[i].name == options.eventName && planningArray[i].dateBegin == options.dateBegin) {
                                planningArray.splice(i, 1);
                            }
                        };

                        planningArray.push(planning);

                        models.Room.update({
                            "planning": planningArray
                        }, {
                          where: {
                            id: options.roomID,
                          },
                        }).then(function(res) {
                            models.Room.findById(options.roomID).then(function(room) {
                                result.room = utils.changeIdToMongo(room);
                                cb(result);
                            })
                        })
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
