var async = require("async");
var request = require('request');
var utils = require('../utils');
var config = require('../config').config;
var http = require('http')
var apiUrl = config.apiAddress;
var simulatorUrl = config.simulatorAddress;
var roomID = config.roomID;
var saveRoom = null;
var modeApplied = false;

var CAPTORS = [
    {
    "type": "OutsideLight",
    "value": 22000
    },{
    "type": "InsideLight",
    "value": 2000
    }
]



var getRoom = function(cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'room': null
    }

    if (utils.checkProperty(roomID)) {
        var objectToSend = {
            "roomID": roomID,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: apiUrl + '/getRoomPlusHardware',                    
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                result.error = "Can't reach Envio API";
                cb(result);
            } else {
                result.room = body.room;
                cb(result);
            }
        })

    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var modifyLight = function(roomID, light){
    var result = {
        'error': null,
        'room': null
    }

    if (utils.checkProperty(roomID) && utils.checkProperty(light)) {
        var objectToSend = {
            "roomID": roomID,
            "light": light,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: apiUrl + '/changeLightWithoutStat',
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                console.log("Can't reach Envio API");
            } else {
                saveRoom = body.room
            }
        })

    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var modifyTemperature = function(roomID, temperature){
    var result = {
        'error': null,
        'room': null
    }

    if (utils.checkProperty(roomID) && utils.checkProperty(temperature)) {
        var objectToSend = {
            "roomID": roomID,
            "temperature": temperature,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: apiUrl + '/changeTemperatureWithoutStat',
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                console.log("Can't reach Envio API");
            } else {
                saveRoom = body.room
            }
        })

    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var getMode = function(modeID, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    }

    if (utils.checkProperty(modeID)) {
        var objectToSend = {
            "modeID": modeID,
            "api_key": config.envioApiAccessKey
        }

        request({
            url: apiUrl + '/getMode',
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                result.error = "Can't reach Envio API";
                cb(result);
            } else {
                result.mode = body.mode;
                cb(result);
            }
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var getCaptor = function(cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    }
    http.get({
        host: 'localhost',
        port: '9876'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var captor = JSON.parse(body);
                CAPTORS[0].value = captor.lightOutSide
                CAPTORS[1].value = captor.lightInSide
            })
        });    
}

var setValues = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'response': null
    }

    if (utils.checkProperty(options.opacity) && utils.checkProperty(options.lightPower) && utils.checkProperty(options.temperature)) {
        var objectToSend = {
            "window": options.opacity,
            "lightPower": options.lightPower,
            "airConditioning": options.temperature
        }

        console.log('Values to send : ', objectToSend);
        console.log('Trying to reach simulator...');

        request({
            url: simulatorUrl,
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                result.error = "Can't reach Simulator";
                cb(result);
            } else {
                result.response = body;
                cb(result);
            }
        })

    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
}

var calculateLight = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        "opacity": 0,
        "lightPower": 0
    };

    var lightLux = 0;
    var lightPower = 0;
    var opacity = 0;
    var lightNeededLux = 0;
    var lightCaptors = {
        "outside": {
            "averageValue": 0,
            "number": 0
        },
        "inside": {
            "averageValue": 0,
            "number": 0
        }
    }

    if (utils.checkProperty(options.captors) && utils.checkProperty(options.roomID) && utils.checkProperty(options.lightNeeded) && utils.checkProperty(options.maxLux)) {
        for (var i = 0; i < options.captors.length; i++) {
            if (options.captors[i].type == 'OutsideLight') {
                lightCaptors.outside.averageValue += options.captors[i].value;
                lightCaptors.outside.number += 1;
            } else if (options.captors[i].type == 'InsideLight') {
                lightCaptors.inside.averageValue += options.captors[i].value;
                lightCaptors.inside.number += 1;
            }
        }

        if (lightCaptors.outside.number > 0 && lightCaptors.inside.number > 0) {
            lightCaptors.outside.averageValue = Math.round(lightCaptors.outside.averageValue / lightCaptors.outside.number);
            lightCaptors.inside.averageValue = Math.round(lightCaptors.inside.averageValue / lightCaptors.inside.number);
        }

        lightNeededLux = options.lightNeeded * (options.maxLux / 100);
        
        if (lightCaptors.outside.averageValue > lightNeededLux) {
            var tmp = lightNeededLux * 100 / lightCaptors.outside.averageValue;
            opacity = Math.round(100 - tmp);
            if (opacity > 90) {
                opacity = 90;
            }
            lightPower = 0;
        } else {
            opacity = 0;
            lightLux = lightNeededLux - lightCaptors.outside.averageValue;
            lightPower = Math.round(lightLux * (100 / options.maxLux));
        }

        // console.log('outside light : ', lightCaptors.outside.averageValue);
        // console.log('lightNeeded : ', options.lightNeeded);
        // console.log('lightNeededLux : ', lightNeededLux);
        // console.log('lumMax : ', options.maxLux);
        // console.log('lightLux : ', lightLux);
        // console.log('opacity : ', opacity);
        // console.log('lightPower : ', lightPower);

        result.lightPower = lightPower;
        result.opacity = opacity;
        cb(result);
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
}

