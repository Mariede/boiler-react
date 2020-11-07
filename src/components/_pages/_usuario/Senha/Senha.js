import { Fragment, useRef, useState, useEffect, useContext } from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

import MainContent from 'components/_common/MainContent';
import InputPass from 'components/_common/_form/InputPass';
import PassMeter from 'components/_common/PassMeter';
import DataChange from 'components/_common/DataChange';

import formValidator from 'helpers/formValidator';

import ContextUserData from 'components/_context/ContextUserData';

import './Senha.css';

const Senha = () => {
	const getUserData = useContext(ContextUserData).getUserData;

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

	const submitForm = e => {
		e.preventDefault();

		const formCheck = formValidator.setFormValidation(configFormValidation, true); // Formulario: 3 de 3 (ativa)

		if (formCheck) {
			setDataChange(
				{
					submit: true,
					method: 'put',
					param: getUserData.id,
					extraRoute: '/senha',
					data: {
						senha: formElements.senha,
						senhaNova: formElements.senhaNova,
						senhaNovaCheck: formElements.senhaNovaCheck
					},
					formId: 'usuario-senha-form'
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
			} else {
				// Roda em todos os render subsequentes
				formValidator.setFormValidation(configFormValidation); // Formulario: 2 de 3
			}
		}
	);

	return (
		<Fragment>
			<DataChange { ...dataChange } setDataChange={ setDataChange } baseRoute="/usuario" cbCatch={ { header: 'Alterar senha', form: 'usuario-senha-form' } } url="/" showActionInfo />

			<MainContent subject="Trocar senha" icon="fas fa-key" maxContent={ true }>
				<div id="usuario-senha">
					<Form id="usuario-senha-form" className="form" onSubmit={ submitForm } autoComplete="off">
						<div className="global-form-grouped">
							<Row form>
								<Col md={ 12 }>
									<Label for="senha">Senha</Label>
									<FormGroup>
										<Input type="password" value={ formElements.senha } id="senha" maxLength="20" placeholder="Senha atual" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
							</Row>
						</div>

						<div className="global-form-grouped">
							<Row form>
								<Col md={ 12 }>
									<Label for="senhaNova">Nova senha</Label>
									<FormGroup>
										<Input type="password" value={ formElements.senhaNova } id="senhaNova" maxLength="20" placeholder="Nova senha" onChange={ changeFormElements } />
									</FormGroup>
								</Col>
							</Row>

							<Row form>
								<Col md={ 12 }>
									<FormGroup>
										<InputPass value={ formElements.senhaNovaCheck } id="senhaNovaCheck" maxLength="20" placeholder="Confirme a nova senha" onChange={ changeFormElements } />
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

						<hr className="global-line global-form-divider" />

						<Row form>
							<Col md={ 12 }>
								<Button type="submit" size="md" color="success" block>Confirmar</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</MainContent>
		</Fragment>
	);
};

export default Senha;
