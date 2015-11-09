var multipartMiddleware = require('connect-multiparty')();

var defaultManager = require("../Managers/default");

exports.routes = [
    {
        "path": "/",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            defaultManager.testDefault(req.body, function (rep)
            {
                res.send(rep);
            });
        }
    }
];