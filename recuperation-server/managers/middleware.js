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
	if (req.query.recuperation_key == config.recuperationServerAccessKey || req.body.recuperation_key == config.recuperationServerAccessKey) {
		next();
	} else {
		res.send("Error : Wrong Recuperation Server Access");
	}
};