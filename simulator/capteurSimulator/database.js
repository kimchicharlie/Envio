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

exports.Rooms = require('./room').Rooms;
exports.Materiels = require('./materiel').Materiels;