var updateRoomValues = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null
    }

    if (utils.checkProperty(options.room) && utils.checkProperty(options.temperature) && utils.checkProperty(options.opacity)) {
        async.series([
            function (callback) {
                async.eachSeries(options.room.windows, function (Window, cbWindow) {
                    request({
                        url: apiUrl + "/modifyWindow",
                        method: "POST",
                        json: {
                            'windowID' : Window,
                            'opacityWanted' : options.opacity
                        }
                    }, function (error, response, body) {
                        if (!response) {
                            result.error = "Can't reach API";
                            cb(result);
                        } else {
                            cbWindow();
                        }
                    })
                }, function () {
                    callback();
                })
            },
            function (callback) {
                async.eachSeries(options.room.airConditionings, function (airConditioning, cbAirConditioning) {
                    request({
                        url: apiUrl + "/modifyAirConditioning",
                        method: "POST",
                        json: {
                            'airConditioningID' : airConditioning,
                            'temperatureWanted' : options.temperature
                        }
                    }, function (error, response, body) {
                        if (!response) {
                            result.error = "Can't reach API";
                            cb(result);
                        } else {
                            cbAirConditioning();
                        }
                    })
                }, function () {
                    callback();
                })
            }
        ], function () {
            cb(result);
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
}

var applyPlanningMode = function(options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'data': null
    }

    var mode = null;

    if (utils.checkProperty(options.modeID) && utils.checkProperty(options.room)) {
        getMode(options.modeID, function (res) {
            if (res.error) {
                result.error = res.error;
                cb(result);
            } else {
                mode = res.mode;
                if (mode.light != saveRoom.light && mode.temperature != saveRoom.temperature) {
                    if (utils.checkProperty(CAPTORS) && utils.checkProperty(mode.light) && utils.checkProperty(options.room.maxLux) && utils.checkProperty(options.room._id) && utils.checkProperty(options.room.temperature) ) {
                        var captors = CAPTORS;
                        var lightNeeded = mode.light;
                        var maxLux = options.room.maxLux;
                        var roomID = options.room._id;

                        modifyLight(roomID, mode.light);
                        modifyTemperature(roomID, mode.temperature);

                        calculateLight({
                            "captors": captors,
                            "lightNeeded": mode.light,
                            "maxLux": options.room.maxLux,
                            "roomID": roomID
                        }, function (calcResults) {
                            setValues({
                                "opacity": calcResults.opacity,
                                "lightPower": calcResults.lightPower,
                                "temperature": mode.temperature
                            }, function (response) {
                                if (response.error) {
                                    result.error = response.error;
                                    cb(result);
                                } else {
                                    updateRoomValues({
                                        "room": options.room,
                                        "temperature": mode.temperature,
                                        "opacity": calcResults.opacity
                                    }, function (updateResult) {
                                        if (!updateResult.error) {
                                            result.data = response.response;
                                            cb(result);
                                        } else {
                                            result.error = "Erreur lors de l'update de la room";
                                            cb(result);
                                        }
                                    })
                                    
                                }                            
                            })
                        })
                    } else {
                        result.error = "Des données sont manquantes";
                        cb(result);
                    }
                }
            }
        }) 
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
}

var applyUserModifications = function(options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'data': null
    }
    if (utils.checkProperty(options.captors) && utils.checkProperty(options.lightNeeded) && utils.checkProperty(options.maxLux) && utils.checkProperty(options.roomID) && utils.checkProperty(options.temperature)) {
        var captors = options.captors;
        var lightNeeded = options.lightNeeded;
        var maxLux = options.maxLux;
        var roomID = options.roomID;

        calculateLight({
            "captors": captors,
            "lightNeeded": lightNeeded,
            "maxLux": maxLux,
            "roomID": roomID
        }, function (result) {
            setValues({
                "opacity": result.opacity,
                "lightPower": result.lightPower,
                "temperature": options.temperature
            }, function (response) {
                result.data = response;
                cb(result);
            })
        })
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
}

var applyIAMode = function(options, cb) {
    cb = cb || function () {};
    room  = options.room;

    var result = {
        'error': null,
        'data': null
    }
    console.log(CAPTORS)
    if (room.m > 0 && room.off > 0){
        var val = parseInt((CAPTORS[0].value - room.off) / room.m)

        modifyLight(room._id, val);
        modifyTemperature(roomID, options.room.temperature);

        calculateLight({
            "captors": CAPTORS,
            "lightNeeded": val,
            "maxLux": room.maxLux,
            "roomID": room._id
        }, function (calcResults) {
            setValues({
                "opacity": calcResults.opacity,
                "lightPower": calcResults.lightPower,
                "temperature": options.room.temperature
            }, function (response) {
                if (response.error) {
                    result.error = response.error;
                    cb(result);
                } else {
                    updateRoomValues({
                        "room": room,
                        "temperature": options.room.temperature,
                        "opacity": calcResults.opacity
                    }, function (updateResult) {
                        if (!updateResult.error) {
                            result.data = response.response;
                            cb(result);
                        } else {
                            result.error = "Erreur lors de l'update de la room";
                            cb(result);
                        }
                    })
                }                            
            })
        })       
    }
}

var handleChanges = function(cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'room': null
    }
    var dateNow = new Date();
    var room = null;
    var roomModified = false;

    getCaptor();
    getRoom(function (response) {
        if (response.error) {
            result.error = response.error;
            cb(result);
        } else if (!response.room) {
            result.error = "La room n'existe pas";
            cb(result);
        } else {            
            room = response.room;
            if (saveRoom == null)
                saveRoom = room
            async.series([
                function (callback) { // planning
                    var dateBegin;
                    var dateEnd;

                    if (room.planning.length > 0) {
                        async.each(room.planning, function (timeslot, cbTimeslot) {
                            dateBegin = new Date(timeslot.dateBegin);
                            dateEnd = new Date(timeslot.dateEnd);

                            if (dateBegin <= dateNow && dateNow < dateEnd) {
                                roomModified = true;
                                applyPlanningMode({
                                    "room": room,
                                    "modeID": timeslot.mode
                                }, function (res) {
                                    console.log('res Planning : ', res)
                                    saveRoom = room
                                    callback();
                                })
                            } else {
                                cbTimeslot();
                            }
                        }, function () {
                            callback();
                        })
                    } else {
                        callback();
                    }
                },
                function (callback) { // IA
                    if (room.artificialIntellligence && !roomModified) {
                        applyIAMode({
                            "room": room,
                        }, function (res) {
                            console.log('res IA : ', res)
                        })
                        callback();
                    } else {
                        callback();
                    }
                },
                function (callback) { // user
                    if (room.light != saveRoom.light) {
                        applyUserModifications({
                            "captors": CAPTORS,
                            "roomID": room._id,
                            "lightNeeded": room.light,
                            "maxLux": room.maxLux,
                            "temperature" : room.temperature
                        }, function (res) {
                            saveRoom = room
                            console.log('res User Modifications : ', res);
                        }) 
                    } else {
                        callback();
                    }
                    
                }
            ], function (err) {
                if (err) {
                    result.error = err;
                    cb(result);
                } else {

                }
            })
        }
    })
}

exports.getRoom = getRoom;
exports.getCaptor = getCaptor;
exports.calculateLight = calculateLight;
exports.applyPlanningMode = applyPlanningMode;
exports.applyUserModifications = applyUserModifications;
exports.applyIAMode = applyIAMode;
exports.handleChanges = handleChanges;
exports.modifyLight = modifyLight;
exports.modifyTemperature = modifyTemperature;
exports.updateRoomValues = updateRoomValues;