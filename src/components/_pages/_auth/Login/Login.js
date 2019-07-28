import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import PageSubject from 'components/_common/PageSubject';
import FormValidator from 'components/_helpers/FormValidator';

import './Login.css';

const Login = props => {
	const [user, formHandleUser] = useState('');
	const [pass, formHandlePass] = useState('');
	const configFormValidation = [
		{
			id: 'user',
			value: user,
			rules: [
				{
					rule: 'ruleBlank',
					message: 'Texto não preenchido'
				},
				{
					rule: 'ruleEmail',
					message: 'E-mail inválido'
				}
			]
		},
		{
			id: 'pass',
			value: pass,
			rules: [
				{
					rule: 'ruleBlank',
					message: 'Texto não preenchido'
				}
			]
		}
	];

	useEffect(() => {
		// Validacao de formulario 1/2
		FormValidator.setFormResponse(configFormValidation);
	}, [configFormValidation]);

	const handleFormElements = (e, handler) => {
		e.preventDefault();
		handler(e.target.value);
	};

	const submitForm = e => {
		e.preventDefault();

		// Validacao de formulario 2/2
		const formCheck = FormValidator.setFormValidation(configFormValidation);
		if (formCheck) {
			console.log('post data');
		}
	};

	return (
		<div id="login">
			<PageSubject subject="Login" icon="fas fa-sign-in-alt" />
			<div className="main-content">
				<Form className="form" id="loginForm" onSubmit={ submitForm }>
					<Row form>
						<Col md={12}>
							<FormGroup>
								<Label for="user">Usuário</Label>
								<Input type="text" value={ user } id="user" placeholder="seu@email" onChange={ e => handleFormElements(e, formHandleUser) } />
								<FormText>Insira seu usuário aqui.</FormText>
							</FormGroup>
						</Col>
					</Row>
					<Row form>
						<Col md={12}>
						<FormGroup>
							<Label for="pass">Senha</Label>
							<Input type="password" value={ pass } id="pass" placeholder="pass" onChange={ e => handleFormElements(e, formHandlePass) } />
							<FormText>Insira sua senha aqui.</FormText>
						</FormGroup>
						</Col>
					</Row>
					<hr />
					<Row form>
						<Col md={12}>
							<Button type="submit" color="success" block>Enviar</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default Login;
