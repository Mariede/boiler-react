import validator from './validator'; // Motor de validacao (copiado do boiler-server)

import './formValidator.css';

/*
Configuracoes iniciais para montagem do validador
	-> feedBackClass: classe css dos recipientes de validacao
	-> feedBackIdComplement: utilizado para identifica unicamente cada recipiente de validacao
	-> parentToAttach: Ancestral mais proximo, base onde cada recipiente de validacao sera acoplado (deve existir no DOM)
	-> validationStart: Se true, o motor de validacao comeca a funcionar (validar com eventos na pagina hospedeira, ex. submit ou change)
*/
const _setConfig = {
	feedBackClass: 'form-feedback',
	feedBackIdComplement: '-form-feedback',
	parentToAttach: 'div.form-group',
	validationStart: false
};

/*
Retorna o elemento a ser validado. Trabalha em conjunto com parentToAttach, onde cada recipiente de validacao ira se acoplar
	-> id: para elemento unico a ser validado no formulario (ex. text, select ou file)
	-> name: para colecao de elementos em comum a serem validados no formulario (ex. checkbox ou radio)
*/
const _getParent = _e => {
	const ref = (_e.id ? _e.id : _e.name);
	const elementBase = (_e.id ? document.getElementById(ref) : Array.from(document.getElementsByName(ref)).slice(-1).pop());

	return [ref, elementBase]; // Se unico: via id ; Se colecao: via name, nesse caso retorna o ultimo elemento name do DOM
};

/*
Componente de validacao de formularios
	-> setFormResponse: prepara a resposta de validacao do formulario, acoplando os respectivos recipientes de validacao
	-> setFormValidation: executa o motor de validacao e exibe a resposta na tela
*/
const formValidator = {
	setFormResponse: config => {
		_setConfig.validationStart = false;

		config.forEach(
			e => {
				const [elId, parent] = _getParent(e);

				if (parent) {
					const childId = elId + _setConfig.feedBackIdComplement;

					if (!document.getElementById(childId)) {
						const parentToAttach = parent.closest(_setConfig.parentToAttach);

						if (parentToAttach) {
							const child = parentToAttach.insertBefore(document.createElement('span'), parent.nextSibling);

							child.className = _setConfig.feedBackClass;
							child.id = childId;
							child.style.display = 'none';
							child.innerHTML = '';
						}
					}
				}
			}
		);
	},
	setFormValidation: (config, validationStart = _setConfig.validationStart) => {
		const getElement = _e => (
			document.getElementById(_e) ? (
				document.getElementById(_e)
			) : (
				Array.from(document.getElementsByName(_e)).length === 1 ? (
					document.getElementsByName(_e)[0]
				) : (
					null
				)
			)
		);

		const invalidList = [];
		const validList = [];

		let result = true;

		if (validationStart) {
			if (!_setConfig.validationStart) {
				_setConfig.validationStart = true;
			}

			config.forEach(
				e => {
					const [elId, parent] = _getParent(e);

					if (parent) {
						const childId = elId + _setConfig.feedBackIdComplement;
						const child = document.getElementById(childId);

						if (child) {
							const getElementValue = () => {
								switch (parent.type) {
									case 'select-multiple': {
										const value = [];

										for (let i = 0; i < parent.options.length; i++) {
											const opt = parent.options[i];

											if (opt.selected) {
												value.push(opt.value);
											}
										}

										if (value.length > 1) {
											return value;
										}

										return (value[0] || '');
									}
									case 'radio':
									case 'checkbox': {
										const value = [];
										const elements = (e.id ? [parent] : Array.from(document.getElementsByName(parent.name)));

										elements.forEach(
											e => {
												if (e.checked) {
													value.push((e.value || e.name));
												}
											}
										);

										if (value.length > 1) {
											return value;
										}

										return (value[0] || '');
									}
									case 'file': {
										const value = [];

										for (let i = 0; i < parent.files.length; i++) {
											value.push(parent.files[i].name);
										}

										if (value.length > 1) {
											return value;
										}

										return (value[0] || '');
									}
									default: {
										return parent.value;
									}
								}
							};

							const elOptional = (e.optional || false);
							const elValue = getElementValue();

							let isValid = true;

							child.style.display = 'none';
							child.innerHTML = '';

							/*
							Motor de validacao
								-> Novos tipos de regras sao acopladas aqui, interfaceando o arquivo validator.js
									- nome da regra no front-end aqui
									- validacao no arquivo validator.js (mesmo do boiler-server)
							*/
							if (!elOptional || elValue !== '') {
								Array.from(e.rules).forEach(
									e => {
										const setRule = (ruleName, ruleResult, ruleDefaultMessage = 'Field is invalid') => {
											if (e.rule === ruleName && isValid) {
												isValid = ruleResult;

												if (!isValid) {
													child.innerHTML = (e.message || ruleDefaultMessage);
												}
											}
										};

										// Engine --------------------------------------------------------------------------------------
										// isNotEmpty
										setRule(
											'isNotEmpty',
											!validator.isEmpty(elValue, false)
										);
										// -------------------------------------------

										// isNotEmptyTrimmed
										setRule(
											'isNotEmptyTrimmed',
											!validator.isEmpty(elValue)
										);
										// -------------------------------------------

										// isEmail
										setRule(
											'isEmail',
											validator.isEmail(elValue)
										);
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
					const element = getElement(e);

					if (element) {
						element.classList.add('is-invalid-element');
					}
				}
			);

			// Classes bootstrap 4
			[...new Set(validList)].forEach(
				e => {
					const element = getElement(e);

					if (element) {
						element.classList.remove('is-invalid-element');
					}
				}
			);
		}

		return result;
	}
};

export default formValidator;
