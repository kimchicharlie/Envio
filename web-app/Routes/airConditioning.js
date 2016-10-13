var multipartMiddleware = require('connect-multiparty')();
var airConditioningManager = require("../Managers/airConditioning");

exports.routes = [
    {
        "path": "/createAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            airConditioningManager.createAirConditioning({
                "room" : req.body.room,
                "temperatureWanted" : req.body.temperaturewanted,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/modifyAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            airConditioningManager.modifyAirConditioning({
                "airConditioningID" : req.body.airConditioningID,
                "temperatureWanted" : req.body.temperaturewanted,
            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/deleteAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            airConditioningManager.deleteAirConditioning({
                "airConditioningID" : req.body.airConditioningID,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            airConditioningManager.getAirConditioning({
			    "airConditioningID" : req.body.airConditioningID

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getAirConditionings",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            airConditioningManager.getAirConditionings({
			    "room" : req.body.room,

            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
