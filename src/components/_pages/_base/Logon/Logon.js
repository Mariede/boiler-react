import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import axios from 'axios';

import Loading from 'components/_common/Loading';
import Notify from 'components/_common/Notify';
import PageSubject from 'components/_common/PageSubject';

import ContextConfig from 'components/_context/ContextConfig';
import formValidator from 'helpers/formValidator';

import './Logon.css';

const Logon = () => {
	const [goLogon, setGoLogon] = useState(false);
	const [notify, setNotify] = useState(null);
	const [submit, setSubmit] = useState(false);

	const getUrl = useContext(ContextConfig).baseUrl;

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

	useEffect(() => {
		formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 2
	}, [configFormValidation]);

	useEffect(() => {
		let isMounted = true;

		if (submit) {
			setNotify(null);

			axios.post(
				`${getUrl}/logon`,
				{
					login: login,
					pass: pass
				}
			)
			.then(
				res => {
					if (isMounted) {
						setGoLogon(true);
					}
				}
			)
			.catch(
				err => {
					if (isMounted) {
						setNotify({ info: (err.response || err), header: 'Logon', type: 4 });
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

		return () => {
			setGoLogon(false);
			isMounted = false;
		};
	}, [getUrl, login, pass, submit]);

	const handleFormElements = (e, handler) => {
		e.preventDefault();

		formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 2
		handler(e.target.value);
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 2

		if (formCheck) {
			setSubmit(true);
		}
	};

	const Component = (
		sessionStorage.getItem('is-logged') ? (
			<Redirect to="/" />
		) : (
			goLogon ? (
				<Redirect to={ (sessionStorage.getItem('current-path') || '/') } />
			) : (
				<div id="logon">
					<PageSubject subject="Logon" icon="fas fa-sign-in-alt" />
					<div className="main-content">
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
				</div>
			)
		)
	);

	return (
		<Fragment>
			<Loading loading={ submit } />
			<Notify info={ notify && notify.info } header={ notify && notify.header } type={ notify && notify.type } form="logon-form" />
			{ Component }
		</Fragment>
	);
};

export default Logon;
