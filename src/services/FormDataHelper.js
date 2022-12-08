const FormDataHelper = {
	createFromObject(object) {
		let form = new FormData();
		for(const fieldName in object) {
			if(object[fieldName] !== null)
			form.append(fieldName, object[fieldName]);
		}

		return form;
	},
}

export {FormDataHelper};