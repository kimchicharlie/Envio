var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var captorSchema = new Schema({
	room : { type: Schema.ObjectId, ref: 'Rooms', required : true },
    type : { type: String, required : true },
    value : { type : Number, required : true },
    created : { type : Number, default : Date.now() }
});

exports.Captors = mongoose.model('Captors', captorSchema);