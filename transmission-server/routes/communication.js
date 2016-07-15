var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var communicationManager = require("../managers/communication");

exports.routes = [
    {
        "path": "/modifyCaptorValue",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            communicationManager.modifyCaptorValue({
                'captorID': req.body.captorID,
                'value': req.body.value
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },{
        "path": "/modifyLight",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            communicationManager.modifyLight({
                "captors": req.body.captors,
                "roomID": req.body.roomID,
                "lightNeeded": req.body.lightNeeded,
                "maxLux": req.body.maxLux,
                "transmission_key": req.body.transmissionServerAccessKey
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
];