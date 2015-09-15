var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectedUserSchema = new Schema({
    guid : { type : String, required : true },
    user : { type: Schema.ObjectId, ref: 'Users', required : true },
    created : { type : Number, default : Date.now() }
});

exports.ConnectedUser = mongoose.model('ConnectedUser', connectedUserSchema);