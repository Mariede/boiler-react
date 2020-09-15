import React, { useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import formValidator from 'helpers/formValidator';

const ModalForm = props => {
	const { data, setDataChange } = props;

	const [formElements, handleFormElements] = useState(
		{
			nome: data.nome || '',
			email: data.email || '',
			tipo: (data.tipo && data.tipo.id) || '',
			ativo: (data.ativo ? 1 : (data.ativo === false ? 2 : ''))
		}
	);

	const configFormValidation = [
		{
			id: 'nome',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty'
				},
				{
					rule: 'isCompleteName'
				}
			]
		},
		{
			id: 'email',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty'
				},
				{
					rule: 'isEmail'
				}
			]
		},
		{
			id: 'tipo',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Tipo não selecionado'
				},
				{
					rule: 'isInteger'
				}
			]
		},
		{
			id: 'ativo',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Estado não selecionado'
				},
				{
					rule: 'isInteger'
				}
			]
		}
	];

	const initiateFormValidation = () => {
		formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 2
	};

	const changeFormElements = e => {
		e.preventDefault();

		formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 2

		const { id, name, value } = e.currentTarget;
		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 2 de 2

		if (formCheck) {
			setDataChange(
				prevState => (
					{
						...prevState,
						submit: true,
						data: formElements
					}
				)
			);
		}
	};

	useEffect(
		initiateFormValidation,
		[]
	);

	return (
		<Form id="usuario-form" className="form" onSubmit={ submitForm }>
			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="nome">Nome</Label>
						<Input type="text" value={ formElements.nome } id="nome" maxLength="200" onChange={ changeFormElements } />
					</FormGroup>
				</Col>
			</Row>

			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="email">E-mail</Label>
						<Input type="text" value={ formElements.email } id="email" maxLength="200" onChange={ changeFormElements } />
					</FormGroup>
				</Col>
			</Row>

			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="tipo">Tipo</Label>
						<Input type="select" value={ formElements.tipo } id="tipo" onChange={ changeFormElements }>
							<option value="">-- preencher</option>
							{
								data.options && Array.isArray(data.options.tipos) ? (
									data.options.tipos.map(
										(element, index) => <option value={ element.id } key={ index }>{ element.nome }</option>
									)
								) : (
									null
								)
							}
						</Input>
					</FormGroup>
				</Col>
			</Row>

			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="ativo">Estado</Label>
						<Input type="select" value={ formElements.ativo } id="ativo" onChange={ changeFormElements }>
							<option value="">-- preencher</option>
							{
								data.options && Array.isArray(data.options.ativo) ? (
									data.options.ativo.map(
										(element, index) => <option value={ element.id } key={ index }>{ element.nome }</option>
									)
								) : (
									null
								)
							}
						</Input>
					</FormGroup>
				</Col>
			</Row>
		</Form>
	);
};

export default ModalForm;
