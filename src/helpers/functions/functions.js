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
	}
};

export default functions;
