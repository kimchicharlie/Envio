var multipartMiddleware = require('connect-multiparty')();
var windowManager = require("../Managers/window");

exports.routes = [
    {
        "path": "/createWindow",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            windowManager.createWindow({
                "room" : req.body.room,
                "orientation" : req.body.orientation,
                "size" : req.body.size,
                "opacity" : req.body.opacity,
                "opacityWanted" : req.body.opacityWanted 

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/modifyWindow",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            windowManager.modifyWindow({
                "windowID" : req.body.windowID,
                "orientation" : req.body.orientation,
                "size" : req.body.size,
                "opacityWanted" : req.body.opacityWanted,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/deleteWindow",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            windowManager.deleteWindow({
                "windowID" : req.body.windowID,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getWindow",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            windowManager.getWindow({
			    "windowID" : req.body.windowID

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getWindows",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            windowManager.getWindows({
			    "room" : req.body.room,

            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
