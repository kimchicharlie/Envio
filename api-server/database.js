var mongoose = require('mongoose');

var initDB = function (cb)
{
	cb = cb || function(){};
	//mongoose.connect('localhost:27017/envio', function (err) {
    mongoose.connect('mongodb://admin:admin@ds039960.mlab.com:39960/envio', function (err) {
        if (err)  
        {
        	console.log(err)
            throw err;
        }
        cb();
    });
};

exports.initDB = initDB;

exports.Users = require('./models/user').Users;
exports.Rooms = require('./models/room').Rooms;
exports.Materiels = require('./models/materiel').Materiels;
exports.ConnectedUser = require('./models/connectedUser').ConnectedUser;
exports.Modes = require('./models/mode').Modes;
exports.Stats = require('./models/stat').Stats;
exports.Captors = require('./models/captor').Captors;
exports.Windows = require('./models/window').Windows;
exports.AirConditionings = require('./models/airConditioning').AirConditionings;
exports.CaptorsValues = require('./models/captorsValue').CaptorsValues;