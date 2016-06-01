var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var materielManager = require("../managers/materiel");

exports.routes = [
    {
        "path": "/getMaterielsFromRoom",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            materielManager.getMaterielsFromRoom({
                'organisation': req.body.organisation,
                'roomId': req.body.roomId
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/changeTemperatureNeeded",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            materielManager.changeTemperatureNeeded({
                'roomId': req.body.roomId,
                'temperature': req.body.temperature,
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/setCaptorValue",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            materielManager.setCaptorValue({
                'value': req.body.value,
                'type': req.body.type,
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getAirConditioningValue",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            materielManager.getAirConditioningValue({
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getWindowValue",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            materielManager.getWindowValue({
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];