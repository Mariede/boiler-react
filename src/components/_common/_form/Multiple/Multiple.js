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

	const multipleButtonOut = `multiple-button-out-${id}`;
	const multipleButtonIn = `multiple-button-in-${id}`;

	const multipleBoxOut = `multiple-box-out-${id}`;
	const multipleBoxIn = `multiple-box-in-${id}`;

	const multipleBoxSize = (Array.isArray(optionsData) ? optionsData.length : 1);

	const checkButtonsProps = idButton => {
		const props = {
			color: 'secondary',
			disabled: true
		};

		if (Array.isArray(optionsData) && Array.isArray(optionsSelected)) {
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

	const changeFormElements = e => {
		e.preventDefault();

		const idElement = e.currentTarget.id;

		const boxOut = document.getElementById(multipleBoxOut);
		const boxIn = document.getElementById(multipleBoxIn);

		const finalValues = [];

		for (let i = 0, l = boxIn.length; i < l; i++) {
			const optionValue = functions.parseFormElementsValues(boxIn[i].value);

			if (idElement === multipleButtonIn) {
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

			if (idElement === multipleButtonIn) {
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
		<div id={ id } className="multiple flex-md-row flex-column">
			<div className="multiple-box-out">
				<Input type="select" id={ multipleBoxOut } size={ multipleBoxSize } multiple>
					{
						(Array.isArray(optionsData) && Array.isArray(optionsSelected)) ? (
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
					<Button type="button" id={ multipleButtonOut } size="sm" { ...checkButtonsProps(1) } onClick={ changeFormElements }><i className="fa fa-arrow-left"></i></Button>
					<Button type="button" id={ multipleButtonIn } size="sm" { ...checkButtonsProps(2) } onClick={ changeFormElements }><i className="fa fa-arrow-right"></i></Button>
				</ButtonGroup>
			</div>

			<div className="multiple-box-in">
				<Input type="select" id={ multipleBoxIn } size={ multipleBoxSize } multiple>
					{
						(Array.isArray(optionsData) && Array.isArray(optionsSelected)) ? (
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
