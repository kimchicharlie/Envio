var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email : { type : String, required : true },
    firstname : { type : String, required : true },
    lastname : { type : String, required : true },
    password : { type : String, required : true },
    isAdmin : { type : Boolean, default : false },
    organisation : { type: String, required : true },
    created : { type : Number, default : Date.now() }
});

exports.Users = mongoose.model('Users', userSchema);