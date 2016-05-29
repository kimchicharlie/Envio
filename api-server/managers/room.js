var async = require("async");
var db = require("../database");
var statManager = require("./stat");

var createRoom = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    if (options.name && options.volume && options.organisation) {
        db.Rooms
        .findOne({'name': options.name})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (room) {
                result.error = "Ce nom de salle existe déjà";
                cb(result);
            } else {
                var newRoom = new db.Rooms({
                    "name" : options.name,
                    "organisation" : options.organisation,
                    "volume" : options.volume
                    /*"luminaires" : options.luminaires,
                    "airConditionings" : options.airConditionings,*/
                });

                newRoom.save(function (error)
                {
                    if (error) {
                        result.error = error;
                        cb(result);
                    } else {
                        result.room = newRoom;
                        cb(result);
                    }
                });
            }
        })
    }
};

var modifyRoom = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };
    if (options.name && options.volume && options.newName) {
        db.Rooms
        .findOne({'name': options.name})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!room) {
                result.error = "Cette salle n'existe pas";
                cb(result);
            } else {
                room.name = options.newName;
                room.volume = options.volume

                room.save(function (error) {
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
        result.error = "Requête incorrecte";
        cb(result);
    }
}

var deleteRoom = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'room': null
    };

    if (options.roomID) {
        db.Rooms
        .findOne({'_id': options.roomID})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!room) {
                result.error = "Ce room n'existe pas";
                cb(result);
            } else {
                room.remove(function (error) {
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


var modifyData = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    };

    if (options.name && options.data) {
        db.Rooms
        .findOne({'name': options.name})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!room) {
                result.error = "Cette salle n'existe pas";
                cb(result);
            } else {
                room.data = options.data;

                room.save(function (error) {
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
        result.error = "Requête incorrecte";
        cb(result);
    }
}

var getRoom = function (options, cb) {
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
                result.room = room;
                cb(result);
            }
        })
    }
};

var getRooms = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'rooms': null
    };

    if (options.organisation) {
        db.Rooms
        .find({'organisation': options.organisation})
        .exec(function (err, rooms) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.rooms = rooms;
                cb(result);
            }
        })
    }
};

var changeTemperature = function (options, cb) {
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
                if (options.temperature && options.temperature < 40 && options.temperature >= 1) {
                    room.temperature = options.temperature;
                    room.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            statManager.addStat({
                                "realLight": room.realLight,
                                "neededLight": room.light,
                                "realTemperature": room.realTemperature,
                                "neededTemperature": room.temperature,
                                "roomID": room._id
                            }, function (res) {
                                if (res.error) {
                                    result.error = res.error;
                                    cb(result);
                                } else {
                                    result.room = room;
                                    cb(result);
                                }
                            })
                        }
                    });
                } else {
                    result.error = "La température demandée est inexistante ou incohérente";
                    cb(result);
                }
            }
        })
    }
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
    if (options.newDateBegin && options.newDateEnd && options.eventName && options.modeID && options.dateBegin && options.dateEnd) {
        
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
exports.getRooms = getRooms;
exports.changeTemperature = changeTemperature;
exports.addEventPlanning = addEventPlanning;
exports.removeEventPlanning = removeEventPlanning;
exports.modifyEventPlanning = modifyEventPlanning;