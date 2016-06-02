var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var captorManager = require("../managers/captor");

exports.routes = [
    {
        "path": "/createCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            captorManager.createCaptor({
                'room': req.body.room,
                'type': req.body.type,
                'value': req.body.value
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/modifyCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            captorManager.modifyCaptor({
                'captorID': req.body.captorID,
                'type': req.body.type,
                'value': req.body.value,
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/deleteCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            captorManager.deleteCaptor({
                'captorID': req.body.captorID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getCaptors",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            captorManager.getCaptors({
                'room': req.body.room
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            captorManager.getCaptor({
                'captorID': req.body.captorID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];