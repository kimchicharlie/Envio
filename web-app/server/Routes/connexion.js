var multipartMiddleware = require('connect-multiparty')();

var connexionManager = require("../Managers/connexion");

exports.routes = [
    {
        "path": "/login",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            console.log('req body', req.body)
            connexionManager.login({
                'email': req.body.email,
                'password': req.body.password

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/logout",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            connexionManager.logout({
                'guid': req.body.guid,
                'notAll': req.body.notAll

            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/isConnected",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            connexionManager.isConnected({
                'guid': req.body.guid

            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
