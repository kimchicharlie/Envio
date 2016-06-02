var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var captorsValueSchema = new Schema({
    type : { type: String, required : true },
    value : { type : Number, required : true },
    created : { type : Number, default : Date.now() }
});

exports.CaptorsValues = mongoose.model('CaptorsValues', captorsValueSchema);