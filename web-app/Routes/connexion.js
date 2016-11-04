var multipartMiddleware = require('connect-multiparty')();

var connexionManager = require("../Managers/connexion");

exports.routes = [
    {
        "path": "/login",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
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
        "path": "/register",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            connexionManager.register({
                'email': req.body.email,
                'lastname': req.body.lastname,
                'firstname': req.body.firstname,
                'password': req.body.password,
                'organisation': req.body.organisation

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
    },
    {
        "path": "/getUser",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            connexionManager.getUser({
                'guid': req.body.guid
            }, function (result)
            {
                res.send(result);
            });
        }
    }
];
