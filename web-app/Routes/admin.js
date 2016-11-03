var multipartMiddleware = require('connect-multiparty')();
var adminManager = require("../Managers/admin");

exports.routes = [
    {
        "path": "/getUsersAdmin",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            adminManager.getUsersAdmin({
			    'guid': req.body.guid,
            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/updateUser",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            adminManager.updateUser({
                'userId': req.body.userId,
                'email': req.body.email,
                'firstname': req.body.firstname,
                'lastname': req.body.lastname,
                'organisation': req.body.organisation,
                'password': req.body.password,
            }, function (result)
            {
                res.send(result);
            });
        }
    },
    {
        "path": "/deleteUser",
        "method": "post",
        "middlewares": [multipartMiddleware],
        handler: function (req, res)
        {
            adminManager.deleteUser({
                'userId': req.body.userId,
            }, function (result)
            {
                res.send(result);
            });
        }
    },
];
