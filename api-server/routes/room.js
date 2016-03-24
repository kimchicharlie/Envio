var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var roomManager = require("../managers/room");

exports.routes = [
    {
        "path": "/createRoom",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.createRoom({
                'name': req.body.name,
                'organisation': req.body.organisation,
                'volume': req.body.volume,
                'data': req.body.data
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/modifyRoom",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.modifyRoom({
                'name': req.body.name,
                'newName': req.body.newName,
                'volume': req.body.volume
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/deleteRoom",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.deleteRoom({
                'roomID': req.body.roomID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },    
    {
        "path": "/modifyData",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.modifyData({
                'name': req.body.name,
                'data': req.body.data
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getRoom",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.getRoom({
                'roomID': req.body.roomID
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getRooms",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.getRooms({
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/changeTemperature",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.changeTemperature({
                'roomID': req.body.roomID,
                'temperature': req.body.temperature
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/addEventPlanning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.addEventPlanning({
                "roomID": req.body.roomID,
                "eventName": req.body.eventName,
                "roomID": req.body.roomID,
                "dateBegin": req.body.dateBegin,
                "dateEnd": req.body.dateEnd
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/removeEventPlanning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.removeEventPlanning({
                'roomID': req.body.roomID,
                'eventName': req.body.eventName,
                'dateBegin': req.body.dateBegin
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },{
        "path": "/modifyEventPlanning",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            roomManager.modifyEventPlanning({
                'roomID': req.body.roomID,
                'eventName': req.body.eventName,
                'newName': req.body.newName,
                'roomID': req.body.roomID,
                'dateBegin': req.body.dateBegin,
                'dateEnd': req.body.dateEnd,
                'newDateBegin': req.body.newDateBegin,
                'newDateEnd': req.body.newDateEnd
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];