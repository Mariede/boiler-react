import { Fragment, useRef, useState, useEffect, useContext } from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import InputPass from 'components/_common/_form/InputPass';
import PassMeter from 'components/_common/PassMeter';
import DataChange from 'components/_common/DataChange';

import CheckPermissions from 'components/_common/CheckPermissions';
import appPermissions from 'helpers/appPermissions';

import formValidator from 'helpers/formValidator';

import ContextConfig from 'components/_context/ContextConfig';

import './Senha.css';

const Senha = props => {
	const { history } = props;

	const formConfig = useContext(ContextConfig).formConfig;

	const [dataChange, setDataChange] = useState(undefined);

	const [formElements, handleFormElements] = useState(
		{
			senha: '',
			senhaNova: '',
			senhaNovaCheck: ''
		}
	);

	const componentFirstRender = useRef(true);

	const configFormValidation = [
		{
			id: 'senha',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Senha atual não preenchida'
				}
			]
		},
		{
			id: 'senhaNova',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Nova senha não preenchida'
				},
				{
					rule: 'lenRange',
					message: `Nova senha deve conter entre ${formConfig.passMinLen} e ${formConfig.passMaxLen} caracteres`,
					extraParams: [formConfig.passMinLen, formConfig.passMaxLen]
				},
				{
					rule: 'isNotEqual',
					message: 'Nova senha não pode ser igual a atual',
					extraParams: [formElements.senha]
				}
			]
		},
		{
			id: 'senhaNovaCheck',
			optional: false,
			rules: [
				{
					rule: 'isNotEmpty',
					message: 'Confirmação não preenchida'
				},
				{
					rule: 'isEqual',
					message: 'Confirmação não confere',
					extraParams: [formElements.senhaNova]
				}
			]
		}
	];

	const changeFormElements = e => {
		e.preventDefault();

		const { id, name, value } = e.currentTarget;

		handleFormElements(prevState => ({ ...prevState, [(id || name)]: value }));
	};

	const navBack = e => {
		e.preventDefault();
		history.goBack();
	};

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 3 de 3 (ativa)

		if (formCheck) {
			setDataChange(
				{
					submit: true,
					method: 'put',
					extraRoute: '/senha',
					data: {
						senha: formElements.senha,
						senhaNova: formElements.senhaNova,
						senhaNovaCheck: formElements.senhaNovaCheck
					}
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
				const el = document.getElementById('senha');

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
			<DataChange
				{ ...dataChange }
				setDataChange={ setDataChange }
				baseRoute="/usuario"
				cbCatch={
					{
						header: 'Alterar senha',
						form: 'usuario-senha-form'
					}
				}
				url="/"
				showActionInfo="Senha alterada com sucesso!"
			/>

			<MainContent subject="Minha senha" icon="fas fa-key" maxContent={ true }>
				<div id="usuario-senha">
					<p>Informe os dados abaixo para <strong>alterar sua senha</strong></p>

					<Form id="usuario-senha-form" className="form" onSubmit={ submitForm } autoComplete="off">
						<div className="global-form-grouped">
							<Row form>
								<Col md={ 12 }>
									<Label for="senha">Senha atual</Label>
									<FormGroup>
										<Input type="password" value={ formElements.senha } id="senha" maxLength="20" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
							</Row>
						</div>

						<div className="global-form-grouped">
							<Row form>
								<Col md={ 12 }>
									<Label for="senhaNova">Nova senha</Label>
									<FormGroup>
										<Input type="password" value={ formElements.senhaNova } id="senhaNova" maxLength="20" placeholder="nova senha" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
							</Row>

							<Row form>
								<Col md={ 12 }>
									<FormGroup>
										<InputPass value={ formElements.senhaNovaCheck } id="senhaNovaCheck" maxLength="20" placeholder="confirme a nova senha" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
							</Row>

							<Row form>
								<Col md={ { offset: 1, size: 10 } }>
									<FormGroup>
										<PassMeter passValue={ formElements.senhaNova } />
									</FormGroup>
								</Col>
							</Row>
						</div>

						<hr className="global-line" />

						<Row form className="footer">
							<Col md={ 12 }>
								<CheckPermissions allowedPermissions={ [appPermissions.edtMinhaSenha] }>
									<Button type="submit" size="md" color="success">Confirmar</Button>

									<Button type="button" size="md" color="success" disabled={ true }>Confirmar</Button>
								</CheckPermissions>

								<Button type="button" size="md" color="primary" onClick={ navBack }>Voltar</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Senha;
