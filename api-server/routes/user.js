var multipartMiddleware = require('connect-multiparty')();

var middlewareManager = require("../managers/middleware");
var userManager = require("../managers/user");

exports.routes = [
    {
        "path": "/login",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            userManager.login({
                'email': req.body.email,
                'password': req.body.password
            }, function (rep)
            {
                console.log(rep)
                res.send(rep);
            });
        }
    },
    {
        "path": "/register",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            userManager.register({
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,
                'email': req.body.email,
                'password': req.body.password,
                'organisation': req.body.organisation
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/passwordForgotten",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            userManager.changePasswordRandom({
                'email': req.body.email,
                'newPassword': req.body.newPassword
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/changePassword",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            userManager.changePassword({
                'email': req.body.email,
                'newPassword': req.body.newPassword
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/logout",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            userManager.logout({
                'guid': req.body.guid
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/isConnected",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            userManager.isConnected({
                'guid': req.body.guid
            }, function (rep)
            {
                res.send(rep);
            });
        }
    },
    {
        "path": "/getUser",
        "method": "post",
        "middlewares": [multipartMiddleware, middlewareManager.checkKey],
        handler: function (req, res)
        {
            userManager.getUser({
                'guid': req.body.guid
            }, function (rep)
            {
                res.send(rep);
            });
        }
    }
];