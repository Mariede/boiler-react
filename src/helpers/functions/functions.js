const functions = {
	parseFormElementsValues: valueCheck => {
	// Analisa e retorna o tipo do dado se Array, Boolean, Number ou String.
		if (Array.isArray(valueCheck)) {
			return [...valueCheck];
		} else if (valueCheck === 'true' || valueCheck === 'false') {
			return valueCheck === 'true';
		} else if ((/^([+-]?\d+)(\.{1}\d+|())$/).test(valueCheck)) {
			return Number(valueCheck, 10);
		}

		return valueCheck;
	}
};

export default functions;
