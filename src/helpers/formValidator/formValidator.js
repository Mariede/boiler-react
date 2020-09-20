/*
Interface onde as regras no front-end sao definidas
	-> Todas as regras de validacao front-end sao inseridas no arquivo apiRules
*/
import apiRules from './apiRules';

import './formValidator.css';

/*
Configuracoes iniciais para montagem do validador
	-> feedBackClass: classe css dos recipientes de validacao
	-> feedBackIdComplement: utilizado para identifica unicamente cada recipiente de validacao
	-> parentToAttach: Ancestral mais proximo, base onde cada recipiente de validacao sera acoplado (deve existir no DOM)
	-> validationStart: Se true, o motor de validacao comeca a funcionar (ativar em evento da pagina hospedeira, ex. submit ou change)
		- depois da primeira ativacao nao precisa passar o parametro novamente - fica ativo direto
	-> defaultMessage: Mensagem generica default do motor de regras (para todas as regras, exibe apenas se nao informada nas fases anteriores)
*/
const _setConfig = {
	feedBackClass: 'form-feedback',
	feedBackIdComplement: '-form-feedback',
	parentToAttach: 'div.form-group',
	validationStart: false,
	defaultMessage: 'Field is invalid'
};

/*
Retorna o elemento a ser validado. Trabalha em conjunto com parentToAttach, onde cada recipiente de validacao ira se acoplar
	-> id ou name: para elemento unico a ser validado no formulario (ex. text, select ou file)
	-> name: para colecao de elementos em comum a serem validados no formulario (ex. radio ou checkbox)
*/
const _getParent = e => {
	const ref = (e.id ? e.id : e.name);

	let elementBase = null;

	if (e.id) {
		const element = document.getElementById(ref);

		if (element) {
			if (!element.disabled && !element.readOnly) {
				elementBase = element;
			}
		}
	} else {
		const elements = document.getElementsByName(ref);

		if (elements) {
			const elementsAr = Array.from(elements);

			let allCount = 0,
				foundUnusable = 0;

			elementsAr.forEach(
				e => {
					allCount++;

					if (e.disabled || e.readOnly) {
						foundUnusable++;
					}
				}
			);

			if (allCount && (!foundUnusable || (foundUnusable !== allCount))) {
				elementBase = elementsAr.slice(-1).pop();
			}
		}
	}

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
			blockElement => {
				const [elId, parent] = _getParent(blockElement);

				if (parent) {
					const childId = elId + _setConfig.feedBackIdComplement;

					if (!document.getElementById(childId)) {
						const parentToAttach = parent.closest(_setConfig.parentToAttach);

						/*
						Insere o recipiente de validacao logo abaixo de parent: se parent for filho direto de parentToAttach
						Insere o recipiente de validacao logo acima de parentToAttach: se parent NAO for filho direto de parentToAttach
						*/
						if (parentToAttach) {
							const child = parentToAttach.insertBefore(document.createElement('span'), (parent.parentNode === parentToAttach ? parent.nextSibling : null));

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
		let result = true;

		if (validationStart) {
			const getElement = e => (
				document.getElementById(e) ? (
					document.getElementById(e)
				) : (
					Array.from(document.getElementsByName(e)).length > 1 ? (
						document.getElementsByName(e)
					) : (
						Array.from(document.getElementsByName(e)).length === 1 ? (
							document.getElementsByName(e)[0]
						) : (
							null
						)
					)
				)
			);

			const setClassName = (e, isValidList) => {
				if (e) {
					const isNodeList = e instanceof NodeList;

					if (!isNodeList) {
						const type = e.type;

						if (type === 'radio' || type === 'checkbox') {
							const eParentToAttach = e.closest(_setConfig.parentToAttach);

							if (isValidList) {
								eParentToAttach.classList.remove('is-invalid-group');
							} else {
								eParentToAttach.classList.add('is-invalid-group');
							}
						} else {
							if (isValidList) {
								e.classList.remove('is-invalid-element');
							} else {
								e.classList.add('is-invalid-element');
							}
						}
					} else {
						e.forEach(
							_e => {
								const type = _e.type;

								if (type === 'radio' || type === 'checkbox') {
									const eParentToAttach = _e.closest(_setConfig.parentToAttach);

									if (isValidList) {
										eParentToAttach.classList.remove('is-invalid-group');
									} else {
										eParentToAttach.classList.add('is-invalid-group');
									}
								} else {
									if (isValidList) {
										_e.classList.remove('is-invalid-element');
									} else {
										_e.classList.add('is-invalid-element');
									}
								}
							}
						);
					}
				}
			};

			const invalidList = [];
			const validList = [];

			if (!_setConfig.validationStart) {
				_setConfig.validationStart = true;
			}

			config.forEach(
				blockElement => {
					const [elId, parent] = _getParent(blockElement);

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
										const elements = (blockElement.id ? [parent] : Array.from(document.getElementsByName(parent.name)));

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
										const hasDataValue = parent.getAttribute('data-value');

										if (hasDataValue) {
											return hasDataValue;
										}

										return parent.value;
									}
								}
							};

							const elOptional = (blockElement.optional || false);
							const elValue = getElementValue();

							let isValid = true;

							child.style.display = 'none';
							child.innerHTML = '';

							/*
							Motor de validacao
							*/
							if (!elOptional || elValue !== '') {
								Array.from(blockElement.rules).forEach(
									e => {
										const setRule = (ruleName, ruleResult, ruleDefaultMessage) => {
											if (e.rule === ruleName && isValid) {
												isValid = ruleResult;

												if (!isValid) {
													child.innerHTML = (e.message || ruleDefaultMessage);
												}
											}
										};

										// Engine --------------------------------------------------------------------------------------
										apiRules.forEach(
											rule => {
												const extraParams = (Array.isArray(rule.extraParams) ? rule.extraParams : []);
												const result = rule.validatorFunction(elValue, ...extraParams);
												const negateResult = (rule.negateResult || false);
												const defaultMessage = (rule.defaultMessage || _setConfig.defaultMessage);

												setRule(
													rule.name,
													(negateResult ? !result : result),
													defaultMessage
												);
											}
										);
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

			[...new Set(invalidList)].forEach(
				e => {
					const element = getElement(e);
					setClassName(element, false);
				}
			);

			[...new Set(validList)].forEach(
				e => {
					const element = getElement(e);
					setClassName(element, true);
				}
			);
		}

		return result;
	}
};

export default formValidator;
