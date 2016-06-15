var async = require("async");
var db = require("../database");

var createWindow = function (options, cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'window': null
    };
    if (options.room && options.orientation && options.size && options.opacity && options.opacityWanted) {
        var newWindow = new db.Windows({
            "room" : options.room,
            "orientation" : options.orientation,
            "size" : options.size,
            "opacity" : options.opacityWanted,
            "opacityWanted" : options.opacityWanted,
        });

        newWindow.save(function (error) {
            if (error) {
                result.error = error;
                cb(result);
            } else {
                result.window = newWindow;
                db.Rooms.findByIdAndUpdate(
                    {"_id" : options.room},
                    {$push: {"windows" :  newWindow._id }},
                    {safe: true, upsert: true},
                    function(err, model) { 
                        if (err) {
                            result.error = err;
                            cb(result);
                            return;
                        } else {
                            cb(result);
                            return;
                        }
                    }
                );
            }
        });
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
        db.Windows
        .findOne({'_id': options.windowID})
        .exec(function (err, window) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!window) {
                result.error = "Cette vitre n'existe pas";
                cb(result);
            } else {
                async.parallel([
                    function (callback) {
                        if (options.orientation) {
                            window.orientation = options.orientation;
                            callback();
                        } else {
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.size) {
                            window.size = options.size;
                            callback();
                        } else {
                            callback();
                        }
                    },
                    function (callback) {
                        if (options.opacityWanted) {
                            window.opacityWanted = options.opacityWanted;
                            callback();
                        } else {
                            callback();
                        }
                    }
                ], function () {
                    window.save(function (error) {
                        if (error) {
                            result.error = error;
                            cb(result);
                        } else {
                            result.window = window;
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

var deleteWindow = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'window': null
    };
    if (options.windowID) {
        db.Windows
        .findOne({'_id': options.windowID})
        .exec(function (err, window) {
            if (err) {
                result.error = err;
                cb(result);
            } else if (!window) {
                result.error = "Ce window n'existe pas";
                cb(result);
            } else {
                window.remove(function (error) {
                    if (error) {
                        result.error = error;
                        cb(result);
                    } else {
                        db.Rooms.findByIdAndUpdate(
                            {"_id" : window.room},
                            {$pull: {"windows" :  options.windowID }},
                            {safe: true, upsert: true},
                            function(err, model) { 
                                if (err) {
                                    result.error = err;
                                    cb(result);
                                } else {
                                    cb(result);
                                }
                            }
                        );
                    }
                });
            }
        })
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
    
    if (options.room) {
        db.Windows
        .find({'room': options.room})
        .exec(function (err, windows) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.windows = windows;
                cb(result);
            }
        })
    }
};

var getWindow = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'window': null
    };

    if (options.windowID != null) {
        db.Windows
        .findOne({'_id': options.windowID})
        .exec(function (err, window) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.window = window;
                cb(result);
            }
        })
    }
};

exports.createWindow = createWindow;
exports.modifyWindow = modifyWindow;
exports.deleteWindow = deleteWindow;
exports.getWindows = getWindows;
exports.getWindow = getWindow;