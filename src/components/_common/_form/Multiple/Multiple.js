import { useMemo } from 'react';

import { Button } from 'reactstrap';
import { ButtonGroup, Input } from 'reactstrap';

import functions from 'helpers/functions';

import './Multiple.css';

/*
	DEPENDENCIAS:
		- Reactstrap

	PROPS
		- optionsData			: json de dados que definem as opcoes possiveis relacionadas (colecao de dados)
			-> deve estar em formato ARRAY

		- optionsKeys			: chaves das propriedades em optionsData - objeto
			-> id: e o valor da opcao (unico)
			-> description: e o texto informativo da opcao

		- optionsSelected		: define as opcoes selecionadas
			-> e o proprio conteudo do elemento de formulario controlado associado (id)
			-> deve estar em formato ARRAY

		- id					: id que especifica qual o elemento do formulario (conteudo sempre array)

		- handleFormElements	: funcao de estado em parent que controla o elemento de formulario id
*/
const Multiple = props => {
	const { optionsData, optionsKeys, optionsSelected, id, handleFormElements } = props;

	const multipleBoxOut = `multiple-box-out-${id}`;
	const multipleBoxIn = `multiple-box-in-${id}`;

	const isArrayOptionsData = Array.isArray(optionsData);
	const goCheck = isArrayOptionsData && Array.isArray(optionsSelected);

	const multipleBoxMaxSize = 10; // Altura maxima da box
	const multipleBoxSize = (isArrayOptionsData ? (optionsData.length < multipleBoxMaxSize ? optionsData.length + 1 : multipleBoxMaxSize) : 1);

	const checkButtonsPropsBack = useMemo(
		() => {
			const props = {
				color: 'secondary',
				disabled: true
			};

			if (goCheck) {
				const result = (optionsSelected.length === 0);

				if (!result) {
					props.color = 'danger';
					props.disabled = false;
				}
			}

			return props;
		},
		[goCheck, optionsSelected]
	);

	const checkButtonsPropsGo = useMemo(
		() => {
			const props = {
				color: 'secondary',
				disabled: true
			};

			if (goCheck) {
				const result = (optionsData.length === optionsSelected.length);

				if (!result) {
					props.color = 'success';
					props.disabled = false;
				}
			}

			return props;
		},
		[goCheck, optionsData, optionsSelected]
	);

	const changeFormElements = e => {
		e.preventDefault();

		const element = e.currentTarget;
		const direction = (element.name === 'btn-go' ? 2 : 1);

		const boxOut = document.getElementById(multipleBoxOut);
		const boxIn = document.getElementById(multipleBoxIn);

		const finalValues = [];

		for (let i = 0, l = boxIn.length; i < l; i++) {
			if (!boxIn[i].disabled) {
				const optionValue = functions.parseFormElementsValues(boxIn[i].value);

				if (direction === 2) {
					finalValues.push(optionValue);
				} else {
					const SelectedInValues = functions.parseFormElementsValues(boxIn.value, boxIn.options, boxIn.multiple);

					if (!SelectedInValues.includes(optionValue)) {
						finalValues.push(optionValue);
					}
				}

				boxIn[i].selected = false;
			}
		}

		for (let i = 0, l = boxOut.length; i < l; i++) {
			if (!boxOut[i].disabled) {
				const optionValue = functions.parseFormElementsValues(boxOut[i].value);

				if (direction === 2) {
					const SelectedOutValues = functions.parseFormElementsValues(boxOut.value, boxOut.options, boxOut.multiple);

					if (SelectedOutValues.includes(optionValue)) {
						finalValues.push(optionValue);
					}
				}

				boxOut[i].selected = false;
			}
		}

		handleFormElements(prevState => ({ ...prevState, [id]: finalValues }));
	};

	return (
		<div className="multiple flex-column flex-md-row">
			<div className="multiple-box-out">
				<Input type="select" id={ multipleBoxOut } size={ multipleBoxSize } multiple>
					<option value="" disabled>&rsaquo; disponíveis</option>
					{
						(goCheck) ? (
							optionsData
							.filter(
								element => !optionsSelected.includes(element[optionsKeys.id])
							)
							.map(
								(element, index) => <option value={ element[optionsKeys.id] } title={ element[optionsKeys.description] } key={ index }>{ element[optionsKeys.description] }</option>
							)
						) : (
							null
						)
					}
				</Input>
			</div>

			<div className="multiple-buttons">
				<ButtonGroup>
					<Button type="button" name="btn-back" size="sm" { ...checkButtonsPropsBack } onClick={ changeFormElements }><i className="fas fa-arrow-left"></i></Button>
					<Button type="button" name="btn-go" size="sm" { ...checkButtonsPropsGo } onClick={ changeFormElements }><i className="fas fa-arrow-right"></i></Button>
				</ButtonGroup>
			</div>

			<div className="multiple-box-in">
				<Input type="select" id={ multipleBoxIn } size={ multipleBoxSize } multiple>
					<option value="" disabled>&rsaquo; selecionados</option>
					{
						(goCheck) ? (
							optionsData
							.filter(
								element => optionsSelected.includes(element[optionsKeys.id])
							)
							.map(
								(element, index) => <option value={ element[optionsKeys.id] } title={ element[optionsKeys.description] } key={ index }>{ element[optionsKeys.description] }</option>
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
