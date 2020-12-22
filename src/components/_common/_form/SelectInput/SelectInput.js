import { useState, useMemo, useCallback } from 'react';

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
			-> description: texto extra, opcional
			-> active: se o texto sera exibido ou nao, opcional

		- optionSelected		: define a opcao selecionada
			-> e o proprio conteudo do elemento de formulario controlado associado (id)
			-> deve estar em formato ARRAY

		- id					: id que especifica qual o elemento do formulario (conteudo sempre array)

		- handleFormElements	: funcao de estado em parent que controla o elemento de formulario id
*/
const SelectInput = props => {
	const { optionsData, optionsKeys, optionSelected, id, handleFormElements } = props;

	const [boxData, setBoxData] = useState([]);

	const [elementBlocked, setElementBlocked] = useState(
		{
			disabled: true,
			icon: true
		}
	);

	const setOptionsData = e => {
		e.preventDefault();

		const inputBoxText = e.currentTarget;
		const arrSearch = String(inputBoxText.value || '').trim().split(' ').filter(
			element => element !== ''
		);

		const removeAccents = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

		const dataFound = optionsData.filter(
			_elementData => {
				const elementDataName = removeAccents(_elementData[optionsKeys.name]).toUpperCase();
				const elementDataDescription = removeAccents(_elementData[optionsKeys.description]).toUpperCase();

				return (
					arrSearch.every(
						_elementSearch => {
							const elementSearch = removeAccents(_elementSearch).toUpperCase();

							return (
								elementDataName.includes(elementSearch) || elementDataDescription.includes(elementSearch)
							);
						}
					)
				);
			}
		);

		setBoxData(dataFound);
	};

	const showHideData = e => {
		const element = e.currentTarget;
		const parent = element.closest('.select-input');
		const inputBoxData = parent.querySelector('.input-box-data');

		if (elementBlocked.disabled) {
			setElementBlocked(
				{
					disabled: false,
					icon: false
				}
			);

			inputBoxData.classList.remove('hide');
		} else {
			setElementBlocked(
				{
					disabled: true,
					icon: true
				}
			);

			inputBoxData.classList.add('hide');
		}

		if (element.getAttribute('data-name') === 'button-check') {
			const inputBoxText = parent.querySelector('input[type="text"]');

			handleFormElements(prevState => ({ ...prevState, [id]: '' }));
			inputBoxText.value = '';
		}
	};

	const getOptionSelected = e => {
		const option = e.currentTarget;
		const parent = option.closest('.select-input');
		const inputBoxText = parent.querySelector('input[type="text"]');
		const optionSelId = functions.parseFormElementsValues(option.getAttribute('data-value'));
		const optionSelText = option.innerText;

		handleFormElements(prevState => ({ ...prevState, [id]: optionSelId }));
		inputBoxText.value = optionSelText;

		showHideData(e);
	};

	const buttonCheckEnterPressed = e => {
		e.preventDefault();

		if (e.key === 'Enter') {
			showHideData(e);
		}
	};

	const buttonCheckClicked = e => {
		e.preventDefault();
		showHideData(e);
	};

	const optionCheckEnterPressed = e => {
		e.preventDefault();

		if (e.key === 'Enter') {
			getOptionSelected(e);
		}
	};

	const optionCheckClicked = e => {
		e.preventDefault();
		getOptionSelected(e);
	};

	const setOptionName = useCallback(
		option => (
			`${
				option[optionsKeys.name] +
				(
					(option[optionsKeys.description] || Object.prototype.hasOwnProperty.call(option, optionsKeys.active)) ? ' (' : ''
				) +
				(
					option[optionsKeys.description] ? `${option[optionsKeys.description]}` : ''
				) +
				(
					Object.prototype.hasOwnProperty.call(option, optionsKeys.active) ? (
						option[optionsKeys.active] ? `${(option[optionsKeys.description] ? ' - ' : '')}ATIVO` : `${(option[optionsKeys.description] ? ' - ' : '')}INATIVO`
					) : ''
				) +
				(
					(option[optionsKeys.description] || Object.prototype.hasOwnProperty.call(option, optionsKeys.active)) ? ')' : ''
				)
			}`
		),
		[optionsKeys]
	);

	const setOptionInitial = useMemo(
		() => {
			setBoxData(optionsData);

			if (optionSelected) {
				if (Array.isArray(optionsData)) {
					const catched = optionsData.filter(
						element => element[optionsKeys.id] === optionSelected
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

	return (
		<InputGroup className="select-input">
			<Input type="text" defaultValue={ setOptionInitial } maxLength="200" placeholder="> pesquise ou selecione" onKeyUp={ setOptionsData } disabled={ elementBlocked.disabled } />
			<InputGroupAddon addonType="append">
				<InputGroupText tabIndex="0" role="button" data-name="button-check" onKeyPress={ buttonCheckEnterPressed } onClick={ buttonCheckClicked }><i className={ `fas ${(elementBlocked.icon ? 'fa-search' : 'fa-search-plus')}` }></i></InputGroupText>
			</InputGroupAddon>
			<div className="input-box-data hide">
				{
					Array.isArray(boxData) && (
						boxData.length !== 0 ? (
							boxData.map(
								element => (
									(
										(
											!Object.prototype.hasOwnProperty.call(element, optionsKeys.active) || element[optionsKeys.active]
										) || element[optionsKeys.id] === optionSelected
									) && (
										<div className="option-found" tabIndex="0" role="button" data-value={ element[optionsKeys.id] } onKeyPress={ optionCheckEnterPressed } onClick={ optionCheckClicked } key={ element[optionsKeys.id] }>{ setOptionName(element) }</div>
									)
								)
							)
						) : (
							<div className="option-not-found">Nenhum dado encontrado</div>
						)
					)
				}
			</div>
		</InputGroup>
	);
};

export default SelectInput;
