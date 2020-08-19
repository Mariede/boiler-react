import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import InputPass from 'components/_common/_form/InputPass';

import useDataPostPutPatch from 'components/_custom-hooks/useDataPostPutPatch';

import formValidator from 'helpers/formValidator';

import './Logon.css';

const Logon = () => {
	const [submit, setSubmit] = useState(false);

	const [{ login, pass }, handleFormElements] = useReducer(
		(formElementsValues, newFormElementsValues) => ({ ...formElementsValues, ...newFormElementsValues }),
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

		const { id, name, value } = e.target;
		handleFormElements({ [(id || name)]: value });
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

	const [Component, goDataAction] = useDataPostPutPatch(
		{
			method: 'POST',
			route: '/logon',
			submit: submit,
			cbSubmit: () => {
				setSubmit(false);
			},
			data: {
				login: login,
				pass: pass
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
				sessionStorage.getItem('is-logged') ? (
					<Redirect to="/" />
				) : (
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
												<Input type="text" value={ login } id="login" placeholder="seu@email" onChange={ changeFormElements } />
											</FormGroup>
											<FormText>Insira seu usuário aqui.</FormText>
										</Col>
									</Row>

									<Row form>
										<Col md={ 12 }>
											<FormGroup>
												<Label for="pass">Senha</Label>
												<InputPass value={ pass } id="pass" placeholder="S3nh4" onChange={ changeFormElements } />
											</FormGroup>
											<FormText>Insira sua senha aqui.</FormText>
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
				)
			}
		</Fragment>
	);
};

export default Logon;
