import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';
import PageSubject from 'components/_common/PageSubject';
import FormValidator from 'components/_helpers/FormValidator';
import Config from 'components/_helpers/Config';

import './Login.css';

const Login = props => {
	const getUrl = React.useContext(Config).baseUrl;
	const [login, setLogin] = useState({ result: {}, error: {}, loading: false });
	const [submit, setSubmit] = useState(false);

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

	useEffect(() => {
		if (submit) {
			setLogin({ result: {}, error: {}, loading: true });

			axios.post(
				getUrl + '/login',
				{
					login: user,
					pass: pass
				}
			)
			.then(
				res => {
					setLogin({ result: res.data, error: {}, loading: false });
				}
			)
			.catch(
				err => {
					setLogin({ result: {}, error: err, loading: false });
					throw err;
				}
			)
			.finally(
				() => {
					setSubmit(false);
				}
			);
		}
	}, [getUrl, user, pass, submit]);

	const handleFormElements = (e, handler) => {
		e.preventDefault();
		handler(e.target.value);
	};

	const submitForm = e => {
		e.preventDefault();

		// Validacao de formulario 2/2
		const formCheck = FormValidator.setFormValidation(configFormValidation);
		if (formCheck) {
			setSubmit(true);
		}
	};

	return (
		<React.Fragment>
			{ Notify({ type: 4, header: 'Login', info: login.error }) }
			{ (submit ? Loading({ message: 'Aguarde...', loading: login.loading }) : null) }
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
		</React.Fragment>
	);
};

export default Login;
