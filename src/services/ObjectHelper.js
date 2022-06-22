const ObjectHelper = {
	replaceObjectOnPropertyByName(structureConatinObject, objectName, propertyName) {
		console.log(structureConatinObject,objectName,propertyName);
		if(structureConatinObject[objectName] == undefined || structureConatinObject[objectName] == null) {
			return objectName;
		}
		if( structureConatinObject[objectName][propertyName] == undefined || structureConatinObject[objectName][propertyName] == null) {
			throw `Can't find the property name ${propertyName} `;
		}
		console.log(structureConatinObject[objectName]);
		structureConatinObject[objectName] = structureConatinObject[objectName][propertyName];
	}
}

export {ObjectHelper};