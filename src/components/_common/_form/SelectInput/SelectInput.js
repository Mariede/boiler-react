import { Fragment, useRef, useState, useEffect, useMemo, useCallback } from 'react';

import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { UncontrolledTooltip } from 'reactstrap';

import functions from 'helpers/functions';

import './SelectInput.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS
		- optionsData			: json de dados que definem colecao de dados
			-> deve estar em formato ARRAY

		- optionsKeys			: chaves das propriedades em optionsData - objeto
			-> id: e o valor da opcao (unico)
			-> name: e o texto informativo da opcao
			-> nameBold: boolean - name em negrito ou nao, OPCIONAL
			-> description1: texto extra 1 da opcao, OPCIONAL
			-> description1Bold: boolean - description1 em negrito ou nao, OPCIONAL (so faz sentido se existir description1)
			-> description2: texto extra 2 da opcao, OPCIONAL
			-> description2Bold: boolean - description2 em negrito ou nao, OPCIONAL (so faz sentido se existir description2)
			-> image: se existe uma imagem associada ao texto da opcao, OPCIONAL
				-> image.src: a imagem a ser exibida em base64 - se a chave image existe, OBRIGATORIO
				-> image.alt: texto alt da imagem a ser exibida - se a chave image existe, OBRIGATORIO
			-> active: se o conteudo da opcao sera exibido ou nao, OPCIONAL

		- optionSelected		: define a opcao selecionada
			-> e o proprio conteudo do elemento de formulario controlado associado (id)
			-> pode ser vazio ou o valor primitivo de id (nao ARRAY)

		- id					: id que especifica qual o elemento do formulario (conteudo sempre array)

		- handleFormElements	: funcao de estado em parent que controla o elemento de formulario id

		- disabled				: OPCIONAL, define se o combo esta ativo ou inativo

		- terminators			: OPCIONAL, especifica os terminadores de texto para as chaves
			-> name, description1, description2, active
			-> E uma Array de Arrays (nessa ordem, valores default informados):
				[
					['', ''], // name
					[' - ', ''], // description1
					[' - ', ''], // description2
					[' (', ')'] // active
				]
