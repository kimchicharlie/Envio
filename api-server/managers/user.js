var utils = require('../utils');
var async = require("async");
var db = require("../database");
var bcrypt = require("bcryptjs");

var mailManager = require("./mail");

var login = function (options, cb) {
	cb = cb || function () {};
    options = options || {};

	var result = {
        'error': null,
        'user': null
    };

    db.Users.findOne({'email' : options.email})
    .exec(function (err, user) {
      if (err) { 
        result.error = err;
        cb(result);
        } else {
            if (user != null) {
                bcrypt.compare(options.password, user.password, function(err, res) {
                    if (res) {
                        var newConnectedUser = new db.ConnectedUser({
                            user: user._id,
                            guid : utils.guidGenerator()
                        });

                        newConnectedUser.save(function (err, connectedUser) {
                            if (err) {
                                result.error = "Problème de connection";
                                cb(result);
                            } else {
                                console.log("Login successull with email : " + options.email);
                                result.user = user;
                                result.guid = connectedUser.guid;
                                cb(result);
                            }
                        });
                    } else {
                        result.error = 'Le mot de passe ne correspond pas';
                        cb(result);
                    }
                });
            } else {
                result.error = "Cette adresse mail n'existe pas";
                cb(result);
            }
        }
    });
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
            db.ConnectedUser.remove({"user": res.connectedUser.user._id}, function (err) {
                if (err) {
                    result.error = "L'utilisateur connecté est introuvable";
                    cb(result);
                } else {
                    result.logout = true;
                    cb(result);
                }
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
        db.Users.findOne({'email' : options.email})
        .exec(function (err, user) {
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
                    }                
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(options.password, salt, function(err, hash) {

                            userOptions.password = hash;

                            var newUser = new db.Users({
                                'email' : userOptions.email,
                                'firstname' : userOptions.firstname,
                                'lastname' : userOptions.lastname,
                                'password' : userOptions.password,
                                'organisation' : userOptions.organisation
                            });

                            newUser.save(function (err)
                            {
                                if (err) {
                                    result.error = err;
                                    cb(result);
                                } else {
                                    result.user = newUser;      
                                    cb(result);
                                    mailManager.sendMail("envio.contact@gmail.com", userOptions.email, "Votre compte a bien été créé", "Bienvenue " + userOptions.firstname + ' ' + userOptions.lastname);
                                }
                            });
                        });
                    });
                });
            }
        })
    } else {
        result.error = "L'adresse email n'est pas valable";
        cb(result);
    }
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
        db.ConnectedUser.findOne({
            'guid': options.guid
        })
        .populate('user')
        .exec(function (err, connectedUser) {
            if (err) {
                result.error = "Le guid n'existe pas";
                cb(result);
            } else {
                if (connectedUser === null || connectedUser.user == null) {
                    result.error = "Vous devez être connecté";
                    cb(result);
                } else {
                    console.log("Get connected user with guid " + connectedUser.guid);
                    result.connectedUser = connectedUser;
                    cb(result);
                }
            }
        });
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

var changePasswordRandom = function (options, cb) {
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'user': null
    };

    if (utils.checkProperty(options.email)) {
        db.Users.findOne({"email": options.email})
        .exec(function (err, user) {
            if (!user) {
                result.error = "Cet utilisateur n'existe pas dans la base de données";
                cb(result);
            } else {
                var newPassword = Math.random().toString(36).substr(10);

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newPassword, salt, function(err, hash) {

                        user.password = hash;
                        user.save(function (err)
                        {
                            if (err) {
                                result.error = err;
                                cb(result);
                            } else {
                                mailManager.sendMail("envio.contact@gmail.com", options.email, "Réinitialisation du mot de passe", "Voici votre nouveau mot de passe : " + newPassword);
                                result.user = user;
                                cb(result);
                            }
                        });
                    });
                });
            }
        })
    } else {
        result.error = "L'adresse email est invalide";
        cb(result);
    }
}

var changePassword = function (options, cb) {
    cb = cb || function () {};
    options = options || {};

    var result = {
        'error': null,
        'user': null
    };

    if (utils.checkProperty(options.newPassword)) {
        db.Users.findOne({"email": options.email})
        .exec(function (err, user) {
            if (!user) {
                result.error = "Cet utilisateur n'existe pas dans la base de données";
                cb(result);
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(options.newPassword, salt, function(err, hash) {

                        user.password = hash;
                        user.save(function (err)
                        {
                            if (err) {
                                result.error = err;
                                cb(result);
                            } else {
                                result.user = user;
                                cb(result);
                            }
                        });
                    });
                });
            }
        })
    } else {
        result.error = "Le mot de passe n'est pas valide";
        cb(result);
    }
}

exports.login = login;
exports.logout = logout;
exports.register = register;
exports.getConnectedUser = getConnectedUser;
exports.isConnected = isConnected;
exports.getUser = getUser;
exports.changePassword = changePassword;
exports.changePasswordRandom = changePasswordRandom;