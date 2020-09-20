import React from 'react';

import { Button } from 'reactstrap';
import { ButtonGroup, Input } from 'reactstrap';

import functions from 'helpers/functions';

import './Multiple.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS
		- optionsData			: json de dados que definem as opcoes possiveis relacionadas (colecao de dados)

		- optionsKeys			: chaves das propriedades em optionsData - objeto
			-> id e o valor da opcao (unico)
			-> description e o texto informativo da opcao

		- optionsSelected		: array que define as opcoes selecionadas
			-> e o proprio conteudo do elemento de formulario controlado associado (id)

		- id					: id que especifica qual o elemento do formulario (conteudo sempre array)

		- handleFormElements	: funcao de estado em parent que controla o elemento de formulario id
*/
const Multiple = props => {
	const { optionsData, optionsKeys, optionsSelected, id, handleFormElements } = props;

	const multipleBoxOut = `multiple-box-out-${id}`;
	const multipleBoxIn = `multiple-box-in-${id}`;

	const isArrayOptionsData = Array.isArray(optionsData);
	const isArrayOptionsSelected = Array.isArray(optionsSelected);

	const multipleBoxSize = (isArrayOptionsData ? optionsData.length : 1);

	const checkButtonsProps = idButton => {
		const props = {
			color: 'secondary',
			disabled: true
		};

		if (isArrayOptionsData && isArrayOptionsSelected) {
			if (idButton === 1) {
				const result = (optionsSelected.length === 0);

				if (!result) {
					props.color = 'danger';
					props.disabled = false;
				}
			} else {
				if (idButton === 2) {
					const result = (optionsData.length === optionsSelected.length);

					if (!result) {
						props.color = 'success';
						props.disabled = false;
					}
				}
			}
		}

		return props;
	};

	const changeFormElements = (idButton, e) => {
		e.preventDefault();

		const boxOut = document.getElementById(multipleBoxOut);
		const boxIn = document.getElementById(multipleBoxIn);

		const finalValues = [];

		for (let i = 0, l = boxIn.length; i < l; i++) {
			const optionValue = functions.parseFormElementsValues(boxIn[i].value);

			if (idButton === 2) {
				finalValues.push(optionValue);
			} else {
				const SelectedInValues = functions.parseFormElementsValues(boxIn.value, boxIn.options, boxIn.multiple);

				if (!SelectedInValues.includes(optionValue)) {
					finalValues.push(optionValue);
				}
			}

			boxIn[i].selected = false;
		}

		for (let i = 0, l = boxOut.length; i < l; i++) {
			const optionValue = functions.parseFormElementsValues(boxOut[i].value);

			if (idButton === 2) {
				const SelectedOutValues = functions.parseFormElementsValues(boxOut.value, boxOut.options, boxOut.multiple);

				if (SelectedOutValues.includes(optionValue)) {
					finalValues.push(optionValue);
				}
			}

			boxOut[i].selected = false;
		}

		handleFormElements(prevState => ({ ...prevState, [id]: finalValues }));
	};

	return (
		<div className="multiple flex-md-row flex-column">
			<div className="multiple-box-out">
				<Input type="select" id={ multipleBoxOut } size={ multipleBoxSize } multiple>
					{
						(isArrayOptionsData && isArrayOptionsSelected) ? (
							optionsData
							.filter(
								element => !optionsSelected.includes(element[optionsKeys.id])
							)
							.map(
								(element, index) => <option value={ element[optionsKeys.id] } key={ index }>{ element[optionsKeys.description] }</option>
							)
						) : (
							null
						)
					}
				</Input>
			</div>

			<div className="multiple-buttons">
				<ButtonGroup>
					<Button type="button" size="sm" { ...checkButtonsProps(1) } onClick={ e => changeFormElements(1, e) }><i className="fa fa-arrow-left"></i></Button>
					<Button type="button" size="sm" { ...checkButtonsProps(2) } onClick={ e => changeFormElements(2, e) }><i className="fa fa-arrow-right"></i></Button>
				</ButtonGroup>
			</div>

			<div className="multiple-box-in">
				<Input type="select" id={ multipleBoxIn } size={ multipleBoxSize } multiple>
					{
						(isArrayOptionsData && isArrayOptionsSelected) ? (
							optionsData
							.filter(
								element => optionsSelected.includes(element[optionsKeys.id])
							)
							.map(
								(element, index) => <option value={ element[optionsKeys.id] } key={ index }>{ element[optionsKeys.description] }</option>
							)
						) : (
							null
						)
					}
				</Input>
			</div>
		</div>
	);
};

export default Multiple;
