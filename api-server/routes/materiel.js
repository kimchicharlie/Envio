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
    }
];