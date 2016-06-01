var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");

exports.routes = [
    {
        "path": "/",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            res.send("Welcome on the Recuperation server");
        }
    }
]