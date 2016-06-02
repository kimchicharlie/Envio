var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var communicationManager = require("../managers/communication");

exports.routes = [
    {
        "path": "/modifyValue",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            communicationManager.modifyValue({
                'type': req.body.type,
                'value': req.body.value
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];