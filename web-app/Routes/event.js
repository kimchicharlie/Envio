var multipartMiddleware = require('connect-multiparty')();
var eventManager = require("../Managers/event");

exports.routes = [
    {
        "path": "/createEvent",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            eventManager.createEvent({
                "roomID" : req.body.roomID,
                "modeID" : req.body.modeID,
                "eventName" : req.body.eventName,
			    "dateBegin" : req.body.dateBegin,
			    "dateEnd" : req.body.dateEnd

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/deleteEvent",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            eventManager.deleteEvent({
                "roomID" : req.body.roomID,
                "eventName" : req.body.eventName,
                "dateBegin" : req.body.dateBegin,

            }, function (result)
            {
                res.send(result);
            });
        }
    },    
    {
        "path": "/modifyEvent",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            eventManager.modifyEvent({
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
        "path": "/getEvent",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            eventManager.getEvent({
			    "eventID" : req.body.eventID

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/getEvents",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            eventManager.getEvents({
			    "organisation" : req.body.organisation,

            }, function (result)
            {
                res.send(result);
            });
        }
    },
];
