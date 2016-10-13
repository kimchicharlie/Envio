var multipartMiddleware = require('connect-multiparty')();
var captorManager = require("../Managers/captor");

exports.routes = [
    {
        "path": "/createCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            captorManager.createCaptor({
                "room" : req.body.room,
                "type" : req.body.type,
                "value" : req.body.value,
            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/modifyCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            captorManager.modifyCaptor({
                "captorID" : req.body.captorID,
                "type" : req.body.type,
                "value" : req.body.value,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/deleteCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            captorManager.deleteCaptor({
                "captorID" : req.body.captorID,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getCaptor",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            captorManager.getCaptor({
			    "captorID" : req.body.captorID

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getCaptors",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            captorManager.getCaptors({
			    "room" : req.body.room,

            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
