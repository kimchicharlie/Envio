var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statSchema = new Schema({
	room : { type: Schema.ObjectId, ref: 'Rooms', required : true },
    realLight : { type : Number, required : true },
    neededLight : { type : Number, required : true },
    realTemperature : { type : Number, required : true },
    neededTemperature : { type : Number, required : true },
    created : { type : Number, default : Date.now() }
});

exports.Stats = mongoose.model('Stats', statSchema);