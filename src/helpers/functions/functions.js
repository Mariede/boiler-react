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
	isMobile () {
		const checkAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

		return (
			(
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(checkAgent)
			) || (
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(checkAgent.substr(0, 4))
			)
		);
	},
	isTablet () {
		const checkAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

		return (
			/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(checkAgent)
		);
	},
	isNumber (_n) {
		return (
			typeof _n === 'number' && !isNaN(_n)
		);
	},
	formatNumberFixedDigits (value, digits) {
		if (typeof value === 'number' && typeof digits === 'number') {
			const sinal = value < 0 ? -1 : 1;
			const _value = Math.abs(value);

			const lRounded = (_value === 0 || Math.floor(_value) !== 0) ? (
				Math.floor(_value).toString().length
			) : (
				Math.ceil(Math.log10(_value))
			);

			const expoent = digits - lRounded;
			const multiplier = Math.pow(10, expoent);

			const result = sinal * (Math.round(_value * multiplier) / multiplier);

			return (
				lRounded > digits ? (
					Math.round(result)
				) : (
					result
				)
			);
		}

		return value;
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
	}
};

export default functions;
