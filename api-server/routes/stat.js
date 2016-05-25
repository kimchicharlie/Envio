var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var statManager = require("../managers/stat");

exports.routes = [
    {
        "path": "/addStat",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            statManager.addStat({
                'realLight': req.body.realLight,
                'neededLight': req.body.neededLight,
                'realTemperature': req.body.realTemperature,
                'neededTemperature': req.body.neededTemperature,
                'room': req.body.roomID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];