var db = require("../database");
var utils = require('../utils');
var config = require('../config').config;

/**
 * Check key -> function allowing user if authentification key is right
 * @param  {object} req with query informations and meta data
 * @param  {object} res -> response
 * @param  {function} next, called if key is right in order to keep going
 */

exports.checkKey = function (req, res, next)
{
	if (req.query.api_key == config.envioApiAccessKey || req.body.api_key == config.envioApiAccessKey) {
		next();
	} else {
		res.send("Error : Wrong API Access");
	}
};

exports.checkAdmin = function (req, res, next)
{
    if (utils.checkProperty(req.body.guid)) {
        db.ConnectedUser.findOne({
            'guid': req.body.guid
        })
        .populate('user')
        .exec(function (err, connectedUser) {
            if (err) {
            	res.send("Error : Access not authorized");
            } else {
                if (connectedUser === null || connectedUser.user == null) {
                    res.send("Error : Access not authorized");
                } else if (connectedUser.user.isAdmin) {
                    next()
                }
            }
        });
    } else {
        res.send("Error : Access not authorized");
    };
};