const ObjectHelper = {
	replaceObjectOnPropertyByName(structureContainObject, objectName, propertyName) {
		console.log(structureContainObject,objectName,propertyName);
		if(structureContainObject[objectName] == undefined || structureContainObject[objectName] == null) {
			return objectName;
		}
		if( structureContainObject[objectName][propertyName] == undefined || structureContainObject[objectName][propertyName] == null) {
			throw `Can't find the property name ${propertyName} `;
		}
		console.log(structureContainObject[objectName]);
		structureContainObject[objectName] = structureContainObject[objectName][propertyName];
	}
}

export {ObjectHelper};