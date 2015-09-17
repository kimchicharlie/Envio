var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : { type : String, required : true },
    firstname : { type : String, required : true },
    lastname : { type : String, required : true },
    password : { type : String, required : true },
    organisation : { type: String, required : true }
});

exports.Users = mongoose.model('Users', userSchema);