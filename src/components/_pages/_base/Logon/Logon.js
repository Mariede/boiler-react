import { Fragment, useRef, useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import InputPass from 'components/_common/_form/InputPass';

import DataChange from 'components/_common/DataChange';

import formValidator from 'helpers/formValidator';

import './Logon.css';

const Logon = () => {
	const [dataChange, setDataChange] = useState(undefined);

	const [formElements, handleFormElements] = useState(
		{
			login: '',
			senha: ''
		}
	);

	const componentFirstRender = useRef(true);

	const configFormValidation = [
		{
			id: 'login',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'E-mail não preenchido'
				},
				{
					rule: 'isEmail'
				}
			]
		},
		{
			id: 'senha',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Senha não preenchida'
				}
			]
		}
	];

	const changeFormElements = e => {
		e.preventDefault();

		const { id, name, value } = e.currentTarget;

		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 3 de 3 (ativa)

		if (formCheck) {
			setDataChange(
				{
					submit: true,
					method: 'post',
					data: {
						login: formElements.login,
						senha: formElements.senha
					},
					message: 'Efetuando logon...'
				}
			);
		}
	};

	// Validacao de formulario
	useEffect(
		() => {
			if (componentFirstRender.current) {
				// So deve rodar no primeiro render
				formValidator.setFormResponse(configFormValidation); // Formulario: 1 de 3
				componentFirstRender.current = false;

				// Foco no input no primeiro render da pagina
				const el = document.getElementById('login');

				if (el) {
					el.focus();
				}
			} else {
				// Roda em todos os render subsequentes
				formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 3
			}
		}
	);

	return (
		<Fragment>
			<DataChange { ...dataChange } setDataChange={ setDataChange } baseRoute="/logon" cbCatch={ { header: 'Logon', form: 'logon-form' } } url={ (sessionStorage.getItem('current-path') || '/') } />

			<MainContent subject="Logon" icon="fas fa-sign-in-alt" maxContent={ true }>
				<div id="logon">
					<p>Insira o seu usuário e senha para <strong>acessar o sistema</strong></p>

					<Form id="logon-form" className="form" onSubmit={ submitForm } autoComplete="off">
						<div className="global-form-grouped diverse">
							<Row form>
								<Col md={ 12 }>
									<FormGroup>
										<Label for="login">Usuário</Label>
										<Input type="text" value={ formElements.login } id="login" maxLength="200" placeholder="seu@email" onChange={ changeFormElements } />
									</FormGroup>
									<FormText className="global-outside-group">Insira seu usuário aqui.</FormText>
								</Col>
							</Row>

							<Row form>
								<Col md={ 12 }>
									<FormGroup>
										<Label for="senha">Senha</Label>
										<InputPass value={ formElements.senha } id="senha" maxLength="20" placeholder="s3nh4" onChange={ changeFormElements } />
									</FormGroup>
									<FormText className="global-outside-group">Insira sua senha aqui.</FormText>
								</Col>
							</Row>

							<hr className="global-line global-form-divider" />

							<Row form>
								<Col md={ 12 }>
									<Button type="submit" size="md" color="success" block>Acessar sistema</Button>
								</Col>
							</Row>
						</div>
					</Form>
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Logon;
