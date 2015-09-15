var express = require('express');
var router = express.Router();
var userManager = require("./managers/user");
var roomManager = require("./managers/room");
var materielManager = require("./managers/materiel");

router.get('/', function(req, res) {
  res.send("welcome to envio api");
});

router.post('/login', function(req, res) {
	userManager.login({
    	'email': req.body.email,
    	'password': req.body.password
    }, function (result)
    {
    	res.send(result);
    });
});

router.post('/register', function(req, res) {
	userManager.register({
		'firstname': req.body.firstname,
		'lastname': req.body.lastname,
		'email': req.body.email,
		'password': req.body.password,
		'organisation': req.body.organisation
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/passwordForgotten', function(req, res) {
	userManager.changePasswordRandom({
    	'email': req.body.email
    }, function (result)
    {
    	res.send(result);
    });
});

router.post('/changePassword', function(req, res) {
	userManager.changePassword({
    	'email': req.body.email,
    	'newPassword': req.body.newPassword
    }, function (result)
    {
    	res.send(result);
    });
});

router.post('/logout', function(req, res) {
	userManager.logout({
		'guid': req.body.guid
	}, function (result)
    {
    	res.send(result);
    });
});

router.post('/isConnected', function(req, res) {
	userManager.isConnected({
		'guid': req.body.guid
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/getUser', function(req, res) {
	userManager.getUser({
		'guid': req.body.guid
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/createRoom', function(req, res) {
	roomManager.createRoom({
		'name': req.body.name,
		'organisation': req.body.organisation,
		'volume': req.body.volume
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/modifyRoom', function(req, res) {
	roomManager.modifyRoom({
		'newName': req.body.newName,
		'name': req.body.name,
		'volume': req.body.volume
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/getRoom', function(req, res) {
	roomManager.getRoom({
		'roomID': req.body.roomID
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/getRooms', function(req, res) {
	roomManager.getRooms({
		'organisation': req.body.organisation
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/getMaterielsFromRoom', function(req, res) {
	materielManager.getMaterielsFromRoom({
		'organisation': req.body.organisation,
		'roomId': req.body.roomId
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/changeTemperature', function(req, res) {
	roomManager.changeTemperature({
		'roomID': req.body.roomID,
		'temperature': req.body.temperature
	}, function (result)
	{
		res.send(result);
	});
});

router.post('/changeTemperatureNeeded', function(req, res) {
	materielManager.changeTemperatureNeeded({
		'roomId': req.body.roomId,
		'temperature': req.body.temperature,
		'organisation': req.body.organisation
	}, function (result)
	{
		res.send(result);
	});
});


module.exports = router;