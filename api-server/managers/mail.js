var utils = require('../utils');
var async = require("async");
var db = require("../database");
var bcrypt = require("bcrypt");

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'envio.contact@gmail.com',
        pass: 'ch31st64'
    }
});

var sendMail = function (from, to, subject, text) {
    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text
    });
};

exports.sendMail = sendMail;