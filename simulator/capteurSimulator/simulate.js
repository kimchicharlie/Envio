var mongoose = require('mongoose');
var db = require("./database");
var http = require('http');
var https = require('https');


db.initDB();


var getRoom = function () {

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
                console.log(result);
            } else {
                result.room = room;
                console.log(result);
            }
        })
    }else{
    	console.log("pas d'arguments!")
    }
};

var modifLigth = function (RoomName, light) {

    var result = {
        'error': null,
        'room': null
    };

    if (process.argv[2] != null) {
        db.Rooms
        .findOne({'name': RoomName})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                console.log(result);
            } else if (!room) {
                result.error = "Cette salle n'existe pas";
                console.log(result);
            } 
             else {
                room.realLight = parseFloat(light);

                room.save(function (error) {
                    if (error) {
                        result.error = error;
                        console.log(result);
                    } else {
                        result.room = room;
                        console.log(result.room);
                    }
                });
            }
        })
    }else{
        console.log("pas d'arguments!")
    }
};

var modifTemp = function (RoomName, temp) {

    var result = {
        'error': null,
        'room': null
    };

    if (process.argv[2] != null) {
        db.Rooms
        .findOne({'name': RoomName})
        .exec(function (err, room) {
            if (err) {
                result.error = err;
                console.log(result);
            } else if (!room) {
                result.error = "Cette salle n'existe pas";
                console.log(result);
            } 
             else {
                if(parseFloat(temp))
                room.realTemperature = parseFloat(temp);
                else{
                result.error = "temp error"
                console.log(result)
                }
                room.save(function (error) {
                    if (error) {
                        result.error = error;
                        console.log(result);
                    } else {
                        result.room = room;
                        console.log(result.room);
                    }
                });
            }
        })
    }else{
        console.log("pas d'arguments!")
    }
};



var getCoherance = function(roomName)
{
    http.get({
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?q=Paris,fr&units=metric&appid=c7f43ed96f94ccfabb40177a9dcbd243'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);    
            https.get({
                host: 'api.forecast.io',
                path: '/forecast/e64f1c8f686542cc6dccca139e627713/'+parsed.coord.lat +','+parsed.coord.lon
            }, function(response) {
                // Continuously update stream with data
                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    var darkparsed = JSON.parse(body);
                    modifLigth(roomName,(darkparsed.currently.visibility * 10))
                    modifTemp(roomName,parsed.main.temp)                    
                    })
                });
            });  
        });
}

var main = function (){
    var continyus = false;
    var temp = NaN;
    var light = NaN;
    var coherance = false;
    var roomName = false;
    var inter = 180;

        process.argv.forEach( function(element, index) {
            if(element == "-t")
                temp = parseFloat(process.argv[index+1]);
            if(element == "-r")
                roomName = process.argv[index+1];
            if(element == "-l")
                light = parseFloat(process.argv[index+1]);
            if(element == "-i")
                inter = parseInt(process.argv[index+1]);
            if(element == "-co")
                coherance = true;        
            if(element == "-c")
                continyus = true;
        });

    if(!roomName){
        console.log("NO room!")
        process.exit();
    }

    if (isNaN(temp) || continyus)
        temp = Math.random() * (40 - 10) + 10 ;
    if (isNaN(light) || continyus)
        light = Math.random() * 100;
    if (isNaN(inter))
        inter = 180;

        if(continyus && coherance){
            getCoherance(roomName)
            setInterval(function() {            
                getCoherance(roomName)
                }, inter * 1000 );
        }
        else if(coherance){
            getCoherance(roomName)
        }
        else if (continyus) {
            modifLigth(roomName,light)
            modifTemp(roomName,temp)
            setInterval(function() {            
                    modifLigth(roomName,light)
                    modifTemp(roomName,temp)
                    light = Math.random() * (3000 - 1000) + 1000;
                    temp = Math.random() * (40 - 10) + 10 ;
                }, inter * 1000 );               
        }
        else{
            modifLigth(roomName,light)
            modifTemp(roomName,temp)
        }
}

main();