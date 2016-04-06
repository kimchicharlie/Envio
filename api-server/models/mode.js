var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var modeSchema = new Schema({
    name : { type : String, required : true },
    organisation : { type: String, required : true },
    light : { type : Number, default : 0 },
    opacity : { type : Number, default : 0 },
    temperature : { type : Number, default : 20 },
    created : { type : Number, default : Date.now() }
});

exports.Modes = mongoose.model('Modes', modeSchema);