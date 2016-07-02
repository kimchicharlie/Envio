var async = require("async");
var db = require("../database");

var addStat = function (options, cb) {
    cb = cb || function () {};

    var result = {
        'error': null,
        'mode': null
    };
    if (Number(options.realLight) && Number(options.neededLight) && Number(options.realTemperature) && Number(options.neededTemperature) && options.roomID) {
          
        var newStat = new db.Stats({
            "realLight" : options.realLight * 10000,
            "neededLight" : options.neededLight,
            "realTemperature" : options.realTemperature,
            "neededTemperature" : options.neededTemperature,
            "room": options.roomID
        });
        newStat.save(function (error) {
            if (error) {
                result.error = error;
                cb(result);
            } else {
                result.stat = newStat;
                cb(result)
                //CalcTrendLine(options.roomID,cb)
            }
        });
    } else {
        result.error = "Des données sont manquantes";
        cb(result);
    }
};

var CalcTrendLine = function (roomID, cb)
{
        db.Stats
        .find({'room': roomID})
        .exec(function (err, result) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                if (result.length > 10){
                    Y = 'realLight';
                    X = 'neededLight';

                    var n = result.length;
                    var sumX = 0.00;
                    var sumY = 0.00;
                    var sumXY = 0.00;
                    var sumXsquare = 0.00;

                        for (i in result){
                            //console.log("{"+ result[i][X] + "," + result[i][Y]+"}")
                            sumX += result[i][X]
                            sumY += result[i][Y]
                            sumXY += (result[i][X] * result[i][Y])
                            sumXsquare += (result[i][X] * result[i][X]) 
                        }
                    var a = sumXY * n
                    var b = sumX * sumY
                    var c = sumXsquare * n
                    var d = sumX * sumX
                    var m = (a - b) / (c - d)
                    var e = sumY
                    var f = m * sumX
                    var off = (e - f) / n
                    cb(
                    {
                        "m" : m,
                        "off" : off
                    })

                }
                else{
                    cb();
                }
            }
        })
}

exports.addStat = addStat;
