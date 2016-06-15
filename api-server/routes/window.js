var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var windowManager = require("../managers/window");

exports.routes = [
    {
        "path": "/createWindow",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            windowManager.createWindow({
                'room': req.body.room,
                'orientation': req.body.orientation,
                'size': req.body.size,
                'opacity': req.body.opacity,
                'opacityWanted': req.body.opacityWanted
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/modifyWindow",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            windowManager.modifyWindow({
                'windowID': req.body.windowID,
                'orientation': req.body.orientation,
                'size': req.body.size,
                'opacityWanted': req.body.opacityWanted
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/deleteWindow",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            windowManager.deleteWindow({
                'windowID': req.body.windowID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getWindows",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            windowManager.getWindows({
                'room': req.body.room
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getWindow",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            windowManager.getWindow({
                'windowID': req.body.windowID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];