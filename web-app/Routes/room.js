var multipartMiddleware = require('connect-multiparty')();
var roomManager = require("../Managers/room");

exports.routes = [
    {
        "path": "/createRoom",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.createRoom({
			    "organisation" : req.body.organisation,
			    "name" : req.body.name,
			    "volume" : req.body.volume

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/modifyRoom",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.modifyRoom({
			    "newName" : req.body.newName,
			    "name" : req.body.name,
			    "volume" : req.body.volume

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getRoom",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.getRoom({
			    "_id" : req.body.id

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getRooms",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.getRooms({
			    "organisation" : req.body.organisation,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/changeTemperature",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.changeTemperature({
			    "roomId" : req.body.organisation,
			    "temperature" : req.body.name,

            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
