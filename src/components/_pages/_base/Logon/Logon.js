import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';

import useDataPostPutPatch from 'components/_custom-hooks/useDataPostPutPatch';

import formValidator from 'helpers/formValidator';

import './Logon.css';

const Logon = () => {
	const [goLogon, setGoLogon] = useState(false);
	const [submit, setSubmit] = useState(false);

	const [login, formHandleLogin] = useState('');
	const [pass, formHandlePass] = useState('');

	const configFormValidation = [
		{
			id: 'login',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Texto não preenchido'
				},
				{
					rule: 'isEmail',
					message: 'E-mail inválido'
				}
			]
		},
		{
			id: 'pass',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Texto não preenchido'
				}
			]
		}
	];

	const initiateFormValidation = () => {
		formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 2
	};

	const handleFormElements = (e, handler) => {
		e.preventDefault();

		formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 2
		handler(e.target.value);
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

	const Component = useDataPostPutPatch(
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
			cbThen: () => {
				setGoLogon(true);
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
					goLogon ? (
						<Redirect to={ (sessionStorage.getItem('current-path') || '/') } />
					) : (
						<MainContent subject="Logon" icon="fas fa-sign-in-alt">
							<div id="logon">
								<Form id="logon-form" className="form" onSubmit={ submitForm }>
									<Row form>
										<Col md={ 12 }>
											<FormGroup>
												<Label for="login">Usuário</Label>
												<Input type="text" value={ login } id="login" placeholder="seu@email" onChange={ e => handleFormElements(e, formHandleLogin) } />
												<FormText>Insira seu usuário aqui.</FormText>
											</FormGroup>
										</Col>
									</Row>
									<Row form>
										<Col md={ 12 }>
											<FormGroup>
												<Label for="pass">Senha</Label>
												<Input type="password" value={ pass } id="pass" placeholder="S3nh4" onChange={ e => handleFormElements(e, formHandlePass) } />
												<FormText>Insira sua senha aqui.</FormText>
											</FormGroup>
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
