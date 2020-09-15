import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import InputPass from 'components/_common/_form/InputPass';

import useDataChange from 'components/_custom-hooks/useDataChange';

import formValidator from 'helpers/formValidator';

import './Logon.css';

const Logon = () => {
	const [submit, setSubmit] = useState(false);

	const [formElements, handleFormElements] = useState(
		{
			login: '',
			pass: ''
		}
	);

	const configFormValidation = [
		{
			id: 'login',
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
			id: 'pass',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty'
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
			setSubmit(true);
		}
	};

	useEffect(
		initiateFormValidation,
		[]
	);

	const { Component, goDataAction } = useDataChange(
		{
			method: 'POST',
			route: '/logon',
			submit: submit,
			cbSubmit: () => {
				setSubmit(false);
			},
			data: {
				login: formElements.login,
				pass: formElements.pass
			},
			cbCatch: {
				header: 'Logon',
				type: 4,
				form: 'logon-form'
			},
			message: 'Efetuando logon...'
		}
	);

	return (
		<Fragment>
			{ Component }
			{
				goDataAction ? (
					<Redirect to={ (sessionStorage.getItem('current-path') || '/') } />
				) : (
					<MainContent subject="Logon" icon="fas fa-sign-in-alt" maxContent={ true }>
						<div id="logon">
							<Form id="logon-form" className="form" onSubmit={ submitForm }>
								<Row form>
									<Col md={ 12 }>
										<FormGroup>
											<Label for="login">Usuário</Label>
											<Input type="text" value={ formElements.login } id="login" maxLength="200" placeholder="seu@email" onChange={ changeFormElements } />
										</FormGroup>
										<FormText className="outside-group">Insira seu usuário aqui.</FormText>
									</Col>
								</Row>

								<Row form>
									<Col md={ 12 }>
										<FormGroup>
											<Label for="pass">Senha</Label>
											<InputPass value={ formElements.pass } id="pass" maxLength="20" placeholder="S3nh4" onChange={ changeFormElements } />
										</FormGroup>
										<FormText className="outside-group">Insira sua senha aqui.</FormText>
									</Col>
								</Row>

								<hr />

								<Row form>
									<Col md={ 12 }>
										<Button type="submit" color="success" block>Enviar</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</MainContent>
				)
			}
		</Fragment>
	);
};

export default Logon;
