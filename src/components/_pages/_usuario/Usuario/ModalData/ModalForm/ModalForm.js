import React, { useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import formValidator from 'helpers/formValidator';

const ModalForm = props => {
	const { _formElements, _changeFormElements, _modalCallback } = props;

	const [formElements, handleFormElements] = useState(_formElements);

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

		_changeFormElements((id || name), value);
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 2 de 2

		if (formCheck) {
			_modalCallback();
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
						<Input type="text" value={ formElements.nome } id="nome" onChange={ changeFormElements } />
					</FormGroup>
				</Col>
			</Row>

			<Row form>
				<Col md={ 12 }>
					<FormGroup>
						<Label for="email">E-mail</Label>
						<Input type="text" value={ formElements.email } id="email" onChange={ changeFormElements } />
					</FormGroup>
				</Col>
			</Row>
		</Form>
	);
};

export default ModalForm;
