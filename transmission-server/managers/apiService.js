var async = require("async");
var request = require('request');
var utils = require('../utils');
var config = require('../config').config;

var apiUrl = config.apiAddress;
var simulatorUrl = config.simulatorAddress;
var roomID = config.roomID;


var CAPTORS = [{
    "type": "OutsideLight",
    "value": 120
},{
    "type": "OutsideLight",
    "value": 150
},{
    "type": "InsideLight",
    "value": 60
}]


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
}

var setValues = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'response': null
    }

    if (utils.checkProperty(options.opacity) && utils.checkProperty(options.lightPower)) {
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
                if (utils.checkProperty(CAPTORS) && utils.checkProperty(mode.light) && utils.checkProperty(options.room.maxLux) && utils.checkProperty(options.room._id) && utils.checkProperty(options.room.temperature)) {
                    var captors = CAPTORS;
                    var lightNeeded = mode.light;
                    var maxLux = options.room.maxLux;
                    var roomID = options.room._id;

                    calculateLight({
                        "captors": captors,
                        "lightNeeded": mode.light,
                        "maxLux": options.room.maxLux,
                        "roomID": roomID
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
                                result.data = response.response;
                                cb(result);
                            }                            
                        })
                    })
                } else {
                    result.error = "Des données sont manquantes";
                    cb(result);
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

    if (utils.checkProperty(CAPTORS) && utils.checkProperty(options.room.light) && utils.checkProperty(options.room.maxLux) && utils.checkProperty(options.room._id) && utils.checkProperty(options.room.temperature)) {
        var captors = CAPTORS;
        var lightNeeded = options.room.light;
        var maxLux = options.room.maxLux;
        var roomID = options.room._id;

        calculateLight({
            "captors": captors,
            "lightNeeded": lightNeeded,
            "maxLux": maxLux,
            "roomID": roomID
        }, function (result) {
            setValues({
                "opacity": result.values.opacity,
                "lightPower": result.values.lightPower,
                "temperature": options.room.temperature
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

    getRoom(function (response) {
        if (response.error) {
            result.error = response.error;
            cb(result);
        } else if (!response.room) {
            result.error = "La room n'existe pas";
            cb(result);
        } else {
            room = response.room;
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

                        }, function (res) {
                            console.log('res IA : ', res)
                        })
                        callback();
                    } else {
                        callback();
                    }
                },
                function (callback) { // user
                    if (!roomModified) {
                        applyUserModifications({
                            "captors": CAPTORS,
                            "roomID": room._id,
                            "lightNeeded": room.light,
                            "maxLux": room.maxLux
                        }, function (res) {
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