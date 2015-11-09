var guidGenerator = function() {
	var random4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return (random4() + random4() + "-" + random4() + "-" + random4() + "-" + random4() + "-" + random4() + random4() + random4());
};

var checkProperty = function(prop) {
	return (prop !== "null" && prop !== null && prop !== "undefined" && prop !== undefined && prop !== "");
};

exports.guidGenerator = guidGenerator;
exports.checkProperty = checkProperty;