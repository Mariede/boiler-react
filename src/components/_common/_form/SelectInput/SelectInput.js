import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

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
			-> description1: texto extra 1, opcional
			-> description2: texto extra 2, opcional
			-> active: se o texto sera exibido ou nao, opcional

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
			disabled: true,
			icon: true
		}
	);

	const elementInput = useRef();

	const setOptionsTerminators = useMemo(
		() => {
			const objTerminators = {
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

			return objTerminators;
		},
		[terminators]
	);

	const setOptionName = useCallback(
		option => {
			const terminators = setOptionsTerminators;

			return (
				`${
					(Object.prototype.hasOwnProperty.call(option, optionsKeys.name) ? (terminators.name[0] + option[optionsKeys.name] + terminators.name[1]) : '') +
					(Object.prototype.hasOwnProperty.call(option, optionsKeys.description1) ? (terminators.description1[0] + option[optionsKeys.description1] + terminators.description1[1]) : '') +
					(Object.prototype.hasOwnProperty.call(option, optionsKeys.description2) ? (terminators.description2[0] + option[optionsKeys.description2] + terminators.description2[1]) : '') +
					(Object.prototype.hasOwnProperty.call(option, optionsKeys.active) ? (terminators.active[0] + (option[optionsKeys.active] ? 'ATIVO' : 'INATIVO') + terminators.active[1]) : '')
				}`
			);
		},
		[optionsKeys, setOptionsTerminators]
	);

	const setOptionInitial = useMemo(
		() => {
			if (optionSelected) {
				if (Array.isArray(optionsData)) {
					const catched = optionsData.filter(
						element => String(element[optionsKeys.id]) === String(optionSelected)
					);

					if (catched && catched.length === 1) {
						return setOptionName(catched.pop());
					}
				}
			}

			return '';
		},
		[optionsData, optionsKeys, optionSelected, setOptionName]
	);

	const showHideData = useCallback(
		e => {
			const element = e.currentTarget;
			const parent = element.closest('.select-input');
			const inputBoxData = parent.querySelector('.input-box-data');
			const inputBoxText = parent.querySelector('input[type="text"]');

			if (elementBlocked.disabled) {
				if (element.getAttribute('data-name') === 'button-check') {
					inputBoxText.value = '';
					setBoxData(optionsData);
				}

				setElementBlocked(
					{
						disabled: false,
						icon: false
					}
				);

				inputBoxData.classList.remove('hide');
			} else {
				if (element.getAttribute('data-name') === 'button-check') {
					inputBoxText.value = setOptionInitial;
					setBoxData(optionsData);
				}

				setElementBlocked(
					{
						disabled: true,
						icon: true
					}
				);

				inputBoxData.classList.add('hide');
			}
		},
		[optionsData, elementBlocked, setOptionInitial]
	);

	const setOptionsData = e => {
		e.preventDefault();

		if (e.key === 'Escape') {
			handleFormElements(prevState => ({ ...prevState, [id]: '' }));
			showHideData(e);
		} else {
			const inputBoxText = e.currentTarget;

			const arrSearch = String(inputBoxText.value || '').trim().split(' ').filter(
				element => element !== ''
			);

			const removeAccents = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

			const dataFound = optionsData.filter(
				_elementData => {
					const elementDataName = removeAccents(_elementData[optionsKeys.name]).toUpperCase();
					const elementDataDescription1 = removeAccents(_elementData[optionsKeys.description1]).toUpperCase();
					const elementDataDescription2 = removeAccents(_elementData[optionsKeys.description2]).toUpperCase();

					return (
						arrSearch.every(
							_elementSearch => {
								const elementSearch = removeAccents(_elementSearch).toUpperCase();

								return (
									elementDataName.includes(elementSearch) || elementDataDescription1.includes(elementSearch) || elementDataDescription2.includes(elementSearch)
								);
							}
						)
					);
				}
			);

			setBoxData(dataFound);
		}
	};

	const setOptionClean = useCallback(
		e => {
			handleFormElements(prevState => ({ ...prevState, [id]: '' }));
			showHideData(e);
		},
		[showHideData, id, handleFormElements]
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

	const buttonCheckEnterPressed = useCallback(
		e => {
			e.preventDefault();

			if (!disabled && e.key === 'Enter') {
				showHideData(e);
			}
		},
		[showHideData, disabled]
	);

	const buttonCheckClicked = useCallback(
		e => {
			e.preventDefault();

			if (!disabled) {
				showHideData(e);
			}
		},
		[showHideData, disabled]
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
					element => (
						(
							!Object.prototype.hasOwnProperty.call(element, optionsKeys.active) || element[optionsKeys.active]
						) || element[optionsKeys.id] === optionSelected
					)
				);

				if (mountedData.length !== 0) {
					return (
						mountedData.map(
							element => (
								<div className="option-found" tabIndex="0" role="button" data-value={ element[optionsKeys.id] } onKeyPress={ optionCheckEnterPressed } onClick={ optionCheckClicked } key={ element[optionsKeys.id] }>{ setOptionName(element) }</div>
							)
						)
					);
				}
			}

			return (
				<div className="option-not-found">Nenhum dado encontrado</div>
			);
		},
		[boxData, optionsKeys, optionSelected, optionCheckEnterPressed, optionCheckClicked, setOptionName]
	);

	useEffect(
		() => {
			const _input = elementInput.current;
			const parent = _input.closest('.select-input');
			const elementClean = parent.querySelector('i.fa-times');

			if (_input) {
				if (elementBlocked.disabled) {
					elementClean.classList.add('hide');
				} else {
					elementClean.classList.remove('hide');
					_input.focus();
				}
			}
		},
		[elementBlocked]
	);

	return (
		<InputGroup className="select-input">
			<Input type="text" defaultValue={ setOptionInitial } maxLength="200" placeholder="> pesquise ou selecione" innerRef={ elementInput } onKeyUp={ setOptionsData } disabled={ elementBlocked.disabled } />
			<i className="fas fa-times" tabIndex="0" role="button" onKeyPress={ cleanCheckEnterPressed } onClick={ cleanCheckClicked } />
			<InputGroupAddon addonType="append">
				<InputGroupText tabIndex="0" role="button" data-name="button-check" onKeyPress={ buttonCheckEnterPressed } onClick={ buttonCheckClicked } className={ !disabled ? 'enabled' : 'disabled' }><i className={ `fas ${(elementBlocked.icon ? 'fa-search' : 'fa-search-plus')}` } /></InputGroupText>
			</InputGroupAddon>
			<div className="input-box-data hide">
				{ setMountedData }
			</div>
		</InputGroup>
	);
};

export default SelectInput;
