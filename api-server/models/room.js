var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name : { type : String, required : true },
    organisation : { type: String, required : true },
    volume : { type : Number, required : true },
    light : { type : Number, default : 0 },
    realTemperature : { type : Number, default : 20 },
    temperature : { type : Number, default : 0 },
    consumption : { type : Number, default : 0 },
    savedEnergy : { type : Number, default : 0 },
    savedMoney : { type : Number, default : 0 },
    data : { type : Object, default : null }
});

exports.Rooms = mongoose.model('Rooms', roomSchema);