var utils = require('../utils');
var async = require("async");
var bcrypt = require("bcryptjs");
var models = require('../models');

var mailManager = require("./mail");

var login = function (options, cb) {
	cb = cb || function () {};
    options = options || {};

	var result = {
        'error': null,
        'user': null,
        'guid': null
    };

    models.User.findOne({
        where: {
            'email': options.email
        }
    }).then(function (user) {
        if (user) {
            bcrypt.compare(options.password, user.dataValues.password, function(err, res) {
                if (res) {
                    var newConnectedUser = {
                        guid : utils.guidGenerator()
                    };

                    models.ConnectedUser.create(newConnectedUser).then(function (connectedUser) {
                        console.log("Login successull with email : " + options.email);
                        connectedUser.setUser(user.dataValues.id);
                        result.user = user.dataValues;
                        result.guid = connectedUser.dataValues.guid;
                        cb(result);
                    })
                } else {
                    result.error = 'Le mot de passe ne correspond pas';
                    cb(result);
                }
            });
        } else {
            result.error = "Cette adresse mail n'existe pas";
            cb(result);
        }
    })
};

var logout = function (options, cb)
{
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'logout': false
    };

    getConnectedUser({
        "guid": options.guid
    }, function (res)
    {
        if (res.error) {
            result.error = res.error;
            cb(result);
        } else {
            models.ConnectedUser.destroy({
              where: {
                id: res.connectedUser.id,
              }
            }).then(function (connectedUser) {
                result.logout = true;
                cb(result);
            });
        }
    });
};

var register = function (options, cb) {
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'user': null,
        'info': null
    };

    var userOptions = {};

    

    if (utils.checkProperty(options.email)) {
        models.User.findOne({
            where: {
                email: options.email
            }
        })
        .then(function(user) {
            if (user) {
                result.error = 'Cet utilisateur existe déjà dans la base de données';
                cb(result);
            } else {
                async.parallel([
                    function (callback) {
                        if (utils.checkProperty(options.email)) {
                            userOptions.email = options.email;
                            callback();
                        } else {
                            result.error = 'Le champ email est vide';
                            callback();
                        }
                    }, 
                    function (callback) {
                        if (utils.checkProperty(options.firstname)) {
                            userOptions.firstname = options.firstname;
                            callback();
                        } else {
                            result.error = 'Le champ prénom est vide';
                            callback();
                        }
                    }, 
                    function (callback) {
                        if (utils.checkProperty(options.lastname)) {
                            userOptions.lastname = options.lastname;
                            callback();
                        } else {
                            result.error = 'Le champ nom est vide';
                            callback();
                        }
                    }, 
                    function (callback) {
                        if (utils.checkProperty(options.password)) {
                            userOptions.password = options.password;
                            callback();
                        } else {
                            result.error = 'Le champ mot de passe est vide';
                            callback();
                        }
                    }, 
                    function (callback) {
                        if (utils.checkProperty(options.organisation)) {
                            userOptions.organisation = options.organisation;
                            callback();
                        } else {
                            result.error = 'Le champ organisation est vide';
                            callback();
                        }
                    }
                ], function () {
                    if (result.error){
                        cb(result);
                        return;
                    } else {
                        models.User.create(userOptions).then(function(user) {
                            result.user = user.dataValues;
                            mailManager.sendMail("envio.contact@gmail.com", userOptions.email, "Votre compte a bien été créé", "Bienvenue " + userOptions.firstname + ' ' + userOptions.lastname);
                            cb(result);
                        })
                    }                    
                });
            }
        })
    } else {
        result.error = "L'adresse email n'est pas valable";
        cb(result);
    }
};

var getConnectedUsers = function (options, cb)
{
    cb = cb || function () {};
    options = options || {};

    result = {
        'error': null,
        'connectedUsers': null
    };

    models.ConnectedUser.findAll({
        include: [
            { model: models.User, as: 'user' }
        ]
    }).then(function(connectedUsers) {
        result.connectedUsers = connectedUsers;
        cb(result);
    })
};

var getConnectedUser = function (options, cb)
{
    cb = cb || function () {};
    options = options || {};

    result = {
        'error': null,
        'connectedUser': null
    };

    if (utils.checkProperty(options.guid)) {
        models.ConnectedUser.findOne({
            where : {
                guid: options.guid
            },
            include: [
                { model: models.User, as: 'user' }
            ]
        }).then(function(connectedUser) {
            if (connectedUser) {
                result.connectedUser = connectedUser.dataValues;
                if (result.connectedUser === null || result.connectedUser.user == null) {
                    result.error = "Vous devez être connecté";
                    cb(result);
                } else {
                    console.log("Get connected user with guid " + result.connectedUser.guid);
                    cb(result);
                }
            } else {
                result.error = "ConnectedUser not found";
                cb(result);
            }
        })
    } else {
        result.error = "Vous devez être connecté";
        cb(result);
    };
};

var isConnected = function (options, cb) {
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'isConnected': false,
        'user': null
    };

    getConnectedUser({
        "guid": options.guid
    }, function (rep) {
        if (rep.error == null) {
            result.isConnected = true;
            result.user = rep.connectedUser.user;
        } else {
            result.error = rep.error;
            result.isConnected = false;
        }
        cb(result);
    });
};

var getUser = function (options, cb) {
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'isConnected': false,
        'user': null
    };

    getConnectedUser({
        "guid": options.guid
    }, function (rep) {
        if (rep.error == null) {
            result.isConnected = true;
            result.user = rep.connectedUser.user;
        } else {
            result.error = rep.error;
            result.isConnected = false;
        }
        cb(result);
    });
};


var changePassword = function (options, cb) {
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'user': null
    };

    if (options.newPassword && options.email) {
        models.User.update({
            'password': options.newPassword
        },{
            where: {
                email: options.email
            }
        }).then(function(res) {
            models.User.findOne({
                where: {
                    email: options.email
                }
            }).then(function(user) {
                result.user = user.dataValues;
                cb(result);
            })
        })
    } else {
        result.error = "Requête incorrecte";
        cb(result);
    }
}

exports.login = login;
exports.logout = logout;
exports.register = register;
exports.getConnectedUser = getConnectedUser;
exports.getConnectedUsers = getConnectedUsers;
exports.isConnected = isConnected;
exports.getUser = getUser;
exports.changePassword = changePassword;