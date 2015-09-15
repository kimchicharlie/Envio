var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var materielSchema = new Schema({
    idx : { type : Number, required : true },
    name : { type : String, required : true },
    roomId : { type: String, required : true },
    activated : { type : Boolean, required : true },
    level : { type : Number, default : 0 },
    min : { type : Number, default : 0 },
    max : { type : Number, default : 100 },
    type : { type: String, required : true }
});

exports.Materiels = mongoose.model('Materiels', materielSchema);