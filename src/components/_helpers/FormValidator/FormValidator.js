import './FormValidator.css';

const FormValidator = {};

const _setConfig = {
	feedBackClass: 'form-feedback',
	feedBackIdComplement: 'FormFeedBack'
};

FormValidator.setFormResponse = config => {
	config.forEach(
		e => {
			const elId = e.id;
			const parent = document.getElementById(elId);

			if (parent) {
				const childId = elId + _setConfig.feedBackIdComplement;

				if (!document.getElementById(childId)) {
					const child = parent.parentNode.insertBefore(document.createElement(('div')), parent.nextSibling);

					child.className = _setConfig.feedBackClass;
					child.id = childId;
					child.style.display = 'none';
					child.innerHTML = '';
				}
			}
		}
	);
};

FormValidator.setFormValidation = config => {
	let invalidList = [],
		validList = [],
		result = true;

	config.forEach(
		e => {
			const elId = e.id;
			const parent = document.getElementById(elId);

			if (parent) {
				const childId = elId + _setConfig.feedBackIdComplement;
				const child = document.getElementById(childId);

				if (child) {
					const elValue = e.value;
					let isValid = true;

					child.style.display = 'none';
					child.innerHTML = '';

					// Validation Check Engine (new rules comes here)
					Array.from(e.rules).forEach(
						e => {
							// Engine --------------------------------------------------------------------------------------
							// ruleBlank
							if (e.rule === 'ruleBlank' && isValid) {
								if (elValue === '') {
									isValid = false;

									if (e.message) {
										child.innerHTML = e.message;
									} else {
										child.innerHTML = 'Field must not be blank';
									}
								}
							}
							// -------------------------------------------

							// ruleBlankTrim
							if (e.rule === 'ruleBlankTrim' && isValid) {
								if (elValue.trim() === '') {
									isValid = false;

									if (e.message) {
										child.innerHTML = e.message;
									} else {
										child.innerHTML = 'Field must not be blank';
									}
								}
							}
							// -------------------------------------------

							// ruleEmail
							if (e.rule === 'ruleEmail' && isValid) {
								let reEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x21\x23-\x5b\x5d-\x7f]|\\[\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x21-\x5a\x53-\x7f]|\\[\x7f])+)\])$/i;

								if (!elValue.match(reEmail)) {
									isValid = false;

									if (e.message) {
										child.innerHTML = e.message;
									} else {
										child.innerHTML = 'Field must be a valid e-mail';
									}
								}
							}
							// -------------------------------------------
							// ---------------------------------------------------------------------------------------------
						}
					);

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

	// classes bootstrap 4
	[ ...new Set(invalidList) ].forEach(
		e => {
			let element = document.getElementById(e);

			element.classList.remove('is-valid');
			element.classList.add('is-invalid');
		}
	);

	// classes bootstrap 4
	[ ...new Set(validList) ].forEach(
		e => {
			let element = document.getElementById(e);

			element.classList.remove('is-invalid');
			element.classList.add('is-valid');
		}
	);

	return result;
};

export default FormValidator;
