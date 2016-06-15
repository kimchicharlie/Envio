var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var windowSchema = new Schema({
	room : { type: Schema.ObjectId, ref: 'Rooms', required : true },
    orientation : { type: Number, required : true },
    size : { type : Number, required : true },
    opacity : { type : Number, default : 10 },
    opacityWanted : { type : Number, default : 10 },
    created : { type : Number, default : Date.now() }
});

exports.Windows = mongoose.model('Windows', windowSchema);