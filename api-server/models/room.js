var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name : { type : String, required : true },
    organisation : { type: String, required : true },
    volume : { type : Number, required : true },
    realLight : { type : Number, default : 25000 },
    light : { type : Number, default : 50 },
    maxLux : { type : Number, default : 15000},
    realTemperature : { type : Number, default : 20 },
    temperature : { type : Number, default : 20 },
    artificialIntellligence : { type : Boolean, default : false },
    windows : [
        { type: Schema.ObjectId, ref: 'Windows' }
    ],
    airConditionings : [
        { type: Schema.ObjectId, ref: 'AirConditionings' }
    ],
    captors : [
        { type: Schema.ObjectId, ref: 'Captors' }
    ],
    data : { type : Object, default : null },
    planning : [],
    m : { type : Number, default : 0 },
    off : { type : Number, default : 0 },
    created : { type : Number, default : Date.now() }
});

exports.Rooms = mongoose.model('Rooms', roomSchema);