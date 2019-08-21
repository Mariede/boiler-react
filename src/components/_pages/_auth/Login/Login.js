import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import Notify from 'components/_common/Notify';
import Loading from 'components/_common/Loading';
import PageSubject from 'components/_common/PageSubject';

import FormValidator from 'components/_helpers/FormValidator';
import ContextConfig from 'components/_helpers/ContextConfig';

import './Login.css';

const Login = props => {
	const getUrl = React.useContext(ContextConfig).baseUrl;

	const [notify, setNotify] = useState(['', 0]);
	const [submit, setSubmit] = useState(false);

	const [user, formHandleUser] = useState('');
	const [pass, formHandlePass] = useState('');

	const configFormValidation = [
		{
			id: 'user',
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
			rules: [
				{
					rule: 'ruleBlank',
					message: 'Texto não preenchido'
				}
			]
		}
	];

	useEffect(() => {
		FormValidator.setFormResponse(configFormValidation); // formulario: 1 de 2
	}, [configFormValidation]);

	useEffect(() => {
		let isMounted = true;

		if (submit) {
			axios.post(
				getUrl + '/login',
				{
					login: user,
					pass: pass
				}
			)
			.then(
				res => {
					if (isMounted) {
						setNotify(['', 0]);

						const redirectCache = sessionStorage.getItem('current-path');
						props.history.push((redirectCache ? redirectCache : '/'));
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						setNotify([err, 4]);
					}

					throw err;
				}
			)
			.finally(
				() => {
					if (isMounted) {
						setSubmit(false);
					}
				}
			);
		}

		return () => (
			isMounted = false
		);
	}, [getUrl, user, pass, submit, props]);

	const handleFormElements = (e, handler) => {
		e.preventDefault();

		FormValidator.setFormValidation(configFormValidation); // formulario: 2 de 2

		handler(e.target.value);
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = FormValidator.setFormValidation(configFormValidation); // formulario: 2 de 2

		if (formCheck) {
			setSubmit(true);
		}
	};

	return (
		<div id="login">
			{ Loading({ loading: submit }) }
			{ Notify({ info: (!submit ? notify[0] : ''), header: 'Login', type: notify[1] }) }
			<PageSubject subject="Login" icon="fas fa-sign-in-alt" />
			<div className="main-content">
				<Form id="loginForm" className="form" onSubmit={ submitForm }>
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
							<Input type="password" value={ pass } id="pass" placeholder="S3nh4" onChange={ e => handleFormElements(e, formHandlePass) } />
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
