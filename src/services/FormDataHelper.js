const FormDataHelper = {
	createFromObject(object) {
		let form = new FormData();
		for(const fieldName in object) {
			form.append(fieldName, object[fieldName]);
		}

		return form;
	},
}

export {FormDataHelper};