var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var airConditioningSchema = new Schema({
	room : { type: Schema.ObjectId, ref: 'Rooms', required : true },
    temperatureWanted : { type : Number, default : 21 },
    created : { type : Number, default : Date.now() }
});

exports.AirConditionings = mongoose.model('AirConditionings', airConditioningSchema);