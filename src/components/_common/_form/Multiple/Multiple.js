import { useMemo, useCallback } from 'react';

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
			-> name: e o texto informativo da opcao
			-> description1: texto extra 1, opcional
			-> description2: texto extra 2, opcional
			-> active: se o texto sera exibido ou nao, opcional

		- optionsSelected		: define as opcoes selecionadas
			-> e o proprio conteudo do elemento de formulario controlado associado (id)
			-> deve estar em formato ARRAY

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
const Multiple = props => {
	const { optionsData, optionsKeys, optionsSelected, id, handleFormElements, disabled, terminators } = props;

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
		_element => {
			const terminators = setOptionsTerminators;

			return (
				`${
					(Object.prototype.hasOwnProperty.call(_element, optionsKeys.name) ? (terminators.name[0] + _element[optionsKeys.name] + terminators.name[1]) : '') +
					(Object.prototype.hasOwnProperty.call(_element, optionsKeys.description1) ? (terminators.description1[0] + _element[optionsKeys.description1] + terminators.description1[1]) : '') +
					(Object.prototype.hasOwnProperty.call(_element, optionsKeys.description2) ? (terminators.description2[0] + _element[optionsKeys.description2] + terminators.description2[1]) : '') +
					(Object.prototype.hasOwnProperty.call(_element, optionsKeys.active) ? (terminators.active[0] + (_element[optionsKeys.active] ? 'ATIVO' : 'INATIVO') + terminators.active[1]) : '')
				}`
			);
		},
		[optionsKeys, setOptionsTerminators]
	);

	const setOptions = useCallback(
		_element => (
			<option value={ _element[optionsKeys.id] } title={ setOptionName(_element) } key={ _element[optionsKeys.id] }>{ setOptionName(_element) }</option>
		),
		[optionsKeys, setOptionName]
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
				<Input type="select" id={ multipleBoxOut } size={ multipleBoxSize } disabled={ disabled === true } multiple>
					<option value="" disabled>&rsaquo; disponíveis</option>
					{
						(goCheck) ? (
							optionsData
							.filter(
								element => (
									!Object.prototype.hasOwnProperty.call(element, optionsKeys.active) || element[optionsKeys.active]
								)
							)
							.filter(
								element => !optionsSelected.includes(element[optionsKeys.id])
							)
							.map(
								element => setOptions(element)
							)
						) : (
							null
						)
					}
				</Input>
			</div>

			<div className="multiple-buttons">
				<ButtonGroup>
					<Button type="button" name="btn-back" size="sm" { ...checkButtonsPropsBack } onClick={ changeFormElements } disabled={ disabled === true }><i className="fas fa-arrow-left"></i></Button>
					<Button type="button" name="btn-go" size="sm" { ...checkButtonsPropsGo } onClick={ changeFormElements } disabled={ disabled === true }><i className="fas fa-arrow-right"></i></Button>
				</ButtonGroup>
			</div>

			<div className="multiple-box-in">
				<Input type="select" id={ multipleBoxIn } size={ multipleBoxSize } disabled={ disabled === true } multiple>
					<option value="" disabled>&rsaquo; selecionados</option>
					{
						(goCheck) ? (
							optionsData
							.filter(
								element => (
									(
										!Object.prototype.hasOwnProperty.call(element, optionsKeys.active) || element[optionsKeys.active]
									) || optionsSelected.includes(element[optionsKeys.id])
								)
							)
							.filter(
								element => optionsSelected.includes(element[optionsKeys.id])
							)
							.map(
								element => setOptions(element)
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
