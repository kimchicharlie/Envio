
var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

var temparature = 20
var lightOutSide = 25000
var lightInSide = 800
var coherance = false;
var getCoherance = function(cb)
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
                    cb(parsed.main.temp,darkparsed.currently.visibility * 4000)
                    })
                });
            });  
        });
}


/*
node simulate -r roomName
*/

var main = function (){
        process.argv.forEach( function(element, index) {
            if(element == "-t")
                temparature = parseFloat(process.argv[index+1]);
            if(element == "-lo")
                lightOutSide = parseFloat(process.argv[index+1]);
            if(element == "-li")
                lightInSide = parseFloat(process.argv[index+1]);
            if(element == "-co")
                coherance = true;            
        });

    app.listen(9876, function () {
    console.log('Example app listening on port 9876!');
    });        
    // if(!roomName){
    //     console.log("NO room!")
    //     process.exit();
    // }
}

app.get('/', function (req, res) {  
        if (coherance){
            getCoherance(function(coheTemparature,coheLightOutSide){
                var toSend = {
                    "temparature" : coheTemparature,
                    "lightOutSide" : coheLightOutSide,
                    "lightInSide" : lightInSide,
                    }
                console.log(toSend);
                res.send(toSend);
            })
        }else{
            var toSend = {
                "temparature" : temparature,
                "lightOutSide" : lightOutSide,
                "lightInSide" : lightInSide,
                }
            console.log(toSend);
            res.send(toSend); 
        }                
});

app.post('/ChangeLightInSide', function (req, res) {
    lightInSide = req.body.lightInSide
    res.send({"lightInSide" : lightInSide});
});

app.post('/ChangeTemparature', function (req, res) {
    temparature = req.body.temparature
    res.send({"temparature" : temparature});
});

app.post('/ChangeLightOutSide', function (req, res) {
    lightOutSide = req.body.lightOutSide
    res.send({"lightOutSide" : lightOutSide});
});

app.post('/SwitchToCoherance', function (req, res) {
    coherance = !coherance
    res.send({"coherance" : coherance});
});

main();