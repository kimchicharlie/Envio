var config = require('./config').config;

var check_id = /^[0-9a-fA-F]{24}$/;
var check_guid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
var check_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

var checkProperty = function(prop) {
	return (prop !== "null" && prop !== null && prop !== "undefined" && prop !== undefined && prop !== "");
};

var checkNumberProperty = function(prop) {
	return (prop !== "" && prop !== null && !isNaN(prop));
};

var checkStringProperty = function(prop) {
	return (typeof prop == "string" && prop.trim() !== "");
};

var checkArrayProperty = function(prop) {
	return (Array.isArray(prop || ""));
};

var isObjectInArray = function(testObject, array, matchAttribute, normalise){
    for (var i = array.length - 1; i >= 0; i--) {
        var arrayObjectValue = array[i][matchAttribute];
        var testObjectValue = testObject[matchAttribute];
        if(normalise){
            if(checkStringProperty(arrayObjectValue) && checkStringProperty(testObjectValue)){
                arrayObjectValue = arrayObjectValue.toLowerCase();
                testObjectValue = testObjectValue.toLowerCase();
            }
        }
        if(arrayObjectValue == testObject[matchAttribute]){
            return i
        }
    };
    return false
};

var compareStrings = function(string1, string2){
    if(checkStringProperty(string1) && checkStringProperty(string2)){
        if(string1.toLowerCase() == string2.toLowerCase()){
            return true
        }
    }
    return false
}

var checkObjectProperty = function(prop) {
	return (checkProperty(prop) && (typeof prop == "object"));
};

var formatFunction = function(fn) {
	return (typeof fn == "function") ? fn : function () {};
};

var guidGenerator = function() {
	var S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

var checkDizaine = function(number) {
	return (number < 10) ? '0' + number : number;
};

var formatDate = function(timestamp, withoutTime) {
	var date = new Date(parseInt(timestamp, 10));

	if (withoutTime === true || withoutTime === "true") {
		return checkDizaine(date.getDate()) + '/' + checkDizaine(date.getMonth() + 1) + '/' + date.getFullYear();
	} else {
		return checkDizaine(date.getDate()) + '/' + checkDizaine(date.getMonth() + 1) + '/' + date.getFullYear() + ' à ' + checkDizaine(date.getHours()) + ':' + checkDizaine(date.getMinutes());
	}
};

exports.compareStrings = compareStrings;
exports.isObjectInArray = isObjectInArray;
exports.checkProperty = checkProperty;
exports.checkNumberProperty = checkNumberProperty;
exports.checkStringProperty = checkStringProperty;
exports.checkArrayProperty = checkArrayProperty;
exports.checkObjectProperty = checkObjectProperty;
exports.formatFunction = formatFunction;
exports.guidGenerator = guidGenerator;
exports.checkDizaine = checkDizaine;
exports.formatDate = formatDate;
exports.regex = {
    'check_id': check_id,
    'check_guid': check_guid,
    'check_email': check_email
};
