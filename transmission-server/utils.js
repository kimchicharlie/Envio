var checkProperty = function(prop) {
	return (prop !== "null" && prop !== null && prop !== "undefined" && prop !== undefined && prop !== "");
};

exports.checkProperty = checkProperty;