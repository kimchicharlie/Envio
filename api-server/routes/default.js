var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var userManager = require("../managers/user");

exports.routes = [
    {
        "path": "/",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            res.send("Envio API : Welcome !");
        }
    }
]