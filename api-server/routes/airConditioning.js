var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var airConditioningManager = require("../managers/airConditioning");

exports.routes = [
    {
        "path": "/createAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            airConditioningManager.createAirConditioning({
                'room': req.body.room,
                'temperatureWanted': req.body.temperatureWanted,
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/modifyAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            airConditioningManager.modifyAirConditioning({
                'airConditioningID': req.body.airConditioningID,
                'temperatureWanted': req.body.temperatureWanted,
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/deleteAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            airConditioningManager.deleteAirConditioning({
                'airConditioningID': req.body.airConditioningID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getAirConditionings",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            airConditioningManager.getAirConditionings({
                'room': req.body.room
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getAirConditioning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            airConditioningManager.getAirConditioning({
                'airConditioningID': req.body.airConditioningID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];