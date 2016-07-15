var checkProperty = function(prop) {
	return (prop !== "null" && prop !== null && prop !== "undefined" && prop !== undefined && prop !== "");
};

var FindIndexByValue = function(array, Value, key){
	for (i in array){
		if (array[i][key] == Value)
			return (i);
	}
}

exports.checkProperty = checkProperty;
exports.FindIndexByValue = FindIndexByValue;