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
        "path": "/deleteRoom",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.deleteRoom({
                "roomID" : req.body.roomID,

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
			    "roomID" : req.body.roomID

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getRoomPlusHardware",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.getRoomPlusHardware({
                "roomID" : req.body.roomID

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
			    "roomID" : req.body.roomID,
			    "temperature" : req.body.temperature,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/changeLight",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            roomManager.changeLight({
                "roomID" : req.body.roomID,
                "light" : req.body.light,

            }, function (result)
            {
                res.send(result);
            });
        }
    }    
];
