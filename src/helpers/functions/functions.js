const functions = {
	parseFormElementsValues (valueCheck, optionscheck = undefined, isMultiple = false) {
	// Analisa e retorna o tipo do dado se Array, Boolean, Number ou String
		if (optionscheck && isMultiple) {
			const selectedValues = [];

			for (let i = 0, l = optionscheck.length; i < l; i++) {
				if (optionscheck[i].selected) {
					const value = this.parseFormElementsValues(optionscheck[i].value);
					selectedValues.push(value);
				}
			}

			return selectedValues;
		} else if (valueCheck === 'true' || valueCheck === 'false') {
			return valueCheck === 'true';
		} else if ((/^([+-]?\d+)(\.{1}\d+|())$/).test(valueCheck)) {
			return Number(valueCheck);
		}

		return valueCheck;
	},
	getArrayOnly (param, _prop) {
	// Argumentos: param -> obj ou array de objs, prop -> string com . para propriedades aninhadas
		const prop = String(_prop || '');

		return (
			Array.isArray(param) ? (
				param.map(obj => prop.split('.').reduce((o, i) => o && o[i], obj))
			) : (
				param ? (
					[prop.split('.').reduce((o, i) => o && o[i], param)]
				) : (
					[]
				)
			)
		);
	}
};

export default functions;
