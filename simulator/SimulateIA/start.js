var request = require('request');
var apiUrl = 'http://176.31.127.14:1337/api';
var envioApiAccessKey = "f8c5e1xx5f48e56s4x8";
var roomID = "57d2ac0ea3f3630b38273697";
var SendStat = function(realLight,neededLight,cb) {
    cb = cb || function () {};
    var result = {
        'error': null,
        'room': null
    }
        
        var objectToSend = {
            "realLight" : realLight,
            "neededLight" : neededLight,
            "realTemperature" : 20,
            "neededTemperature" : 20,
            "roomID": roomID,
            "api_key": envioApiAccessKey
        }
        console.log(objectToSend)
        request({
            url: apiUrl + '/addStat',                    
            method: "POST",
            json: objectToSend
        }, function (error, response, body) {
            if (!response) {
                result.error = "Can't reach Envio API";
                cb(result);
            } else {
                result.stat = body.stat;
                cb(body);
            }
        })

};

var log = function(result){
    console.log(result)
}

var main = function()
{

state = [
    {x : 10, y :45000},
    {x : 20, y :40000},
    {x : 32, y :34000},
    {x : 24, y :38000},
    {x : 34, y :33000},
    {x : 39, y :30500},
    {x : 41, y :29500},
    {x : 45, y :27500},
    {x : 46, y :27000},
    {x : 49, y :25500},
    {x : 52, y :24000},
    {x : 57, y :21500},
    {x : 58, y :21000},
    {x : 61, y :19500},
    {x : 66, y :17000},
    {x : 68, y :16000},
    {x : 70, y :15000},
    {x : 73, y :13500},
    {x : 76, y :12000},
    {x : 81, y :9500},
    {x : 86, y :7000},
    {x : 90, y :5000},
]

Y = 'y';
X = 'x';
        for (i in state){
        SendStat(state[i][Y], state[i][X], log)
        }    
}

main()