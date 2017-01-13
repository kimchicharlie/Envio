var guidGenerator = function() {
	var random4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	return (random4() + random4() + "-" + random4() + "-" + random4() + "-" + random4() + "-" + random4() + random4() + random4());
};

var checkProperty = function(prop) {
	return (prop !== "null" && prop !== null && prop !== "undefined" && prop !== undefined && prop !== "");
};

var changeIdToMongo = function(object) {
	let newObject = object.dataValues;
	if (newObject && newObject.hasOwnProperty('id')) {
		newObject['_id'] = newObject['id'];
		delete newObject['id'];
	}
	return newObject;
}

var changeArrayIdToMongo = function(objects) {
	let newObjects = [];
	for (var i = 0; i < objects.length; i++) {
		newObjects.push(objects[i].dataValues);
		if (newObjects[i] && newObjects[i].hasOwnProperty('id')) {
			newObjects[i]['_id'] = newObjects[i]['id'];
			delete newObjects[i]['id'];
		}
	}
	return newObjects;
}

var changeRoomIdsToMongo = function(object) {
	let newObject = object.dataValues;
	if (newObject.windows && newObject.windows.dataValues) {
		newObject['windows'] = newObject.windows.dataValues;
	}
	if (newObject.airConditionings && newObject.airConditionings.dataValues) {
		newObject['airConditionings'] = newObject.airConditionings.dataValues;
	}
	if (newObject.captors && newObject.captors.dataValues) {
		newObject['captors'] = newObject.captors.dataValues;
	}
	if (newObject && newObject.hasOwnProperty('id')) {
		newObject['_id'] = newObject['id'];
		delete newObject['id'];
	}
	return newObject;
}

var changeArrayRoomIdsToMongo = function(objects) {
	let newObjects = [];
	for (var i = 0; i < objects.length; i++) {
		newObjects.push(objects[i].dataValues);
		if (newObjects[i] && newObjects[i].hasOwnProperty('id')) {
			if (newObjects[i].windows && newObjects[i].windows.dataValues) {
				newObjects[i]['windows'] = newObjects[i].windows.dataValues;
			}
			if (newObjects[i].airConditionings && newObjects[i].airConditionings.dataValues) {
				newObjects[i]['airConditionings'] = newObjects[i].airConditionings.dataValues;
			}
			if (newObjects[i].captors && newObjects[i].captors.dataValues) {
				newObjects[i]['captors'] = newObjects[i].captors.dataValues;
			}
			newObjects[i]['_id'] = newObjects[i]['id'];
			delete newObjects[i]['id'];
		}
	}
	console.log(3)
	return newObjects;
}

exports.guidGenerator = guidGenerator;
exports.checkProperty = checkProperty;
exports.changeIdToMongo = changeIdToMongo;
exports.changeArrayIdToMongo = changeArrayIdToMongo;
exports.changeRoomIdsToMongo = changeRoomIdsToMongo;
exports.changeArrayRoomIdsToMongo = changeArrayRoomIdsToMongo;
