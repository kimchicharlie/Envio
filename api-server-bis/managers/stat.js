var models = require('../models');

var getStats = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'stats': null
    };

    models.Stat.findAll().then(function(stats) {
        result.stats = stats;
        cb(result);
    });
}

var getStatsFromRoomId = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'stats': null
    };

    models.Stat.findAll({
        where : {
            roomId: options.roomID
        }
    }).then(function(stats) {
        result.stats = stats;
        cb(result);
    });
}

var addStat = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'stat': null
    };

    models.Stat.create({
        "realLight" : options.realLight,
        "neededLight" : options.neededLight,
        "realTemperature" : options.realTemperature,
        "neededTemperature" : options.neededTemperature,
        "roomId": options.roomId
    }).then(function(stat) {
        CalcTrendLine(options.roomId, function (result) {
            if (result.error) {
                console.log('Error : ', result.error);
            } else {
                cb(result);
            }
        });
    })
};

var CalcTrendLine = function (roomID, cb)
{
    models.Stat.findAll({
        where : {
            roomId : roomID
        }
    }).then(function(stats) {
        if (!stats) {
            cb({
                'error' : "CalcTrendLine : Pas suffisemment de stats disponibles"
            });
        } else {
            if (stats.length > 10){
                Y = 'realLight';
                X = 'neededLight';

                var n = stats.length;
                var sumX = 0.00;
                var sumY = 0.00;
                var sumXY = 0.00;
                var sumXsquare = 0.00;
                    for (i in stats){
                        //console.log("{"+ stats[i][X] + "," + stats[i][Y]+"}")
                        sumX += stats[i][X]
                        sumY += stats[i][Y]
                        sumXY += (stats[i][X] * stats[i][Y])
                        sumXsquare += (stats[i][X] * stats[i][X]) 
                    }
                var a = sumXY * n
                var b = sumX * sumY
                var c = sumXsquare * n
                var d = sumX * sumX
                var m = (a - b) / (c - d)
                var e = sumY
                var f = m * sumX
                var off = (e - f) / n
                cb({
                    "m" : m,
                    "off" : off
                })

            }
            else{
                cb({
                    "m" : 0,
                    "off" : 0
                });
            }
        }
    });
}

exports.addStat = addStat;
exports.getStats = getStats;
exports.getStatsFromRoomId = getStatsFromRoomId;
