import validator from './validator'; // Motor de validacao (copiado do boiler-server)

import './formValidator.css';

const _setConfig = {
	feedBackClass: 'form-feedback',
	feedBackIdComplement: 'FormFeedback',
	validationStart: false
};

const formValidator = {
	setFormResponse: config => {
		_setConfig.validationStart = false;

		config.forEach(
			e => {
				const elId = e.id;
				const parent = document.getElementById(elId);

				if (parent) {
					const childId = elId + _setConfig.feedBackIdComplement;

					if (!document.getElementById(childId)) {
						const child = parent.parentNode.insertBefore(document.createElement('div'), parent.nextSibling);

						child.className = _setConfig.feedBackClass;
						child.id = childId;
						child.style.display = 'none';
						child.innerHTML = '';
					}
				}
			}
		);
	},
	setFormValidation: (config, validationStart = _setConfig.validationStart) => {
	// Param validationStart => set it as true, from which page validation will be constantly enabled

		const invalidList = [];
		const validList = [];

		let result = true;

		if (validationStart) {
			if (!_setConfig.validationStart) {
				_setConfig.validationStart = true;
			}

			config.forEach(
				e => {
					const elId = e.id;
					const parent = document.getElementById(elId);
					const elOptional = (e.optional || false);

					if (parent) {
						const childId = elId + _setConfig.feedBackIdComplement;
						const child = document.getElementById(childId);

						if (child) {
							const elValue = parent.value;

							let isValid = true;

							child.style.display = 'none';
							child.innerHTML = '';

							if (!elOptional || elValue !== '') {
							/*
							Validation Check Engine

								-> create a new rule name and add here a new validation from the validator pool of functions
								-> validator file is basically the same as the one in boiler-server template
							*/
								Array.from(e.rules).forEach(
									e => {
										const defaultMessage = 'Field is invalid';

										// Engine --------------------------------------------------------------------------------------
										// isNotEmpty
										if (e.rule === 'isNotEmpty' && isValid) {
											isValid = !validator.isEmpty(elValue, false);

											if (!isValid) {
												child.innerHTML = (e.message || defaultMessage);
											}
										}
										// -------------------------------------------

										// isNotEmptyTrimmed
										if (e.rule === 'isNotEmptyTrimmed' && isValid) {
											isValid = !validator.isEmpty(elValue);

											if (!isValid) {
												child.innerHTML = (e.message || defaultMessage);
											}
										}
										// -------------------------------------------

										// isEmail
										if (e.rule === 'isEmail' && isValid) {
											isValid = validator.isEmail(elValue);

											if (!isValid) {
												child.innerHTML = (e.message || defaultMessage);
											}
										}
										// -------------------------------------------
										// ---------------------------------------------------------------------------------------------
									}
								);
							}

							if (!isValid) {
								child.style.display = 'block';
								invalidList.push(elId);

								if (result) {
									result = false;
								}
							} else {
								validList.push(elId);
							}
						}
					}
				}
			);

			// Classes bootstrap 4
			[...new Set(invalidList)].forEach(
				e => {
					const element = document.getElementById(e);

					element.classList.remove('is-valid');
					element.classList.add('is-invalid');
				}
			);

			// Classes bootstrap 4
			[...new Set(validList)].forEach(
				e => {
					const element = document.getElementById(e);

					element.classList.remove('is-invalid');
					element.classList.add('is-valid');
				}
			);
		}

		return result;
	}
};

export default formValidator;
