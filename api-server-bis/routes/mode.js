var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var modeManager = require("../managers/mode");

exports.routes = [
    {
        "path": "/createMode",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            modeManager.createMode({
                'organisation': req.body.organisation,
                'name': req.body.name,
                'light': req.body.light,
                'opacity': req.body.opacity,
                'temperature': req.body.temperature
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/modifyMode",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            modeManager.modifyMode({
                'modeID': req.body.modeID,
                'newName': req.body.newName,
                'light': req.body.light,
                'opacity': req.body.opacity,
                'temperature': req.body.temperature
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/deleteMode",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            modeManager.deleteMode({
                'modeID': req.body.modeID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getModes",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            modeManager.getModes({
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getMode",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            modeManager.getMode({
                'modeID': req.body.modeID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];