*/
const SelectInput = props => {
	const { optionsData, optionsKeys, optionSelected, id, handleFormElements, disabled, terminators } = props;

	const [boxData, setBoxData] = useState([]);

	const [elementBlocked, setElementBlocked] = useState(
		{
			readOnly: true,
			icon: true
		}
	);

	const elementInput = useRef();

	const setOptionsTerminators = useMemo(
		() => {
			const _terminators = {
				name: Array.isArray(terminators) && terminators.length > 0 ? (
					[terminators[0][0], terminators[0][1]]
				) : (
					['', '']
				),
				description1: Array.isArray(terminators) && terminators.length > 1 ? (
					[terminators[1][0], terminators[1][1]]
				) : (
					[' - ', '']
				),
				description2: Array.isArray(terminators) && terminators.length > 2 ? (
					[terminators[2][0], terminators[2][1]]
				) : (
					[' - ', '']
				),
				active: Array.isArray(terminators) && terminators.length === 4 ? (
					[terminators[3][0], terminators[3][1]]
				) : (
					[' (', ')']
				)
			};

			return _terminators;
		},
		[terminators]
	);

	const setOptionName = useCallback(
		(_element, displayInitial) => {
			const _terminators = setOptionsTerminators;

			const _name = _element && Object.prototype.hasOwnProperty.call(_element, optionsKeys.name) ? (
				(_terminators.name[0] + _element[optionsKeys.name] + _terminators.name[1])
			) : (
				''
			);

			const _description1 = _element && Object.prototype.hasOwnProperty.call(_element, optionsKeys.description1) ? (
				(_terminators.description1[0] + _element[optionsKeys.description1] + _terminators.description1[1])
			) : (
				''
			);

			const _description2 = _element && Object.prototype.hasOwnProperty.call(_element, optionsKeys.description2) ? (
				(_terminators.description2[0] + _element[optionsKeys.description2] + _terminators.description2[1])
			) : (
				''
			);

			const _active = _element && Object.prototype.hasOwnProperty.call(_element, optionsKeys.active) ? (
				(_terminators.active[0] + (_element[optionsKeys.active] ? 'ATIVO' : 'INATIVO') + _terminators.active[1])
			) : (
				''
			);

			const SelectInputOption = () => {
				const _findNestedKey = (_nestedKey, _el) => (
					_nestedKey.split('.').reduce((o, i) => o && o[i], _el)
				);

				const _optionName = (
					<Fragment>
						{
							_name && optionsKeys.nameBold ? <strong>{ _name }</strong> : _name
						}
						{
							_description1 && optionsKeys.description1Bold ? <strong>{ _description1 }</strong> : _description1
						}
						{
							_description2 && optionsKeys.description2Bold ? <strong>{ _description2 }</strong> : _description2
						}
						{
							_active
						}
					</Fragment>
				);

				return (
					(_element && optionsKeys.image && optionsKeys.image.src && optionsKeys.image.alt) ? (
						<Fragment>
							<img src={ _findNestedKey(optionsKeys.image.src, _element) || '' } alt={ _findNestedKey(optionsKeys.image.alt, _element) || '' } /> { _optionName }
						</Fragment>
					) : (
						_optionName
					)
				);
			};

			return (
				displayInitial ? (
					_name + _description1 + _description2 + _active
				) : (
					<SelectInputOption />
				)
			);
		},
		[optionsKeys, setOptionsTerminators]
	);

	const setOptionInitial = useMemo(
		() => {
			if (optionSelected) {
				if (Array.isArray(optionsData)) {
					const catched = optionsData.filter(
						_element => String(_element[optionsKeys.id]) === String(optionSelected)
					);

					if (catched && catched.length === 1) {
						return setOptionName(catched.pop(), true);
					}
				}
			}

			return '';
		},
		[optionsData, optionsKeys, optionSelected, setOptionName]
	);

	const showHideData = useCallback(
		(e, isEscaped = false) => {
			const element = e.currentTarget;
			const elementDataAttribute = element.getAttribute('data-name');
			const elementHasParentClass = element.classList.contains('.select-input');
			const parent = (elementHasParentClass ? element : element.closest('.select-input'));
			const inputBoxData = parent.querySelector('.input-box-data');
			const inputBoxText = parent.querySelector('input[type="text"]');

			if (elementBlocked.readOnly) {
				if (elementDataAttribute === 'box-data-check') {
					inputBoxText.value = '';
					setBoxData(optionsData);
				}

				setElementBlocked(
					{
						readOnly: false,
						icon: false
					}
				);

				inputBoxData.classList.add('show');
			} else {
				if (elementDataAttribute === 'box-data-check') {
					inputBoxText.value = setOptionInitial;
					setBoxData(optionsData);
				} else {
					if (elementDataAttribute === 'box-data-clean' || isEscaped) {
						inputBoxText.value = '';
						setBoxData(optionsData);
					}
				}

				setElementBlocked(
					{
						readOnly: true,
						icon: true
					}
				);

				inputBoxData.classList.remove('show');
			}
		},
		[optionsData, elementBlocked, setOptionInitial]
	);

	const setOptionsData = e => {
		e.preventDefault();

		if (e.key === 'Escape') {
			handleFormElements(prevState => ({ ...prevState, [id]: '' }));
			showHideData(e, true);
		} else {
			const inputBoxText = e.currentTarget;

			const arrSearch = String(inputBoxText.value || '').trim().split(' ').filter(
				_element => _element !== ''
			);

			const removeAccents = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

			const dataFound = Array.isArray(optionsData) && optionsData.filter(
				_elementData => {
					const _name = removeAccents(_elementData[optionsKeys.name]).toUpperCase();
					const _description1 = removeAccents(_elementData[optionsKeys.description1]).toUpperCase();
					const _description2 = removeAccents(_elementData[optionsKeys.description2]).toUpperCase();

					return (
						arrSearch.every(
							_elementSearch => {
								const _search = removeAccents(_elementSearch).toUpperCase();

								return (
									_name.includes(_search) || _description1.includes(_search) || _description2.includes(_search)
								);
							}
						)
					);
				}
			);

			setBoxData(dataFound);
		}
	};

	const parentCheckClicked = useCallback(
		e => {
			e.preventDefault();

			if (disabled !== true) {
				const element = e.target;
				const { tagName, type, readOnly } = element;

				if (tagName.toUpperCase() === 'INPUT' && type === 'text' && readOnly === true) {
					showHideData(e);
				}
			}
		},
		[showHideData, disabled]
	);

	const buttonCheckEnterPressed = useCallback(
		e => {
			e.preventDefault();

			if (disabled !== true && e.key === 'Enter') {
				showHideData(e);
			}
		},
		[showHideData, disabled]
	);

	const buttonCheckClicked = useCallback(
		e => {
			e.preventDefault();

			if (disabled !== true) {
				showHideData(e);
			}
		},
		[showHideData, disabled]
	);

	const setOptionClean = useCallback(
		e => {
			handleFormElements(prevState => ({ ...prevState, [id]: '' }));
			showHideData(e);
		},
		[showHideData, id, handleFormElements]
	);

	const cleanCheckEnterPressed = useCallback(
		e => {
			e.preventDefault();

			if (e.key === 'Enter') {
				setOptionClean(e);
			}
		},
		[setOptionClean]
	);

	const cleanCheckClicked = useCallback(
		e => {
			e.preventDefault();
			setOptionClean(e);
		},
		[setOptionClean]
	);

	const getOptionSelected = useCallback(
		e => {
			const option = e.currentTarget;
			const parent = option.closest('.select-input');
			const inputBoxText = parent.querySelector('input[type="text"]');
			const optionSelId = functions.parseFormElementsValues(option.getAttribute('data-value'));
			const optionSelText = option.innerText;

			handleFormElements(prevState => ({ ...prevState, [id]: optionSelId }));
			inputBoxText.value = optionSelText;

			showHideData(e);
		},
		[showHideData, id, handleFormElements]
	);

	const optionCheckEnterPressed = useCallback(
		e => {
			e.preventDefault();

			if (e.key === 'Enter') {
				getOptionSelected(e);
			}
		},
		[getOptionSelected]
	);

	const optionCheckClicked = useCallback(
		e => {
			e.preventDefault();
			getOptionSelected(e);
		},
		[getOptionSelected]
	);

	const setMountedData = useMemo(
		() => {
			if (Array.isArray(boxData)) {
				const mountedData = boxData.filter(
					_element => (
						(
							!Object.prototype.hasOwnProperty.call(_element, optionsKeys.active) || _element[optionsKeys.active]
						) || _element[optionsKeys.id] === optionSelected
					)
				);

				if (mountedData.length !== 0) {
					return (
						mountedData.map(
							_element => {
								const _blockId = `select-input-${id}-${_element[optionsKeys.id]}`;
								const _optionName = setOptionName(_element, false);

								return (
									<Fragment key={ _blockId }>
										<div
											className={ `option-found${_element[optionsKeys.id] === optionSelected ? ' selected' : ''}` }
											tabIndex="0"
											role="button"
											data-value={ _element[optionsKeys.id] }
											onKeyPress={ optionCheckEnterPressed }
											onClick={ optionCheckClicked }
											id={ _blockId }
										>
											{ _optionName }
										</div>

										<UncontrolledTooltip placement="top" target={ _blockId } trigger="hover">
											{ _optionName }
										</UncontrolledTooltip>
									</Fragment>
								);
							}
						)
					);
				}
			}

			return (
				<div className="option-not-found">Nenhum dado encontrado</div>
			);
		},
		[boxData, id, optionsKeys, optionSelected, optionCheckEnterPressed, optionCheckClicked, setOptionName]
	);

	useEffect(
		() => {
			const _input = elementInput.current;

			if (_input) {
				const parent = _input.closest('.select-input');
				const elementClean = parent.querySelector('i[data-name="box-data-clean"]');

				if (elementBlocked.readOnly) {
					elementClean.classList.remove('show');

					if (_input === document.activeElement) {
						const elementSearch = parent.querySelector('span[data-name="box-data-check"]');
						elementSearch.focus();
					}
				} else {
					elementClean.classList.add('show');
					_input.focus();
				}
			}
		},
		[elementBlocked]
	);

	return (
		<InputGroup className="select-input" data-name="box-data-check" onClick={ parentCheckClicked } key={ `select-input-k${optionSelected}` }>
			<Input type="text" defaultValue={ setOptionInitial } maxLength="200" placeholder="> pesquise ou selecione" innerRef={ elementInput } className={ disabled !== true ? 'enabled' : 'disabled' } tabIndex={ (disabled !== true && !elementBlocked.readOnly) ? 0 : -1 } onKeyUp={ setOptionsData } readOnly={ elementBlocked.readOnly } />
			<i className="fas fa-times" tabIndex={ 0 } role="button" data-name="box-data-clean" onKeyPress={ cleanCheckEnterPressed } onClick={ cleanCheckClicked } />
			<InputGroupAddon addonType="append">
				<InputGroupText className={ disabled !== true ? 'enabled' : 'disabled' } tabIndex={ disabled !== true ? 0 : -1 } role="button" data-name="box-data-check" onKeyPress={ buttonCheckEnterPressed } onClick={ buttonCheckClicked }><i className={ `fas ${(elementBlocked.icon ? 'fa-search' : 'fa-search-plus')}` } /></InputGroupText>
			</InputGroupAddon>
			<div className="input-box-data">
				{ setMountedData }
			</div>
		</InputGroup>
	);
};

export default SelectInput;
