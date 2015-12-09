var multipartMiddleware = require('connect-multiparty')();
var modeManager = require("../Managers/mode");

exports.routes = [
    {
        "path": "/createMode",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            modeManager.createMode({
                "organisation" : req.body.organisation,
                "name" : req.body.name,
                "light" : req.body.light,
                "opacity" : req.body.opacity,
                "temperature" : req.body.temperature 

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/modifyMode",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            modeManager.modifyMode({
                "modeID" : req.body.modeID,
                "newName" : req.body.newName,
                "light" : req.body.light,
                "opacity" : req.body.opacity,
                "temperature" : req.body.temperature

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getMode",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            modeManager.getMode({
			    "modeID" : req.body.modeID

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getModes",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            modeManager.getModes({
			    "organisation" : req.body.organisation,

            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
