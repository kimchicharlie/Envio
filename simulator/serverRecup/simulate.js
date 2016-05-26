var mongoose = require('mongoose');
var db = require("./database");
var express = require('express');
var app = express();

db.initDB();

var getRoom = function (cb) {

    var result = {
        'error': null,
        'room': null
    };

    if (process.argv[2] != null) {
        db.Rooms
        .findOne({'name': process.argv[2]})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                cb(result);
            } else {
                result.room = room;
                cb(result);
            }
        })
    }else{
        console.log("pas d'arguments!")
    }
};



app.get('/', function (req, res) {
    getRoom(function (rep)
            {   
                if (rep.error == null){        
                    var toSend = { 
                        "luminosityChosen" : rep.room.light,
                        "luminosity" : rep.room.realLight,
                        "TempChosen" : rep.room.temperature,
                        "TempInt": "20",
                        "TempExt" : rep.room.realTemperature
                    }
                    res.send(toSend);                 
                }
            })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
