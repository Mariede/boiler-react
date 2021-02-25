import { format, isValid, parse } from 'date-fns';

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
	},
	formatNumberDecimalsAfter (value, decimalsAfter) {
		if (typeof value === 'number') {
			const fatorDecimalsAfter = 10 ** decimalsAfter;

			return (
				Math.round(value * fatorDecimalsAfter) / fatorDecimalsAfter
			);
		}

		return value;
	},
	formatNumberToString (value) {
		if (typeof value === 'number') {
			return String(value).replace(/\./, ',');
		}

		return value;
	},
	formatDateToString (value, formatStyle = 'dd/MM/yyyy HH:mm:ss') {
		if (value instanceof Date) {
			return format(value, formatStyle); // Retorna string
		}

		return value;
	},
	formatStringToDate (value, formatStyle = 'dd/MM/yyyy HH:mm:ss') {
		if (typeof value === 'string') {
			const date = parse(
				value,
				formatStyle,
				new Date()
			);

			if (isValid(date)) {
				return date; // Retorna object/Date
			}
		}

		return value;
	},
	formatStringBaseDate (value) {
		if (typeof value === 'string') {
			if (value.length >= 10) {
				return value.substr(0, 10);
			}
		}

		return value;
	},
	formatCpf (_cpf) {
		const cpf = (_cpf || '').toString().replace(/\D/gi, '').padStart(11, '0');

		const base1 = cpf.substr(0, 3);
		const base2 = cpf.substr(3, 3);
		const base3 = cpf.substr(6, 3);
		const final = cpf.substr(9, 2);

		return `${base1}.${base2}.${base3}-${final}`;
	},
	formatCnpj (_cnpj) {
		const cnpj = (_cnpj || '').toString().replace(/\D/gi, '').padStart(14, '0');

		const base1 = cnpj.substr(0, 2);
		const base2 = cnpj.substr(2, 3);
		const base3 = cnpj.substr(5, 3);
		const base4 = cnpj.substr(8, 4);
		const final = cnpj.substr(12, 2);

		return `${base1}.${base2}.${base3}/${base4}-${final}`;
	},
	formatRenavam (_renavam) {
		const renavam = (_renavam || '').toString().replace(/\D/gi, '').padStart(11, '0');

		return renavam;
	},
	formatVehicleLicensePlate (_licensePlate) {
		const licensePlate = (_licensePlate || '').toString().toUpperCase().padStart(7, ' ');

		const base1 = licensePlate.substr(0, 3).trim();
		const base2 = licensePlate.substr(3).trim();

		return `${base1} ${base2}`;
	}
};

export default functions;
